

<h1 align="center">Beauty House <img src="https://i.pinimg.com/originals/0a/4c/01/0a4c012cc7d2124853dd9ee86c535ca2.gif" width="70px"></h1>

<p align="center">
  <a href="https://github.com/Intummadee/"><img src="https://readme-typing-svg.herokuapp.com?lines=Node.Js+,+Vue.js+,+Express.js+,+MySQL&center=true&width=500&height=50"></a>
</p>





<p align="center">
<em>
 This web application provides convenience for scheduling appointments to visit a beauty clinic. Customers can check their booking history, choose the desired physician for services, and the website owner can efficiently manage lists related to both customers and physicians
</em>
</p>



# 🎉 ฝั่ง FrontEnd
```npm install -g @vue/cli``` (การติดตั้ง Vue CLI เป็นขั้นตอนที่ทำเพียงครั้งเดียวเมื่อต้องการใช้งาน Vue CLI ครั้งแรกหรือต้องการอัปเกรดเวอร์ชัน Vue CLI ในภายหลัง หลังจากนั้นสามารถสร้างโปรเจ็กต์ Vue ใหม่โดยใช้คำสั่ง vue createได้เลย โดยไม่ต้องทำการติดตั้ง Vue CLI อีกครั้ ซึ่ง Vue CLI จะเป็น versioin ตาม Node ที่เครื่องตัวเองได้ลงไว้)

⚙️ ```vue create frontend```
-เลือก Default ([Vue 2] babel, eslint) และกด Enter

```
cd myfrontend
npm install bulma axios
```

👉 คำสั่ง Run --> ```npm run serve```

 <br>

---




# 🎉 ฝั่ง Backend
```
mkdir backend
cd backend
npm install express
```
- สร้างไฟล์ ```app.js``` แล้วเขียนโค้ดตามนี้
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
```
npm install cors
```

👉👉 คำสั่ง run คือ ```npx nodemon app.js```


<img width="100%" src="https://i.imgur.com/SVvgxJF.png" alt="@Josee9988/project-template's">



<div> 
 <a href="https://www.linkedin.com/in/intummadee-maliyam-800856226/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
 <a href = "mailto:intummadee@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
</div>

