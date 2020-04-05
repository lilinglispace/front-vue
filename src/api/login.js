import axios from '@/utils/request'

/**
 * 获取验证码接口
 * @param sid sid是唯一标识
 * @returns {*}
 */
const getCode = (sid) => {
  // 等价于：
  // axios.request({
  //   method: 'get',
  //   url: '/getCaptcha'
  // })
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

/**
 * 找回密码接口
 * @param option option是用户信息
 * @returns {*}
 */
const forget = (option) => {
  return axios.post('/forget', {
    ...option
  })
}

/**
 * 用户登录接口
 * @param loginInfo loginInfo是用户的登录信息。
 * @returns {*}
 */
const login = (loginInfo) => {
  return axios.post('/login', {
    ...loginInfo
  })
}

/**
 * 用户注册接口
 * @param regInfo regInfo 用户注册信息
 * @returns {*}
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

export { getCode, forget, login, reg }
