<template>
  <footer class="footer py-4">
    <v-bottom-navigation v-model="value">
        <v-btn value="home" @click="homeBtnClick">
          <span>Home</span>
          <v-icon>fas fa-home</v-icon>
        </v-btn>
        <v-btn value="userInfo" @click="userInfoBtnClick">
          <span>myPage</span>
          <v-icon>fas fa-user</v-icon>
        </v-btn>
        <v-btn value="notice" @click="noticeBtnClick">
          <span>notice</span>
          <v-icon>fas fa-bell</v-icon>
        </v-btn>
    </v-bottom-navigation>
  </footer>
</template>

<script>

export default {
  name: 'Footer',
  methods: {
    openWindow(link) {
      this.$open_window(link, 'book', 0, 0)
    } ,
    homeBtnClick : function () {
      alert("회원권 화면으로 돌아갑니다.");
      this.$router.push({name : 'index'});
    }, 
    userInfoBtnClick : function () {
        this.$router.push({name : 'userInfo'});
    },
    noticeBtnClick : function () {
        this.$router.push({name : 'notice'})
    } 
  }
}
</script>

<style>
</style>
