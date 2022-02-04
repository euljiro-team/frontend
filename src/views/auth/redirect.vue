<template>
  <div></div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'

export default {
  created() {
    this.token = this.$route.query.token
  },
  mounted() {
    this.redirect()
  },
  methods: {
    ...mapActions(['fetchUser']),
    ...mapMutations(['SET_TOKEN']),
    redirect() {
      if (this.token) {
        this.SET_TOKEN(this.token)
        this.fetchUser()
            .then(() => this.$router.replace('/'))

        // if (socialType === 'google') {
        //   this.$router.push('https://google.zoom.us/google_oauth_signin');
        // }
      }
    }
  }
}
</script>
