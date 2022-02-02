<template>
  <v-app>
      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <!--<img src="https://randomuser.me/api/portraits/women/81.jpg">-->
            </v-list-item-avatar>

            <v-list-item-content>윤가영</v-list-item-title>
              <v-list-item-subtitle>개발자</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
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
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    items : [
      /* 우선 어디로 이동할지 안정했으니 수강신청 화면으로 이동한다. */
      {  title : '강사 등록' , icon : 'mdi-account'  , to: '/enrolclasses'} , 
      {  title : '회원 관리' , icon : 'mdi-account' , to:'/enrolclasses' } , 
      {  title : '메타 조회' , icon : 'mdi-account' , to: '/meta' } 
    ],
    drawer : false
  }),
  methods: {
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
};
</script>
