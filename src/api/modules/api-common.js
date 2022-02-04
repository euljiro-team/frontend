import {methods} from '@/api/axios-voyagerss'

const apiCommon = {
  getContent () {
    return methods.get('/common/content')
  },
  getCourse () {
    return methods.get('/common/course')
  },
}

export default apiCommon
