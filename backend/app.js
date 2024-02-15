const express = require("express")
const app = express();
//* ข้อดีของ expressคือ ถ้าใช้แค่ node.js เวลาจะสร้างเว็บ เราต้องไปสร้าง const server = hhtp.createServer ซึ่งมันยุ่งยากกว่ามาก แต่expressมาช่วยประหยัดเวลา ไปได้เยอะเลย

const cors = require('cors')
app.use(cors())

// // Middleware
const { logger } = require('./middlewares')
app.use(logger)



// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
// const indexRouter = require('./routes/index')
// const blogRouter = require('./routes/blog')
// const commentRouter = require('./routes/comment')
// const imageRouter = require('./routes/image')

//* ใช้ express กับการ routing เบื้องต้น ใน app.js เป็นการรวม router หรือ path ที่จะใช้ ที่มันกระจัดกระจายไปตามหมวดหมู่หรือตามเว็บแยกเอาไว้ นำมันมารวมกันที่นี่
const userRouter = require('./routes/user')
const appointmentRouter = require('./routes/appointment')
const adminRouter = require('./routes/admin')


// app.use(indexRouter.router)
// app.use(blogRouter.router)
// app.use(commentRouter.router)
// app.use(imageRouter.router)
app.use(userRouter.router)
app.use(appointmentRouter.router)
app.use(adminRouter.router)


app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})