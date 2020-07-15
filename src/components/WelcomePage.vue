<template >
    <div>
        <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/Registration">Registration</router-link>
      </div>
        <h1>{{msg}}</h1>
        <img src="../assets/image.jpg" alt="">
    </div>
</template>

<script>
export default {
     data() {
        return{
            // myMsg: this.msg
        }
    },
    props: {
        msg: {
            type: String,
            default: null,
            reguared: false
        }
    },
   
}
</script>

<style lang="scss" scoped>
    h1{
        font-size: 42px;
    }
</style>