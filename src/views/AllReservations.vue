<template>
  <div class="home">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/AllReservations">All Reservations</router-link>
      </div>
      <h1>Reservation</h1>

      <AllReservations />
  </div>
</template>

<script>

import AllReservations from '../components/AllReservations'
export default {
  name: 'Home',
  components: {
      AllReservations
  },
  data() {
    return{
     
    }
  }
}
</script>
