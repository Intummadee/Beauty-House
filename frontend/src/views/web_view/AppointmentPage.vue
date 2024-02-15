<template>
    <div>
     
      
      <!-- <p> {{ $route.query.service }} </p> -->
  
      
      <!-- <p> $route.params.id = </p> -->
      <!-- <p> {{ $route.params.id }} </p> -->
      <!-- <p> {{ this.$route.params.userId }} </p> -->
     
  
      <section>
      <div class="container mt-5" style="width: 50%;">
        <form action="" id="app form">
          <div class="form-control p-5" id="app" style="background-color: #fefeff;color: #494D36">
  
            <h2>{{title}} <span style="color:red;">{{ $route.query.service }}</span></h2>
   
  
            <label for="doctor" class="form-label">Select Doctor:</label>
  
            <!-- หมอ  v-model="$v.username.$model"  -->
            <select v-model="$v.doctor_name.$model" class="form-select" :class="{'border-danger': $v.doctor_name.$error }">
              <option disabled value="">Please select one Doctor</option>
              <option v-for="n in doctor" :key="n.doctor">{{ n }}</option>
            </select>
            <p class="help is-danger" v-if="!$v.doctor_name.required"> <em>*กรุณาเลือกหมอ</em> </p>
            <!-- <p v-if="doctor_name==''" class="help is-danger">
              <em>*กรุณาเลือกหมอ</em>
            </p> -->
           
  
            
  
  
            
            <!-- calendar -->
            <label for="date" class="form-label">Date:</label> 
            <div id="datetimepicker">
              <input class="input" type="date" v-model="$v.start_date.$model" :class="{'border-danger': $v.start_date.$error}">
            </div>
            <p class="help is-danger" v-if="!($v.start_date.startdateCheck)"> <em>*ไม่สามารถเลือกจองวันที่ในอดีตได้</em> </p>
            <p class="help is-danger" v-if="!($v.start_date.required)"> <em>*กรุณาเลือกวันก่อนถึงจะสามารถเลือกเวลาได้</em> </p>
            <!-- <p class="help is-danger" v-if="!($v.start_date.required)"> <em>*กรุณาเลือกDoctor</em> </p> -->
            
  
  
  
            <!-- เวลา -->
            <label for="time" class="form-label">Select Time:</label>
            <select v-model="$v.time.$model" class="form-select" :class="{'border-danger': $v.time.$error}">
              <option disabled value="">Please select Time</option>
              <option v-for="n in time_all" :key="n.time">{{ n }}</option>
            </select>
            <!-- timeCheck -->
            <p class="help is-danger" v-if="!($v.time.required)"> <em>*กรุณาเลือกเวลา</em> </p>
  
  
  
            <!-- ปุ่มconfirm -->
            <div class="text-center mt-5" v-if="user && user.role=='customer'">
            <!-- <div class="text-center mt-5" v-if="user"> -->
              <button type="button" class="btn btn-outline-primary" @click="isActive = true">Confirm booking</button>
            </div>
  
            
  
            
  
  
            <!-- modal -->
            <div id="modal1" :class="{modal: modal, 'is-active': isActive}">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Cofirm Booking</p>
                <button class="delete" aria-label="close" @click="isActive = false"></button>
              </header>
              <section class="modal-card-body">
                <div class="content">
                  Doctor Name : {{ doctor_name }}
                  <br>
                  Date : {{ name_day }} {{ start_date }}
                  <br>
                  Time : {{ time }} โมง
                </div>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-success" @click="confirmBooking()">Submit</button>
                <button class="button" @click="isActive = false">Cancel</button>
              </footer>
            </div>
          </div>
  
            
         
         
  
          </div>
        </form>
      </div>
    </section>
  
  
  
       
    </div>
  
    
  
  </template>
  
  
  
  
  <script>
  import { required } from 'vuelidate/lib/validators'
  import axios from '@/plugins/axios'
   
  // ส่ง falseคือมัน จะแสดงสีแดงที่หน้าเว็บ
  function startdateCheck(value){
    let currentDate = new Date().toJSON().slice(0, 10);
    if(String(value) < String(currentDate)){
      return false
    }
    else{
      return true
    }
  }
  
  
  // function timeCheck(value){
  //   if(this.doctor_name != '' && this.start_date != ''){
  //     return false
  //   }
  //   return true
  // }
  
  
  
  export default {
    props: ['user'],
      data() {
        return {
          email: '',
          password: '',
          confirm_password: '',
          mobile: '',
          fname: '',
          lname: '',
          userId: '',
          start_date: '',
          name_day: '',
          title: 'Book Appointment',
          doctor: [],
          doctor_name: '',
          time: '',
          time_all: [],
          time_not_appoint : ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00"],
          modal: true,
          isActive: false,
          classArray: ['modal'],
        };
      },
      created() {
        // this.getDoctor(this.$route.params.id); ไปขอชื่อหมอ
        axios.get("http://localhost:3000/doctor")
          .then((res) => {
            console.log("ข้อมูลหมอ",res.data);
            this.doctor = res.data
          })
          .catch((err) => {
            console.log(err);
          });
      },
      methods:{
        confirmBooking(){
          this.$v.$touch();
          if(this.book_date == '' || this.time == '' || this.doctor_name == ''){
            this.isActive = false
            alert("กรอกข้อมูลให้ครบ")
          }
  
          
          if (!this.$v.$invalid) {
            console.log("ส่งBooking");
            let data = {
              book_date: this.start_date,
              book_time: this.time,
              doc_id: this.doctor_name,
              cust_id: this.user.cust_id,
              service: this.$route.query.service,
            }
            console.log(this.user.cust_id);
            console.log("dataที่จะส่งไปBooking : ", data);
            
          axios
          .post("http://localhost:3000/booking", data)
          .then((res) => {
              console.log("Bookเรียบร้อย", res);
              this.$router.push({path: '/'})
            })
            .catch((err) => {
              // ถ้าไม่สำเร็จ รับ errorออกมา
              alert(err)
              this.isActive = false
            });
          
        }
        else{
          alert('กรอกข้อมูลให้ถูกต้อง')
          this.isActive = false
          }
        },
      },
      computed: {
  
      },
      watch:{
        start_date(newVal){
          // เคลียร์ข้อมูล arrayของ timeทุกครั้ง เมื่อuserเปลี่ยน วันที่ในcalendar
          this.time_all.splice(0,this.time_all.length);
  
          
          const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          let day = weekday[new Date(newVal).getDay()];
          this.name_day = day
          console.log("ชื่อวัน/วันที่: ", this.name_day, this.start_date);
  
          
          // ส่งไปขอ timeที่ถูกจองไปแล้ว
          axios.get('http://localhost:3000/doctor/checkTime',
          {
            params: {
              doctor: this.doctor_name,
              date: this.start_date,
            }
          })
          .then((res) => {
            // res.data = คือเวลาที่จองไปแล้ว 
            if(res.data.length == 0){
              //  กรณี ในวันนั้น ยังไม่มีเวลาที่ถูกจองไปแล้วเลย
              for(let x in this.time_not_appoint){
                this.time_all.push(this.time_not_appoint[x])
              }
            }
            else{
              for(let x in this.time_not_appoint){
              if(res.data.includes(this.time_not_appoint[x])){
                // logเวลาที่ ถูกจองไปแล้วออกมา
                console.log(this.time_not_appoint[x]);
                }
              else{
                // เวลาที่ไม่มีมีใน res.data หรือก็คือเวลาที่ถูกจองไปแล้ว จะไม่ถูกpushลงไปใน arry ชื่อ this.time_all
                this.time_all.push(this.time_not_appoint[x])
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
  
  
        },
        time(newVal){
           this.time = newVal.substring(0,2)
        },
      },
      validations: {
        start_date : {
          startdateCheck,
          required,
        },
        doctor_name: {
          required,
        },
        time : {
          required,
        }
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
  
      border: 2px solid #494D36;
      ;
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
      font-size: 25px;
    }
  
    .form-label {
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
  
  
  
  
  
  
  
  
  
  
  </style>