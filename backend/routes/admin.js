const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
const { blogOwner } = require('../middlewares')


router = express.Router();

 

// แสดงข้อมูลในหน้า dashboard
router.get("/data/admin", async function (req, res, next) {

    

    // Begin transaction
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        
        // เชื่อม 3 ตารางคือ customer , booking , doctor เพื่อไปแสดงข้อมูลลูกค้าในdashboard
        let results = await conn.query(
            `SELECT b.*, c.*, d.*, DATE_FORMAT(b.book_date, '%d-%M-%Y') AS date FROM booking AS b 
            JOIN 
            (SELECT * FROM customer) AS c ON b.cust_id = c.cust_id
            JOIN 
            (SELECT * FROM doctor) AS d ON b.doc_id = d.doc_id ORDER BY date, b.book_hour
            ;` 
        )

        // อยากส่ง sched_id กับ avail ของ customerคนนี้
        console.log(results[0].book_date);
        
        
        
        
        
        await conn.commit()
        return res.json(results[0]);
      } catch (err) {
        await conn.rollback();
        next(err);
      } finally {
        conn.release();
      }


});

// Delete จากปุ้มของหน้าdashboard
router.delete('/data/delete/:bookId', async function (req, res, next) {

    const bookId = req.params.bookId
    console.log(bookId);


    // Begin transaction
    const conn = await pool.getConnection()
    await conn.beginTransaction();



    try {
        
        // เราส่ง book_idมา แล้วเอาparamsนี้มาหา hourกับdateของbook_idนี้อีกที
        let [rows] = await conn.query(
            "SELECT book_hour, book_date FROM booking WHERE book_id=? ",
            [bookId]
        )
        const hour = rows[0].book_hour;
        const date = rows[0].book_date;
        // { book_hour: '17:00:00', book_date: 2023-05-28T17:00:00.000Z }

        
      
        
        // หาsched_id
        let [rows1] = await conn.query(
            "SELECT * FROM schedule WHERE sched_date=? ",
            [date]
        )
        const schedID = rows1[0].sched_id;
        

        // หา avail_id
        let [rows2] = await conn.query(
            "SELECT * FROM available_time WHERE time=?",
            [hour]
        )
        const availID = rows2[0].avail_time;
        // { avail_time: 7, time: '17:00:00', sched_id: 5 }
         


        //! DELETE ZONE

        // ลบเวลาก่อน
        const [results1] = await pool.query(
            'DELETE FROM available_time WHERE avail_time=?', [availID]
        )

        // เช็คว่า วันที่ยังมี avail ไหม ถ้าไม่มีก็ลบวันที่นี้ออก
        const [result2, fields] = await pool.query(
            `SELECT s.*, a.* FROM schedule AS s JOIN 
            (SELECT * FROM available_time) AS a ON s.sched_id = a.sched_id WHERE a.sched_id=?;`, [schedID]
        );
        if(result2.length == 0){
            const [results1] = await pool.query(
                'DELETE FROM schedule WHERE sched_id=?', [schedID]
            )
        }

        // ลบข้อมูลการจองใน BOOKING
        const [results3] = await pool.query(
            'DELETE FROM booking WHERE book_id=?', [bookId]
        )
                




        
       
        

        await conn.commit()
        // return res.json(results[0]);

      } catch (err) {
        await conn.rollback();
        next(err);
      } finally {
        conn.release();
      }
});




 


// Update comment
router.put('/data/status/:bookId/:newStatus', async function (req, res, next) {
    try {
        const [rows1, fields1] = await pool.query(
            'UPDATE booking SET status_name=? WHERE book_id=?', [req.params.newStatus, req.params.bookId]
        )
        console.log(rows1[0])
        
    } catch (error) {
        res.status(500).json(error)
    }
});

















exports.router = router;