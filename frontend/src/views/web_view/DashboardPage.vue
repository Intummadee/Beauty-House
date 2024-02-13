<template>
    <div class="container1234" style="margin-top: 40px;">
         

        <!-- ========================= Main ==================== -->
        <div class="main active" >
             

             

            <!-- ================ Order Details List ================= -->
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
                                <td>{{ customer.fname }}</td>
                                <td> {{ customer.date }} </td>
                                <td>{{ customer.book_hour }}</td>
                                <td>{{ customer.service }}</td>
                                <td>{{ customer.doc_fname }}</td>
                                <td><span v-if="customer.status_name=='book'" @click="customer.status_name='success'; statuschange(index,'success')" class="status inProgress">{{ customer.status_name }}</span>
                                    <span v-if="customer.status_name=='success'" @click="customer.status_name='book'; statuschange(index,'book')" class="status delivered">{{ customer.status_name }}</span></td>
                            

                                <td><button type="button" @click="deletebook(index)" class="btn btn-danger btn-sm">DELETE</button></td>
                            </tr>
                        </tbody>
                    </table>


                    

                </div>

                 
            </div>
        </div>
    </div>

  </template>
  
  <script>

    
import axios from '@/plugins/axios'
export default {
    props: ['user'],
    data() {
        return {
            admin_id: '',
            menu_column:['Name','Date', 'Time','Service', 'DoctorName', 'Status'],
            data : [],
            find: '',
            group: '',
        }
      },
    methods:{
        statuschange(cust, newStatus){
          // cust =index, newStatus = 'ค่า'
          // this.data[1].book_id
            axios.put(`http://localhost:3000/data/status/${this.data[cust].book_id}/${newStatus}`)
                .then((res) => {
                    console.log("สถานะเปลี่ยน", res); 
                })
                .catch((err) => {
                console.log(err);
            });
        },  

        deletebook(cust){
            console.log(this.data[cust].book_id);
            axios.delete(`http://localhost:3000/data/delete/${this.data[cust].book_id}`)
                .then((res) => {
                    console.log("ลบเสร็จแล้ว", res);
                    this.$router.push({name: 'admin'})
                })
                .catch((err) => {
                console.log(err);
            });
        },

      }, 
    created() {
            axios.get("http://localhost:3000/data/admin")
            .then((res) => {
            console.log("ข้อมูลBooking", res.data);
            //   console.log(res.data[0]);
            for(let x in res.data){
                this.data.push(res.data[x])
            }
        })
        .catch((err) => {
            console.log(err);
        });
    },
    watch: {
        find(newVal){
            let tag;
            console.log(this.group);
            

            console.log(this.data.find(checkFind))

            console.log(newVal);

            function checkFind(data1) {

                if(this.group == 'Name'){
                    tag = this.data1.fname
                }
                console.log("--------------------------", tag);
                console.log(data1);

                // console.log(data1);
                return data1.includes(newVal);
            }
        }
    }

    


    }
  </script>
  
  <style scoped>



  /* =========== Google Fonts ============ */
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap");

/* =============== Globals ============== */
 
:root {
  --blue: #2a2185;
  --white: #fff;
  --gray: #f5f5f5;
  --black1: #222;
  --black2: #999;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
}

.container1234 {
  position: absolute;
  width: 100%;
}

/* =============== Navigation ================ */
.navigation {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background:  #E6E6FA;
  border-left: 10px solid  #E6E6FA;
  transition: 0.5s;
  overflow: hidden;
}
.navigation.active {
  width: 71px;
}

.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.navigation ul li {
  position: relative;
  width: 100%;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.navigation ul li:hover,
.navigation ul li.hovered {
  background-color: #fff;
}

.navigation ul li:nth-child(1) {
  margin-bottom: 40px;
  pointer-events: none;
}

.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: #fff;
}
.navigation ul li:hover a,
.navigation ul li.hovered a {
  color:  #2a2185;
}

.navigation ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 75px;
  text-align: center;
}
.navigation ul li a .icon ion-icon {
  font-size: 1.75rem;
}

.navigation ul li a .title {
  position: relative;
  display: block;
  padding: 0 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}

/* --------- curve outside ---------- */
.navigation ul li:hover a::before,
.navigation ul li.hovered a::before {
  content: "";
  position: absolute;
  right: 0;
  top: -50px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px #fff;
  pointer-events: none;
}
.navigation ul li:hover a::after,
.navigation ul li.hovered a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -50px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px #fff;
  pointer-events: none;
}

/* ===================== Main ===================== */
.main {
  position: absolute;
  width: calc(100% - 300px);
  left: 300px;
  min-height: 100vh;
  background: transparent;
  transition: 0.5s;
}
.main.active {
  width: calc(100% - 80px);
  left: 50px;
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
  border: 1px solid #999;
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
  background: #fff;
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
  color: #2a2185;
}
.cardHeader .btn {
  position: relative;
  padding: 5px 10px;
  background: #2a2185;
  text-decoration: none;
  color: #fff;
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
  background: #2a2185;
  color: #fff;
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
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
.status.pending {
  padding: 2px 4px;
  background: #e9b10a;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
.status.return {
  padding: 2px 4px;
  background: #f00;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}
.status.inProgress {
  padding: 2px 4px;
  background: #1795ce;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.recentCustomers {
  position: relative;
  display: grid;
  min-height: 500px;
  padding: 20px;
  background: #fff;
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
  color: #999;
}
.recentCustomers table tr:hover {
  background: #2a2185;
  color: #fff;
}
.recentCustomers table tr:hover td h4 span {
  color: #fff;
}

/* ====================== Responsive Design ========================== */
@media (max-width: 991px) {
  .navigation {
    left: -300px;
  }
  .navigation.active {
    width: 300px;
    left: 0;
  }
  .main {
    width: 100%;
    left: 0;
  }
  .main.active {
    left: 300px;
  }
  .cardBox {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .details {
    grid-template-columns: 1fr;
  }
  .recentOrders {
    overflow-x: auto;
  }
  .status.inProgress {
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .cardBox {
    grid-template-columns: repeat(1, 1fr);
  }
  .cardHeader h2 {
    font-size: 20px;
  }
  .user {
    min-width: 40px;
  }
  .navigation {
    width: 100%;
    left: -100%;
    z-index: 1000;
  }
  .navigation.active {
    width: 100%;
    left: 0;
  }
  .toggle {
    z-index: 10001;
  }
  .main.active .toggle {
    color: #fff;
    position: fixed;
    right: 0;
    left: initial;
  }
}

  </style>