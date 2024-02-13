<template>

  <div id="app">
    <header class="d-flex flex-wrap justify-content-center px-3">
      <a href="#" class=" navbar-brand d-flex align-items-center mb-3 md-0 me-md-auto text-dark text-decoration-none">
        <img src="https://media.discordapp.net/attachments/1079395193410813992/1080070246171430922/Beauty_clinic3.png"
          width="60">
        <span class=" name mt-2 fs-3">Beauty clinic</span>
      </a>

      <ul class="nav nav-pills align-items-center">
        <li class="nav-item booking rounded-pill">
          <router-link class="nav-link p-2" :to="{ name: 'home' }">
            <span class="bi bi-calendar">
              Book
              Appointment</span>
          </router-link>
        </li>

        <li class="nav-item" v-if="user && user.role=='admin'">
          <router-link class="nav-link p-2" :to="{ name: 'admin' }">
            <!-- <span class="bi bi-hand-index-thumb"></span> -->
            <img width="45px" src="https://media.discordapp.net/attachments/1000048161865338900/1109782481353310288/image.png?width=640&height=640" alt="">
          </router-link>
           </li>
        <router-link class="btn" v-if="!user" :to="{ name: 'login' }">
          <li class="nav-item "><span class="bi bi-person-circle"></span></li>
        </router-link>

        <router-link class="btn" v-if="user" :to="{ name: 'account', params: { userId: user.cust_id }}">
          <li class="nav-item "><i class="bi fa-2x bi-person-lines-fill"></i></li>
        </router-link>


        <li class="nav-item" v-if="user"> 
          <router-link :to="{ name : 'login'}"><button type="button" class="btn btn-info" @click="out()">Log out</button></router-link>
          
        </li>
        
        <li v-if="user">
          <span class="pl-3">{{ user.fname }} {{ user.lname }}</span>
        </li>

        

       

      </ul>
    </header>
    <router-view :key="$route.fullPath" @auth-change="onAuthChange" @my-service="myService" :user="user"/>
    <!-- tag <router-view/> จะเปลี่ยนไปตาม router ที่ตั้งไว้ -->



  </div>
</template>


<script>
import axios from '@/plugins/axios'
export default {
  data () {
    return {
      user: null,
      service: '',
    }
  },
  mounted () {
     this.onAuthChange()
     this.myService()
   },
   methods: {
     onAuthChange () {
       const token = localStorage.getItem('token')
      //  เมธอดนี้ไปเอา token มาจากlocalstorage
       if (token) {
         this.getUser()
       }
     },
     getUser () {
       const token = localStorage.getItem('token') 
      //  ไม่ใช้เพราะเราใช้ axios interceptor
       axios.get('/user/me', { headers: {Authorization: 'Bearer ' + token} }).then(res => {
      // ตอนget axiosมันจะมาพร้อมแนบ bearerกับtokenด้วย
      // ส่งrequestไปเอาข้อมูลuserมาใช้งาน 
         this.user = res.data
         console.log("ค่าuserจากtoken: " ,this.user);
       })
     },
     out(){
       this.user = null
       localStorage.removeItem("token");
     },
     myService(data) {
        this.service = data
        console.log("ในApp.vue --> myService: ",this.service);
      },

      


     
   }
}
</script>
