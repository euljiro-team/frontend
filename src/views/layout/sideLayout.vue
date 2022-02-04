<template>
  <div class="body" >
    <Navbar />

    <div class="app-main starter-template dark-mode" @click="closeSideBar()"  >
      <app-main/>
    </div>

    <Footer @click="closeSideBar()" />
  </div>
</template>
<script>
import Navbar from '@/views/base/Navbar'
import Footer from '@/views/base/Footer'
import {AppMain} from './components'
import {mapActions} from "vuex";

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Footer
  },
  methods: {
    ...mapActions(['closeSideBar'])
  }
}
</script>

<style lang="scss" scoped>

.app-main {
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  background-color: #0d1117;
  padding-top: 40px;
}

</style>
