

const pool = require("../config");
async function isLoggedIn (req, res, next) {
    let authorization = req.headers.authorization
    // เราจะget ตัวที่มากับ header ที่ชื่อ authorization แต่ถ้าไม่มีauthorizationมากับheaderเราจะทำ ไรสักอย้่าง
    // รูปแบบประมาณนี้ header : {"authorization" : "$เป็นstringของtoken"}
    // ตัวอย่าง ของจริง->  header : {"authorization" : "Bearer $token"} จะเอาคำว่า Bearer มาต่อกับ token
    // tokenจะมี userid แล้วเอาไปquerryในตารางuser เราจะได้ข้อมูลของuserคนนั้นมา แล้วจับยัดเข้าไปใน req

    if (!authorization) {
        // ถ้าไม่มีแสดงว่าเรายังไม่มี token
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        return res.status(401).send('You are not logged in')
    }

    // Set user จับtokenยัดเข้าไปใน user 
    const [users] = await pool.query(
        'SELECT cust_id, fname, lname, cust_phone, cust_email, cust_pass, role ' + 
        'FROM customer WHERE cust_id = ?', [token.cust_id]
    )
   
    req.user = users[0]

    next()
    
}




const blogOwner = async (req, res, next) => {
   const [[blog]] = await pool.query('SELECT * FROM blogs WHERE id=?', [req.params.id])
 
   if (blog.create_by_id !== req.user.id) {
     return res.status(403).send('You do not have permission to perform this action')
   }
 
   next()
 }








// middlewareเป็นแค่function
async function logger (req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()//ไปทำmethodถัดไป
}

module.exports = {logger, isLoggedIn, blogOwner}
//export middlewareออกไป แล้วเดียวค่อยเอาไปใช้ในหน้าindex