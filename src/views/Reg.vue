<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{name: 'login'}">登入</router-link></li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input name="username" class="layui-input" placeholder="请输入标题" autocomplete="off" v-model="username" type="text">
                      </div>
                      <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      <div class="error layui-form-mid">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label">昵称</label>
                    <ValidationProvider rules="required|min:2" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input name="name" class="layui-input" placeholder="请输入昵称" autocomplete="off" v-model="name" type="text">
                      </div>
                      <div class="error layui-form-mid">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider rules="required|min:6|max:16|confirmed:confirmation" v-slot="{ errors }">
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label">密码</label>
                        <div class="layui-input-inline">
                          <input name="password" class="layui-input" placeholder="请输入密码" autocomplete="off" v-model="password" type="password">
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                        <div class="error layui-form-mid">{{ errors[0] }}</div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <ValidationProvider v-slot="{ errors }" vid="confirmation">
                      <div class="layui-row">
                        <label for="L_repass" class="layui-form-label">确认密码</label>
                        <div class="layui-input-inline">
                          <input name="repassword" class="layui-input" placeholder="请输入密码" autocomplete="off" v-model="repassword" type="password">
                        </div>
                        <div class="error layui-form-mid">{{ errors[0] }}</div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <ValidationProvider rules="required|length:4" v-slot="{ errors }">
                    <div class="layui-form-item">
                      <label for="L_vercode" class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input name="code" class="layui-input" placeholder="请输入验证码" autocomplete="off" v-model="code" type="text">
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;" v-html="svg" @click="_getCode"></span>
                      </div>
                      <div class="error verify-error">{{ errors[0] }}</div>
                    </div>
                  </ValidationProvider>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="button" @click="validate().then(submit)">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                    <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, reg } from '@/api/login'

export default {
  name: 'Reg',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      repassword: '',
      code: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      const sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // 如果表单校验失败，整个逻辑就不发送出去
        return
      }
      reg({
        username: this.username,
        password: this.password,
        code: this.code,
        name: this.name,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.name = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登录页面，让用户登录
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          // res.msg = { username: [], name: [], code: []}
          // username -> '用户名已注册'
          this.$refs.observe.setErrors(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }

</style>
