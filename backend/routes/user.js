const express = require("express");
const pool = require("../config");
const Joi = require('joi')
// const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')



router = express.Router();



// * โครงสร้างคำสั่ง app.**method**(path , middleware , callback function) แต่ถ้าใช้ router ก็เปลี่ยนจาก app --> router
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})



const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

router.post('/user/login', async (req, res, next) => {
    console.log("Login");
    
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }

    const email = req.body.email
    const password = req.body.password

    

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [rows, fields] = await conn.query(
            'SELECT * FROM customer WHERE cust_email=?', [email]
        )
        const row = rows[0]

        // บอกว่าไม่มีอีเมลนี้
        if (!row) {    
            throw new Error('Incorrect Email')
        }

        // Check if password is correct
        // if (!(await bcrypt.compare(password, row.cust_pass))) {
        if(!(row.cust_pass == password)){
            throw new Error('Incorrect Password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE cust_id=?', 
            [row.cust_id]
        )

        let token = tokens[0]?.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(cust_id, token) VALUES (?, ?)', 
                [row.cust_id, token]
            )
        }
        conn.commit()
        res.status(200).send({'rows': row.cust_id,
            'token': token
        })
        
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})








const passwordValidator = (value, helpers) => {
    if (value.length < 4) {
        // ถ้า ค่าน้อยกว่า 4 จะthrow error ออกไป
        // Joi.ValidationError เป็นของ joi เฉพาะ
        throw new Joi.ValidationError('Password_error', {
            details: 'Passwordควรมีขั้นตํ่าคือ 4 '
        })
    }
    if (!(value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password_error', {
            details: 'Passwordควรมีเลข 0-9 กับ A-Z'
        })
    }
    
    return value
}


const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT cust_email FROM customer WHERE cust_email = ?", [value])
    // console.log("usernameValidator : ", rows[0]);
    if (rows.length >= 1) {
         
        throw new Joi.ValidationError('Duplicate_error', {
            details: 'This email is has alraedy'
        })
        
    }
    // ถ้า validateผ่าน มันจะ return ค่านั้นกลับไป
    return value
}




const signupSchema = Joi.object({
    email: Joi.string().email().required().external(usernameValidator),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().equal(Joi.ref('password')), // ต้องเหมือนกับ password
    fname: Joi.string().max(45),
    lname: Joi.string().max(45),
    mobile: Joi.string().required().pattern(/0[0-9]{9}/),
})


// signup
router.post('/user/signup', async (req, res, next) => {

    console.log("Signup");
    console.log(req.body);
    try {
        await signupSchema.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }    

     
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    const email = req.body.email
    const password = req.body.password
    // const password = await bcrypt.hash(req.body.password, 5)
    const fname = req.body.fname
    const lname = req.body.lname
    const mobile = req.body.mobile

    console.log(req.body);


    try {
        const [rows, field] = await conn.query(
            'INSERT INTO customer(fname, lname, cust_phone, cust_email, cust_pass, role) ' +
            'VALUES (?, ?, ?, ?, ?, ?)', [fname, lname, mobile, email, password, 'customer']
        )
        console.log("rows ", rows.insertId);
        
        token = generateToken()
        await conn.query(
            'INSERT INTO tokens(cust_id, token) VALUES (?, ?)', 
            [rows.insertId, token]
            )
            
            
        conn.commit()
        res.status(200).send({'rows': rows.insertId,
            'token': token
        })
    
    }
    catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }    

    
})



 



// update password
router.put('/password', async function (req, res, next) {
     

    // Begin transaction
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    
    let newPassword = req.body.newPassword
  
    let cust_pass = req.body.user.cust_pass
    const cust_id = req.body.user.cust_id
    const cust_email = req.body.user.cust_email

    try {
        const [rows1, fields1] = await pool.query(
            'UPDATE customer SET cust_pass=? WHERE cust_id=?', [newPassword, cust_id]
        )
        
        await conn.commit()
        res.json({ comment: String(newPassword) })
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }  
});







// history
router.get("/history/:userId", async function (req, res, next) {

    
     
    const cust_id = req.params.userId
    console.log("cust_id -- ", cust_id);

    // Begin transaction
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        
        // เชื่อม 3 ตารางคือ customer , booking , doctor เพื่อไปแสดงข้อมูลลูกค้าในdashboard
        let results = await conn.query(
            `SELECT b.*, d.*, DATE_FORMAT(b.book_date, '%d-%M-%Y') AS date FROM booking AS b 
            JOIN 
            (SELECT * FROM doctor) AS d ON b.doc_id = d.doc_id WHERE b.cust_id=? ORDER BY date, b.book_hour
            ;`, [cust_id]
        )

        // อยากส่ง sched_id กับ avail ของ customerคนนี้
        console.log(results[0]);
        
        await conn.commit()
        return res.json(results[0]);
      } catch (err) {
        await conn.rollback();
        next(err);
      } finally {
        conn.release();
      }
});







exports.router = router;
