<template>
  <div class="home">
    <WelcomePage :msg="message" />
  </div>
</template>

<script>

import WelcomePage from '../components/WelcomePage'
export default {
  name: 'Home',
  components: {
    WelcomePage
  },
  data() {
    return{
      message: 'Welcome'
    }
  }
}
</script>
