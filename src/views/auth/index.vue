<template>
  <div class="container text-center">
    <div class="row g-3"> 
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<!--        <div>-->
<!--          <a type="button" class="btn btn-lg btn-secondary btn-block" style="width: 300px"-->
<!--             :href="getSocialLoginUrl('kakao')">-->
<!--            Kakao-->
<!--          </a>-->
<!--        </div>-->
        <div>
          <a type="button" :href="getSocialLoginUrl('google')">
            <img type="button" src="http://dev.en9doors.com/files/public/en9door/website/button/btn_google_signin_light.png"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiAccount from "@/api/modules/api-account";

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      redirect: undefined,
      googleLoginLink: ''
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    getSocialLoginUrl(socialType) {
      return apiAccount.getSocialLoginUrl(socialType)
    }
  }
}
</script>

<style lang="scss">
$cursor: #fff;

</style>

