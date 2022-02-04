import apiCommon from "@/api/modules/api-common";

export default {
  state: {
    size: Cookies.get('size') || 'medium',
    statusOptions: ['ACTIVE', 'PENDING', 'INACTIVE', 'PAID', 'REGISTERED'], 
    weekdays: [
      { value: 1, dayOfWeek: 'Mon', isChecked: false },
      { value: 2, dayOfWeek: 'Tue', isChecked: false },
      { value: 3, dayOfWeek: 'Wed', isChecked: false },
      { value: 4, dayOfWeek: 'Thu', isChecked: false },
      { value: 5, dayOfWeek: 'Fri', isChecked: false },
      { value: 6, dayOfWeek: 'Sat', isChecked: false },
      { value: 7, dayOfWeek: 'Sun', isChecked: false },
    ],
    sidebar: {
      opened: false,
      withoutAnimation: false
    },
    content: [],
    course: [],
  },
  getters: {
    app: state => state,
    roleOptions: state => state.roleOptions,
    content: state => state.content,
    course: state => state.course,
    sidebar: state => state.sidebar
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: state => {
      state.sidebar.opened = false
    },
    SET_CONTENT: (state, content) => {
      state.content = content
    },
    SET_COURSE: (state, course) => {
      state.course = course
    }
  },
  actions: {
    toggleSideBar({commit}) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({commit}) {
      document.getElementById("navbarResponsive").classList.remove("show")
      commit('CLOSE_SIDEBAR')
    },

    fetchContent ({commit}) {
      return apiCommon.getContent()
        .then(res => commit('SET_CONTENT', res))
    },

    fetchCourse ({commit}) {
      return apiCommon.getCourse()
        .then(res => commit('SET_COURSE', res))
    },
  }
}
