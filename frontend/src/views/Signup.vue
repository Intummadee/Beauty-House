<template>
    <div class="container">
       
      <div class="column is-4 frame">
        <h1 class="title" style="text-align: center;">Sign Up</h1>
  
  
  
  
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input v-model="$v.email.$model" :class="{'is-danger' : $v.email.$error}" class="input" type="email" />
            
             
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
          <template v-if="$v.email.$error">
              <p class="help is-danger" v-if="!$v.email.required">This field is require</p>
              <p class="help is-danger" v-if="!$v.email.email">The email format is incorrect</p>
          </template>
        </div>
  
  
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
              <input v-model="$v.password.$model" :class="{'is-danger': $v.password.$error}" class="input" type="text" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <template v-if="$v.password.$error">
              <p class="help is-danger">error</p>
              <p class="help is-danger" v-if="!$v.password.required">This field is require</p>
              <p class="help is-danger" v-if="!$v.password.minLength">Password must be at least 4 letters</p>
              <p class="help is-danger" v-if="!$v.password.complexPassword">Password is too easy!</p>
          </template>
        </div>
  
  
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control has-icons-left has-icons-right">
              <input v-model="$v.confirm_password.$model" :class="{'is-danger': $v.confirm_password.$error}" class="input" type="text" />
               
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <template v-if="$v.confirm_password.$error">
              <p class="help is-danger">error</p>
              <p class="help is-danger" v-if="!$v.confirm_password.sameAs">ต้องเหมือนกับpassword</p>
          </template>
        </div>
  
  
        <div class="field">
          <label class="label">First Name</label>
          <div class="control has-icons-left has-icons-right">
              <input v-model="$v.fname.$model" :class="{'is-danger': $v.fname.$error}" class="input" type="text" />
          </div>
          <template v-if="$v.fname.$error">
              <p class="help is-danger">error</p>
              <p class="help is-danger" v-if="!$v.first_name.required">This field is require</p>
              <p class="help is-danger" v-if="!$v.first_name.maxLength">มากได้สูงสุด 45 ตัว</p>
          </template>
        </div>
  
  
  
  
        <div class="field">
          <label class="label">Last Name</label>
          <div class="control has-icons-left has-icons-right">
              <input v-model="$v.lname.$model" :class="{'is-danger': $v.lname.$error}" class="input" type="text" />
          </div>
          <template v-if="$v.lname.$error">
              <p class="help is-danger">error</p>
              <p class="help is-danger" v-if="!$v.last_name.required">This field is require</p>
              <p class="help is-danger" v-if="!$v.last_name.maxLength">มากได้สูงสุด 45 ตัว</p>
          </template>
        </div>
  
  
        
  
        <div class="field">
          <label class="label">Mobile Number</label>
          <div class="control has-icons-left has-icons-right">
              <input v-model="$v.mobile.$model" :class="{'is-danger': $v.mobile.$error}" class="input" type="text" />
            <span class="icon is-small is-left">
              <i class="fas fa-mobile"></i>
            </span>
          </div>
          <template v-if="$v.mobile.$error">
              <p class="help is-danger">error</p>
              <p class="help is-danger" v-if="!$v.mobile.required">This field is required</p>
              <p class="help is-danger" v-if="!$v.mobile.mobile">Invalid Mobile Number</p>
          </template>
        </div>
        <div class="field">
          <p v-if="error!=''" class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light">
            <em>*{{ error }}</em>
          </p>
        </div>
        
  
         
          <button class="button is-primary is-fullwidth" @click="submit()">Sign Up</button>
        
          <p class="my-3">
            Already have an account?  
            <router-link to="/login/">
              <a href="#">Login</a>
            </router-link>
          </p>
  
  
      </div>
       
      
    </div>
  </template>
  
  <script>
  import { required, email, minLength, sameAs, maxLength } from 'vuelidate/lib/validators'
  import axios from '@/plugins/axios'
  
  function mobile (value) {
      return !!value.match(/0[0-9]{9}/)
  //    ต้องนำหน้าด้วย0 แล้วมีเลข 0-9 จำนวน 9 ตัว
  }
  
  function complexPassword (value) {
      if (!(value.match(/[A-Z]/) && value.match(/[0-9]/))) {
          return false
      }
      return true
  }
  
  
  
  export default {
    data(){
            return{
                email: '',
                password: '',
                confirm_password: '',
                mobile: '',
                fname: '',
                lname: '',
                userId: '',
                error: '',
            }
          },
          validations: {
              // validationsมันจะสร้าง instance ที่เปนตัวแปร $v
              email: {
                  required, 
                  email: email
              },
              mobile: {
                  required: required,
                  mobile: mobile
              },
              password: {
                  required,
                  minLength: minLength(4),
                  complexPassword,
              },
              confirm_password: {
                  sameAs: sameAs('password'),
              },
              fname: {
                  required,
                  maxLength: maxLength(45),
              },
              lname: {
                  required,
                  maxLength: maxLength(45),
              },
          },
          methods: {
            submit() {
                // ตรวจสอบ Validate all fields 
                this.$v.$touch();
  
                // เช็คว่าในฟอร์มไม่มี error
                if (!this.$v.$invalid) {
                  let data = {
                    email: this.email,
                    password: this.password,
                    confirm_password: this.confirm_password,
                    mobile: this.mobile,
                    fname: this.fname,
                    lname: this.lname,
                  }
                  
  
                  axios
                    .post("http://localhost:3000/user/signup", data)
                    .then((res) => {
                      // ถ้าสำเร็จจะรับ responseกลับมา
                      console.log("signup_Page, res.data->", res.data);
                      // this.userId = res.data.rows
                      alert("Sign up Success");
                      
                      
                      const token = res.data.token                                
                      localStorage.setItem('token', token)
                      this.$emit('auth-change')
                      // this.$router.push({ name: 'Appointment', params:{ userId : res.data.rows }})
  
                      this.$router.push({path: '/'})
                     
  
  
                    })
                    .catch((err) => {
                      // ถ้าไม่สำเร็จ รับ errorออกมา
                      console.log(err.message);
                      console.log(err);
                      console.log(err.response.data.details.details);
                      console.log(err.response.data.details);
                      this.error = err.response.data.details.details
                      // alert(err.response.data.details.details);
                      // alert(err.response.data.details.message)
                    })
                }
            },
          },
  
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
      background-color: white;
      margin: 5% auto;
      width: auto;
      display: block;
      width: 500px;
    }
  
  
  
    .frame{
      width: 100%;
    }
  
  </style>