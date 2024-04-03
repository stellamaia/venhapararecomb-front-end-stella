<template>
  <v-app>
    <div>
      <NavBar />
      <PaymentCheckout />
    </div>

   
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import PaymentCheckout from './components/PaymentCheckout.vue'
export default {
  name: 'AppView',
  data() {
    return {
    }
  },
  components: {
    NavBar,
    PaymentCheckout
  }

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-sheet.v-card {
  border-radius: none;
}
</style>
