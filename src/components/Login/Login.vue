<template>
<div class="box">
    <div class="login-container">
      <!--登录面板内容部分-->
      <div class="login-inner">
        <!--面板头部-->
        <div class="login-header">
          <div class="login-logo">
            <img src="./images/lk_logo_sm.png" alt="" width="250">
          </div>
          <!--面板标题-->
          <div class="login-header-title">
            <span class="current">后台管理系统登录</span>
          </div>
        </div>
        <!--面板表单部分-->
        <div class="login-content">
          <div >
            <!--账号登录部分-->
            <div class="current">
              <section>
                <section class="login-message">
                  <input type="tel" maxlength="11" placeholder="用户名" v-model="name">
                </section>
                <section class="login-verification">
                  <input type="password" placeholder="密码" v-model="pwd" v-if="pwdMode">
                  <input type="text" placeholder="密码" v-model="pwd" v-else>
                  <div class="switch-show">
                    <img @click="dealPwdMode(false)" :class="{on: pwdMode}" src="./images/hide_pwd.png" alt="" width="20">
                    <img @click="dealPwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt="" width="20">
                  </div>
                </section>
              </section>
            </div>
            <button class="login-submit" @click="login">登录</button>
          </div>
          <!-- <button class="login-back" @click="$router.back()">返回</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { pwdLogin} from './../../api/index'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        pwdMode: true, // 密码显示方式，false代表明文, true代表密文
        userInfo: {}, // 用户信息
        name: 'admin', //用户名
        pwd: '123456', //密码
      }
    },
    computed:{
    },
    methods: {
      // 1. 设置登录方式
      ...mapActions(['syncUserInfo']),
      dealPwdMode(flag){
          return this.pwdMode = !this.pwdMode;
      },
      async login(){
          //用户名和密码登录
          //  前端验证
          if (!this.name) {
            this.$message({
            type: 'error',
            message: '请输入用户名'
          }); 
            return
          } else if (!this.pwd) {
            return
            this.$message({
            type: 'error',
            message: '请输入密码'
          }); 
          }
          // console.log(1111)
          // 用户名和密码登录
          const result = await pwdLogin(this.name, this.pwd);
          console.log(result)
          if(result.success_code === 200) {
            this.userInfo = result.message;
              this.syncUserInfo(this.userInfo);
              
              // console.log(result.message)
              this.$router.replace('/admin');
              // console.log(this.syncUserInfo)
          } else {

            this.$message({
              type: 'error',
              message: '该用户不是管理员'
            });
            // console.log(result)
          }  
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .box 
    width 480px
    margin auto
    background #f5f5f5
    display flex
    justify-content center
    flex-direction column
    .login-container
      width 100%
      height 100%
      background #f5f5f5
      .login-inner
        padding-top 60px
        width 80%
        margin 0 auto
        .login-header
          .login-logo
            font-size 40px
            font-weight bold
            color mediumpurple
            text-align center
          .login-header-title
            padding-top 40px
            padding-bottom 10px
            text-align center
            > span
              color #333
              font-size 14px
              padding-bottom 4px
              &.current
                color mediumpurple
                font-weight 700
                border-bottom 2px solid mediumpurple
                font-size 18px
        .login-content
          > div
            > div
              display none
              &.current
                display block
              input
                width 100%
                height 100%
                padding-left 8px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid mediumpurple
              .login-message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get-verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.count_down_number
                    color purple
              .login-verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch-show
                  position absolute
                  right 10px
                  top 12px
                  img
                    display none
                  img.on
                    display block
              .login-hint
                margin-top 12px
                color #999
                font-size 12px
                line-height 20px
                > a
                  color mediumpurple
            .login-submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background mediumpurple
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .login-back
            display block
            width 100%
            height 42px
            margin-top 15px
            border-radius 4px
            background transparent
            border: 1px solid mediumpurple
            color mediumpurple
            text-align center
            font-size 16px
            line-height 42px
</style>
