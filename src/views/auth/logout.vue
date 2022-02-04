<template>
  <div></div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'

export default {
  created() {
    new Promise((resolve) => {
      this.SET_REGISTER(null)
      this.logout()
      resolve()
    })
    .then(() => {
      this.$router.replace('/')
      this.$router.go();
    })
    // .finally(() => this.$router.push('/'))
  },
  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['SET_USER', 'SET_REGISTER'])
  }
}
</script>
