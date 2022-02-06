<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top" aria-label="Third navbar">

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
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
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
    <!-- <div class="container">
      <router-link class="navbar-brand" to="/"><img width="20" src="-------------------------" alt="..."/> </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">

        <i class="fas fa-bars ms-1"></i>
      </button>
      <div id="navbarResponsive" class="collapse navbar-collapse" :class="classObj"  >
        <ul class="navbar-nav mb-2 mb-sm-0">
          <li v-if="showMenuOfRole('STUDENT')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/student/register">Register<br>수강 신청</router-link></li>
          <li v-if="showMenuOfRole('STUDENT')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/student/assign">Class<br>수강 현황</router-link></li>

          <li v-if="showMenuOfRole('TEACHER')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/teacher/register">Teacher<br>Register List</router-link></li>
          <li v-if="showMenuOfRole('TEACHER')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/teacher/assigns">Teacher<br>Assign List</router-link></li>
          <li v-if="showMenuOfRole('TEACHER')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/teacher/attends/student">Teacher<br>Attend List</router-link></li>
          <li v-if="showMenuOfRole('TEACHER')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/teacher/attends/today">Teacher<br>Attend Today</router-link></li>

          <li v-if="showMenuOfRole('MANAGER')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/manager/register" >Manager<br>Register List</router-link></li>
          <li v-if="showMenuOfRole('MANAGER')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/manager/assigns" >Manager<br>Assign List</router-link></li>
          <li v-if="showMenuOfRole('MANAGER')" class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/manager/accounts" >Manager<br>Account List</router-link></li>
          <li v-if="user.username != null"          class="nav-item" @click="closeSideBar()"><router-link class="nav-link" style="font-size: small" to="/profile"  > {{ this.user.username }}<br>내 정보</router-link></li>

          <li v-if="user.email != null " class="nav-item" @click="closeSideBar()"><router-link class="nav-link" to="/logout">Log Out</router-link></li>
          <li v-if="user.email == null " class="nav-item" @click="closeSideBar()"><router-link class="nav-link" to="/login">Login</router-link></li>
        </ul>
      </div>
    </div> -->
  </nav>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  name: 'NavBar',
  data: () => ({
    items : [
      /* 우선 어디로 이동할지 안정했으니 수강신청 화면으로 이동한다. */
      {  title : '강사 등록' , icon : 'mdi-account'  , to: '/enrolclasses'} , 
      {  title : '회원 관리' , icon : 'mdi-account' , to:'/enrolclasses' } , 
      {  title : '메타 조회' , icon : 'mdi-account' , to: '/meta' } ,
      {  title : '로그인' , icon : 'mdi-account' , to: '/login' } 
    ],
    drawer : false
  }),
  computed: {
    ...mapGetters(['sidebar','user']),
    classObj() {
      return {
        collapse: !this.sidebar.opened,
        show: this.sidebar.opened
      }
    },

  },
  created() { },
  mounted() { },
  methods: {
    showMenuOfRole(menuRole){
      return this.user.accountRoles != null
          ? this.user.accountRoles.includes(menuRole)
          : false
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.replace('/')
      this.$router.go();
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    closeSideBar() {
      this.$store.dispatch('closeSideBar')
    }
  }
}
</script>
