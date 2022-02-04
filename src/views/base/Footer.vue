<template>
  <footer class="footer py-4">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-3 col-md-12 col-sm-12 col-xs-5">
          <div class="row">
            <router-link class="text-decoration-none me-3" to="/company/privacy_policy">Privacy Policy - 개인정보처리방침</router-link>
            <router-link class="text-decoration-none me-3" to="/company/use_term">Use Term - 이용약관</router-link>
<!--            <router-link class="text-decoration-none me-3" to="/company/company_info">Company Info</router-link>-->
          </div>
        </div>

        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-5">
          <a class="btn btn-dark btn-social mx-2">
            <!-- <img src="../../assets/icon/youtube_icon.svg" width="40"
                 @click="openWindow('https://www.youtube.com/channel/UC_tz6R7pbusavS-----------' )"> -->
          </a>
          <a class="btn btn-dark btn-social mx-2">
            <!-- <img src="../../assets/icon/instagram_icon.svg" width="40"
                 @click="openWindow('https://www.instagram.com/-----------' )"> -->
          </a>
          <a class="btn btn-dark btn-social mx-2">
            <!-- <img src="../../assets/icon/kakaotalk_icon.svg" width="40"
                 @click="openWindow('https://pf.kakao.com/-----------' )"> -->
          </a>
        </div>
        <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12">
          <div class="row align-items-end" style="text-align: left; font-size: small; color: darkgray">
            <div class="col-12" style="margin-left: 30px"> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import open_window from "@/utils/open-window";

export default {
  name: 'Footer',
  methods: {
    openWindow(link) {
      open_window(link, 'book', 0, 0)
    }
  }
}
</script>

<style>
</style>
