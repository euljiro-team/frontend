import apiAccount from '@/api/modules/api-account'

export default {
  state: {
    token: null,
    user: {
      accountId: null,
      accountRoles: null,
      accountSnsId: null,
      createdAt: null,
      email: null,
      englishName: null,
      expired: null,
      koreanName: null,
      password: null,
      phone: null,
      providerType: null,
        accessToken: null,
      refreshToken: null,
      role: null,
      snsAccount: null,
      status: null,
      username: null,
        profile_image_url:''
    },
    isAuthPhone: false,
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      !token
          ? window.sessionStorage.removeItem('accessToken')
          : window.sessionStorage.setItem('accessToken',token)
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user= user
    },
    SET_AUTH_PHONE: (state, isAuthPhone) => {
      state.isAuthPhone= isAuthPhone
    }
  },
  actions: {
    fetchUser ({state, commit}) {
      return new Promise(resolve => {
        if (state.user.accountId){
          resolve(state.user.accountId)
        }else {
          apiAccount.getUser()
            .then(res => {
              window.sessionStorage.setItem('accountId', res.accountId)
              window.sessionStorage.setItem('refreshToken', res.refreshToken)
              window.sessionStorage.setItem('username', res.username)
              window.sessionStorage.setItem('email',res.email)
              window.sessionStorage.setItem('role',res.role)
              commit('SET_USER', res)
              resolve(res)
            })
        }
      })
    },
    updateUser ({state, commit}) {
      return new Promise(resolve => {
          apiAccount.putUser(state.user)
              .then(res => {
                  commit('SET_USER', res)
                  resolve(res)
              })
      })
    },
    // user logout
    logout({commit}) {
      return new Promise(resolve => {
          let emptyUser = {
            accountId: null,
            username: null,
            email: null,
            role: null,
            token: null
          }
          window.sessionStorage.removeItem('accessToken')
          window.sessionStorage.removeItem('refreshToken')
          window.sessionStorage.removeItem('accountId')
          window.sessionStorage.removeItem('username')
          window.sessionStorage.removeItem('email')
          window.sessionStorage.removeItem('role')
          commit('SET_USER', emptyUser)
          commit('SET_REGISTER', undefined)
          commit('SET_TOKEN', undefined)
          resolve()
      })
    }
  }
}
