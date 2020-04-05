// 运用veevalidate.js的验证以及自定义一些消息。
import { extend, localize } from 'vee-validate'
import { required, email, min, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '邮箱',
    name: '昵称',
    username: '账号',
    password: '密码',
    code: '验证码'
  },
  // 自定义message信息,如下第一个emial是上面names中得名称email,第二个email是邮箱
  fields: {
    email: {
      email: '请输入正确得{_field_}',
      required: '请输入{_field_}!!!'
    }
  }
})
