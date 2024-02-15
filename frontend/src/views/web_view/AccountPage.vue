<template>
    <section class="py-5 my-5">
		<div class="container">
			<div class="bg-white shadow rounded-lg d-block d-sm-flex">
				<div class="profile-tab-nav border-right">
					<div class="p-4"> 
						<h4 class="text-center">Kiran Acharya</h4>
					</div>
					<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
						<a class="nav-link active" id="account-tab" data-toggle="pill"  aria-controls="account" aria-selected="true">
							<i class="fa fa-home text-center mr-1"></i> 
							Account
						</a>
						
					</div>
				</div>
				
			</div>
		</div>
		
		<div class="container123" v-if="user.role=='customer'">
		<div class="main">
			<div class="details">
                <div class="recentOrders">
                    

					<table>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td v-for="n in menu_column" :key="n.column"> {{ n }} </td>
                                <td></td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(customer, index) in data" :key="customer.id">
                                <td>{{ index+1 }}</td>
                                <td>{{ customer.date }}</td>
                                <td> {{ customer.book_hour }} </td>
                                <td>{{ customer.doc_fname }} {{ customer.doc_lname }}</td>
                                <td>{{ customer.service }}</td>
                                <td><span v-if="customer.status_name=='book'"  class="status inProgress">{{ customer.status_name }}</span>
								<span v-if="customer.status_name=='success'" class="status delivered">{{ customer.status_name }}</span></td>
                            

                                
                            </tr>
                        </tbody>
                    </table>


                    
                </div>
            </div>	

		</div>
	</div>



	</section>

  </template>
  
  <script>
  import { minLength } from 'vuelidate/lib/validators'
  import axios from '@/plugins/axios'
  
  function complexPassword (value) {
    if (!(value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
  }


  export default {
    props: ['user'],
    data() {
      return {
        email: '',
        password: '',
        newpassword:'',
        menu_column: ['Date', 'Hour', 'Doctor', 'Service', 'Status'],
        data: [], 
        error: '',
      }
    },
    validations: {
      password:{
        complexPassword,
        minLength: minLength(4),
      }
    },
	methods: {
		changePassword(){

      this.$v.$touch();

			console.log("Password เก่า : ", this.user.cust_pass);			
      if (!this.$v.$invalid) {
			axios
				.put("http://localhost:3000/password", {user : this.user, newPassword : this.password})
				.then((res) => {
					console.log("Password ใหม่ : ", res.data.comment);
					// this.newpassword = res.data.comment
					alert("Password ใหม่ของคุณคือ : " + res.data.comment)
				})
				.catch((err) => {
					// ถ้าไม่สำเร็จ รับ errorออกมา
					// alert(err)
          console.log(err.response.data.details.details);
          this.error = err.response.data.details.details
					this.isActive = false
				})
      }
			},
	},

	mounted() {
		// ไปเอา ข้อมูล booking ของ customer คนนี้้
		axios.get(`http://localhost:3000/history/${this.$route.params.userId}`)
        .then((res) => {
          console.log("ข้อมูลBookingของcustomer", res.data);
          for(let x in res.data){
      this.data.push(res.data[x])
            }
        })
        .catch((err) => {
          console.log(err);
        });
	}
    }
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
  .shadow {
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
}

label{
  font-size: 30px;
}

.profile-tab-nav {
	min-width: 250px;
}

.tab-content {
	flex: 1;
}

.form-group {
	margin-bottom: 1.5rem;
}

.nav-pills a.nav-link {
	padding: 15px 20px;
	border-bottom: 1px solid #ddd;
	border-radius: 0;
	color: #333;
}
.nav-pills a.nav-link i {
	width: 20px;
}

.img-circle img {
	height: 100px;
	width: 100px;
	border-radius: 100%;
	border: 5px solid #fff;
}













.container1234 {
  position: relative;
  width: 100%;
}
.main {
  position: absolute;
  width: calc(100% - 300px);
  left: 130px;
  min-height: 100vh;
  background: transparent;
  transition: 0.5s;
}
.main.active {
  width: calc(100% - 80px);
  left: 80px;
}

.topbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.toggle {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  cursor: pointer;
}

.search {
  position: relative;
  width: 400px;
  margin: 0 10px;
}

.search label {
  position: relative;
  width: 100%;
}

.search label input {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  padding: 5px 20px;
  padding-left: 35px;
  font-size: 18px;
  outline: none;
  border: 1px solid #222;
}

.search label ion-icon {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 1.2rem;
}

.user {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.user img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

 

/* ================== Order Details List ============== */
.details {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
   
  /* margin-top: 10px; */
}

.details .recentOrders {
  position: relative;
  display: grid;
  min-height: 500px;
  background: white;
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
}

.details .cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.cardHeader h2 {
  font-weight: 600;
  color: SandyBrown;
}
.cardHeader .btn {
  position: relative;
  padding: 5px 10px;
  background: SandyBrown;
  text-decoration: none;
  color: white;
  border-radius: 6px;
}

.details table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.details table thead td {
  font-weight: 600;
}
.details .recentOrders table tr {
  color:  #222;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.details .recentOrders table tr:last-child {
  border-bottom: none;
}
.details .recentOrders table tbody tr:hover {
  background: SandyBrown;
  color: white;
}
.details .recentOrders table tr td {
  padding: 10px;
}
.details .recentOrders table tr td:last-child {
  text-align: end;
}
.details .recentOrders table tr td:nth-child(2) {
  text-align: end;
}
.details .recentOrders table tr td:nth-child(3) {
  text-align: center;
}
.status.delivered {
  padding: 2px 4px;
  background: #8de02c;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
.status.pending {
  padding: 2px 4px;
  background: #e9b10a;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
.status.return {
  padding: 2px 4px;
  background: #f00;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
.status.inProgress {
  padding: 2px 4px;
  background: #1795ce;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.recentCustomers {
  position: relative;
  display: grid;
  min-height: 500px;
  padding: 20px;
  background: white;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
}
.recentCustomers .imgBx {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  overflow: hidden;
}
.recentCustomers .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.recentCustomers table tr td {
  padding: 12px 10px;
}
.recentCustomers table tr td h4 {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2rem;
}
.recentCustomers table tr td h4 span {
  font-size: 14px;
  color: #222;
}
.recentCustomers table tr:hover {
  background: SandyBrown;
  color: white;
}
.recentCustomers table tr:hover td h4 span {
  color: white;
}





  </style>