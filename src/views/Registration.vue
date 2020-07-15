<template>
  <div class="about">
     <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/Registration">Registration</router-link>
      </div>
    <h1>Registration page</h1>

    <div class="container">

      <div class="block-item">
        <div class="block-title">
          <h3>Pasirinkti diena</h3>
          <hr>
        </div>
        <div class="block-content">
          <datepicker
            :inline="true"
            :monday-first="true"
            v-model="date"
            :highlighted="highlightedFn"
          >
          </datepicker>
        </div>
      </div>

        <div class="block-item" >
          <div class="block-title">
            <h3>Pasirinkti Laika</h3>
            <hr>
          </div>
           <div class="block-content">
          <div class="time-container" >
            <div class="houres">
              <input 
                v-for="(item, i) in timeData"
                :key="i.id" type="button"
                class="time"
                :disabled="!date"
                :value="i"
                @click="getHour(i)"
              >

            </div>
            <div class="minutes">
              <input type="button"
                :disabled="!hours || isUnavalible(hours +':00')"
                :class="{unavalible: isUnavalible(hours +':00')}"
                :value="hours +':00'"
                @click="getFullTime(hours +':00')"
              />
              <input type="button" 
                :disabled="!hours || isUnavalible(hours +':15')" 
                :class="{unavalible: isUnavalible(hours +':15')}" 
                :value="hours +':15'"
                @click="getFullTime(hours +':15')" 
               />
              <input type="button"
                :disabled="!hours || isUnavalible(hours +':30')"
                :class="{unavalible: isUnavalible(hours +':30')}"
                :value="hours +':30'"
                @click="getFullTime(hours +':30')"
              />
              <input type="button"
                :disabled="!hours || isUnavalible(hours +':45')"
                :class="{unavalible: isUnavalible(hours +':45')}"
                :value="hours +':45'"
                @click="getFullTime(hours +':45')"
              />
            </div>
          </div>
          </div>
        </div>

        <div class="block-item">
          <div class="block-title">
            <h3>Patvirtinti rezervacija</h3>
            <hr>
          </div>
           <div class="block-content">
             <form @submit.prevent="submit">
               <div class="form-item">
                <label for="date">Data: </label>
                <input type="text" disabled id="date" v-model="getDate">
               </div>
               <div class="form-item">
                <label for="time">Laikas:  </label>
                <input type="text" disabled id="time" v-model="time">
               </div>
               <div class="form-item">
                <label for="name">Kliento vardas:  </label>
                <input type="text" id="name" v-model="name">
               </div>
               <div class="form-item">
                <button type="submit">Submit</button>
               </div>
             </form>
         
          </div>
        </div>

    </div>

    
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
// import AllReservations from '../components/AllReservations'
import {mapMutations, mapGetters} from 'vuex'
export default {
   components: {
    Datepicker,
    // AllReservations
  },
  data() {
    return{
      date: '',
      time: '',
      name: '',
      timeData: { 
        '10:00': ['00', '15', '30', '45'],
        '11:00': ['00', '15', '30', '45'],
        '12:00': ['00', '15', '30', '45'],
        '13:00': ['00', '15', '30', '45'],
        '14:00': ['00', '15', '30', '45'],
        '15:00': ['00', '15', '30', '45'],
        '16:00': ['00', '15', '30', '45'],
        '17:00': ['00', '15', '30', '45'],
        '18:00': ['00', '15', '30', '45'],
        '19:00': ['00', '15', '30', '45'],
      },
      hours: '',
      closeDays: null,
      highlightedFn: {
        'dates': [new Date()]
      },

    }
  },
  computed: {
    ...mapGetters(['AllReservations']),
    getDate() {
      if(this.date !== ''){
        return this.date.toLocaleDateString("fr-CA");
      }
    },
    
    
  },
  methods: {
    getHour(item) {
      const hour = item.slice(0, 2)
      this.hours = hour

      const currentDate = this.AllReservations.filter(item => new Date(item.date).toLocaleDateString("fr-CA") === this.date.toLocaleDateString("fr-CA"))
      this.closeDays = currentDate


    },
    isUnavalible(time){

      if(this.closeDays !== null){
       return this.closeDays.some( item => item.time == time)
      }
      
    },
    getFullTime(item) {
      this.time = item
    },
      ...mapMutations(['makeReservation']),
    submit() {
      if(this.time && this.name !== ''){

        this.makeReservation({
          date: this.date,
          time: this.time,
          name: this.name,
          id: Date.now(),
          isEdit: false
        })
      this.time = this.name = this.hours = this.date = ''
       this.$router.push('/AfterReservation')
      }

      
    }
  }
}
</script>



<style lang="scss" scoped>
.vdp-datepicker__calendar{
      width: 100%!important;
      height: 333px!important;
    }
.container{
  display: flex;
  justify-content: space-between;
  .block-content{
    height: 85%;
    background: hsla(0,0%,100%,.6);
    width: 100%
  }
}

  .block-item{
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
    
  .block-title, hr{
    color: black;
    width: 100%;
  }
  .time-container{
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
  }
  .houres{
    width: 50%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    padding: 10px 0;
  
  .time{
    width: 60%;
    border: none;
    font-size: 16px;
    padding: 1px;
    border-radius: 5px;
    cursor: pointer;
    background: #f4ced5;
    margin: 5px 0;
  }
  }
  .minutes{
    width: 45%;
display: -webkit-flex;
display: flex;
-webkit-flex-direction: column;
flex-direction: column;
-webkit-align-items: center;
align-items: center;
-webkit-justify-content: space-around;
justify-content: space-around;
input{
  width: 60%;
border: none;
font-size: 22px;
margin: 5px;
border-radius: 5px;
cursor: pointer;
background: #ec91a2;
padding: 10px;
  &.unavalible{
  background: #ccb4b4;
}
}
  }
  .form-item{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
    input{
      width: 90%;
      border-radius: 5px;
      border: 1px solid black;
      padding: 6px;
      margin: 8px 8px;
      background: #fff;
    }
    button{
      width: 50%;
      border: none;
      font-size: 16px;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      background: #f4ced5;
    }
  }

</style>
