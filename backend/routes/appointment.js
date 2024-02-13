const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
const { blogOwner } = require('../middlewares')


router = express.Router();



// ขอชื่อ หมอ
router.get("/doctor", async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query("SELECT doc_fname, doc_lname FROM doctor");

        let doc_all = [];
        for(let x in rows){
            doc_all.push(rows[x].doc_fname + " " + rows[x].doc_lname);
        }
        return res.json(doc_all);
      } catch (err) {
        return res.status(500).json(err)
      }
});



// เช็คเวลาหมอ
router.get("/doctor/checkTime", async function (req, res, next) {

    console.log(req.query);     

    const name = req.query.doctor.split(' ');
    console.log(name[0]);

    

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();


    try {
        const [rows, fields] = await pool.query("SELECT doc_id FROM doctor WHERE doc_fname=?", [
            name[0],
        ]);
        
        
        const doc_id = rows[0].doc_id
        console.log("doc_id : ", doc_id);
    

        const [rows2, fields2] = await pool.query(`SELECT a.doc_id, b.sched_id, b.sched_date FROM doctor AS a RIGHT JOIN 
        (SELECT * FROM schedule WHERE sched_date=?) AS b ON a.doc_id = b.doc_id;`, [req.query.date]);

        
        
        
        let time_all = [];
        
        
        if(rows2.length == 0){
            console.log("ยังไม่มีใครจองวันนี้");
            // insertได้เลย 
            // res.status(200).send({'doc_id': doc_id, 'sched_id': ''})
            console.log(time_all);
            return res.json(time_all);
        }
        else{
            //มาเช็คเวลาต่อ
            // joinด้วย doc_id แล้วใช้ where เป็นวันที่

            const sched_id = rows2[0].sched_id
            console.log("schedule ", rows2);

            const [rows3, fields3] = await pool.query("SELECT * FROM available_time WHERE sched_id=?", [
                sched_id,
            ]);
            
            
            for(let x in rows3){
                time_all.push(rows3[x].time);
            }
            // ส่งเวลาที่ถูกจองไปแล้ววันนี้(ตามsched_id) กลับไปให้vueรัน ตรง optionของtime
            return res.json(time_all);
        }
        
        
        
        
        conn.commit()
    
    } catch (err) {
        await conn.rollback();
        next(err);
      } finally {
        console.log('finally')
        conn.release();
      }

  });


    
// จองเวลาลงในตาราง 
router.post('/booking',isLoggedIn, async function (req, res, next) {
    const book_date = req.body.book_date;
    let book_time = req.body.book_time;
    let doc_id = req.body.doc_id;
    const cust_id = req.body.cust_id;
    const service = req.body.service;

    doc_id = doc_id.split(" ")[0]
    book_time = book_time + ':00:00';
    
    
    // Begin transaction
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    
    console.log("req.bodyของbooking ",req.body);

    try{

        // หา id หมอจากชื่อหมอ
        let [rows] = await conn.query(
            "SELECT doc_id FROM doctor WHERE doc_fname=?",
            [doc_id]
        )
        doc_id = rows[0].doc_id
        
        
        
        let [rows1] = await conn.query(
            "SELECT * FROM schedule WHERE sched_date=?",
            [book_date]
            )
            let sched_id;
            
            
        // ดูว่า มี วันที่ นี้ในschedหรือยัง ถ้าไม่ก็insertด้วย
        if(rows1.length == 0){
            let results1 = await conn.query(
                "INSERT INTO schedule(sched_date, doc_id) VALUES(?, ?);",
                [book_date, doc_id]
                )
            // เอาidที่เพิ่งinsertเข้าไปใส่ในตัวแปร
            sched_id = results1[0].insertId;
            }
        else{
            sched_id = rows1[0].sched_id
        }
        

        // insertลงใน available_time
        let results1 = await conn.query(
            "INSERT INTO available_time(time, sched_id) VALUES(?, ?);",
            [book_time, sched_id]
        )

        
        // insert ลงใน booking
        let results = await conn.query(
            "INSERT INTO booking(book_date, book_hour, doc_id, cust_id, service, status_name) VALUES(?, ?, ?, ?, ?, 'book');",
            [book_date, book_time, doc_id, cust_id, service]
        )

       

         
        console.log("inserลงbooking success");

        await conn.commit()
        res.send(results[0]);
    }catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log('finally')
      conn.release();
    } 
});




exports.router = router;