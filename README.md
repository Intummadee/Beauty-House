# Beauty House
 Node.Js , javascript , Vue.js 


# 🎉 ฝั่ง FrontEnd
- npm install -g @vue/cli (การติดตั้ง Vue CLI เป็นขั้นตอนที่ทำเพียงครั้งเดียวเมื่อต้องการใช้งาน Vue CLI ครั้งแรกหรือต้องการอัปเกรดเวอร์ชัน Vue CLI ในภายหลัง หลังจากนั้นสามารถสร้างโปรเจ็กต์ Vue ใหม่โดยใช้คำสั่ง vue createได้เลย โดยไม่ต้องทำการติดตั้ง Vue CLI อีกครั้ ซึ่ง Vue CLI จะเป็น versioin ตาม Node ที่เครื่องตัวเองได้ลงไว้)

⚙️ vue create myfrontend
-เลือก Default ([Vue 2] babel, eslint) และกด Enter

- cd myfrontend
- npm install bulma axios

👉 คำสั่ง Run --> **npm run serve**
 


# 🎉 ฝั่ง Backend
- mkdir backend
- npm install express
- สร้างไฟล์ app.js แล้วเขียนโค้ดตามนี้
```javascript
const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
```
- npm install cors
👉👉 คำสั่ง run คือ **npx nodemon app.js**
