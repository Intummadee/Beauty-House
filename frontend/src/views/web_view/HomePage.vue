<template>
    <section class="masthead">
      <div class="container " style="width: 40%;margin-left: 140px;margin-top: 60px;">
        <h3 style="font-size: 50px;">WELCOME TO <br> OUR BEAUTY HOUSE</h3>
        <p style="font-family: 'Athiti', sans-serif; font-size: 40px;">Make your look even more perfect with us</p>   
      </div>
      <div class="container " style="width: 40%;margin-left: 140px;margin-top: 50px;">
        <div class="form-control p-5" id="app"
          style="background-color: whitesmoke;color: #494D36; border-radius: 20px;box-shadow: 11px 8px 25px -7px rgba(182, 181, 181, 0.64);">
          <h1 class="pb-4">Our services</h1>
          <table class="table" style="background-color: whitesmoke">
            <tbody>
              <tr>
                <th><button @click="setservice(services[0])" class="button is-primary is-rounded is-medium is-outlined is-fullwidth">{{ services[0] }}</button> </th>
                <th><button @click="setservice(services[1])" class="button is-primary is-rounded is-medium is-outlined is-fullwidth">{{ services[1] }}</button></th>
              </tr>
              <tr>
                <th>
                  <button @click="setservice(services[2])" class="button is-primary is-rounded is-medium is-outlined is-fullwidth">{{ services[2] }}</button></th>
                <th>
                  <button @click="setservice(services[3])" class="button is-primary is-rounded is-medium is-outlined is-fullwidth">{{ services[3] }}</button></th>
              </tr>
              <tr>
                <th>
                  <button @click="setservice(services[4])" class="button is-primary is-rounded is-medium is-outlined is-fullwidth">{{ services[4] }}</button></th>
                <th>
                  <button @click="setservice(services[5])" class="button is-primary is-rounded is-medium is-outlined is-fullwidth">{{ services[5] }}</button> </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container " style="width: 40%;margin-left: 140px;margin-top: 40px;">
        <h2 style="font-size: 25px;">Free Consultation  &emsp;| &emsp;  Opening Hours: 9 A.M. - 6 P.M.</h2>
      </div>

    </section>
 


</template>



  
  <script>
  import axios from '@/plugins/axios'
  export default {
    name: "HomePage",
    props: ['user'],
      data() {
        return {
          services: ["Hair Removal", "Filler", "Botox", "Skin injection", "Skin laser", "Skin Lifting"],
          service: '',
          user_me: null,
        }
      },
      methods:{
        setservice(x){

          console.log("----->",this.user);
          if(this.user==null){
            alert("คุณยังไม่ Log in")
            this.$router.push({path: '/login'})
          }

          // this.$emit('service')
          console.log("x :", x);
          this.$emit('my-service', x)
          const token = localStorage.getItem('token') 
          axios.get('/user/me', { headers: {Authorization: 'Bearer ' + token} })
          .then(res => {
            // ตอนget axiosมันจะมาพร้อมแนบ bearerกับtokenด้วย
            // ส่งrequestไปเอาข้อมูลuserมาใช้งาน 
            this.user_me = res.data
            console.log("ค่าidจาก Home.vue: " ,this.user_me.cust_id);
            // week9
            this.$router.push({ name: 'Appointment', params:{ userId : this.user_me.cust_id}, query: {service: x} })
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

  .masthead {
    padding-top: 30px;
    background-position: right 10px;
    height: 120vh;
    min-height: 500px;
    background-image: url('https://cdn.discordapp.com/attachments/960844520340193301/1109475672201633831/Beauty_clinic_coverpx.png');
    background-size: 1955px;
    background-repeat: no-repeat;
    background-position: center;
  }

  h1 {
    font-size: 30px;
    text-align: center;
    font-family: 'Raleway', sans-serif;
    color: #494D36;
  }

  button {
    font-family: 'Raleway', sans-serif;
    ;
  }

  h3{
    font-family: 'Raleway', sans-serif;
    
  }



  </style>