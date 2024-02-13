<template>
    <div class="container">
      <form action="" id="form">
        <div class="form-control p-5 " style="background-color: #fefeff;color: #494D36; width: auto;">
          <h2 >Log in</h2>
          
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left">
              <input v-model="email" id="email" placeholder="Enter email" class="input" type="text" />
              <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
            </div>
          </div>
  
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input v-model="password" id="password" placeholder="Enter password" class="input" type="password" />
              <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
          </div>
  
          <!-- <p class="help is-danger" v-if="error!=''"> <em>*{{ error }}</em> </p> -->
          <p v-if="error" class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light">
            {{ error }}
          </p>
  
          <p class="my-3" style="font-size: 13px;">
            Don't have an account yet? 
            <router-link to="/signup/">
              <a href="#">Sign up</a>
            </router-link>
          </p>
  
          <div class="text-center mt-5">
            <button class="button is-link btn is-primary btn-outline-primary is-fullwidth" @click="submit()">
              Login
            </button>
              
  
  
          </div>
        </div>
      </form>
      
    </div>
  </template>
  
  <script>
  
  import axios from '@/plugins/axios'
  export default {
    data () {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      submit () {
        const data = {
          email: this.email,
          password: this.password
        }
  
        axios.post('http://localhost:3000/user/login/', data)
          .then(res => {
            const token = res.data.token                                
            localStorage.setItem('token', token)
            this.$emit('auth-change')
            this.$router.push({path: '/'})
            
          })
          .catch(error => {
            // console.log(error.response.data.details[0].message);
            this.error = error.response.data
            console.log(error.response.data);
            
            // this.error = error.response.data
            // console.log(error.response.data)
          });
  
          
  
      }
    }
     }
  
  
  
  
  
  
  </script>
  
  <style scoped>
  body {
      background-color: #CCBBB1;
    }
  
    .name {
      font-family: 'Ubuntu', sans-serif;
      color: #494D36;
  
    }
  
    header {
      background-color: #FAF2F2;
    }
  
  
  
    .booking {
  
      border: 2px solid #494D36;;
      border-radius: 5px;
      font-family: 'Ubuntu', sans-serif;
      color: #494D36;
  
    }
  
  
    .bi-person-circle {
      color: #494D36;
      font-size: 2.2rem;
    }
  
    .bi-house-door {
      color: #494D36;
      font-size: 2.2rem;
    }
  
    .bi-calendar {
      color: #494D36;
    }
  
    h2 {
      font-family: 'Raleway', sans-serif;
      text-align: center;
      font-size: 30px;
    }
  
    .label {
      font-size: 25px;
      font-family: 'Raleway', sans-serif;
    }
  
    input {
      width: 100%;
      height: 40px;
      font-family: 'Athiti', sans-serif;
      font-size: 20px;
      border-radius: 4px;
      border: solid 1px lightgray;
    }
  
    .btn {
      font-family: 'Raleway', sans-serif;
      font-size: 20px;
    }
  
    .time-item {
      background-color: aqua;
      width: 100px;
    }
  
  
    .form-control {
      width: fit-content;
    }
  
    .container {
      margin: 5% auto;
      display: block;
      width: 500px;
  
    }
  </style>