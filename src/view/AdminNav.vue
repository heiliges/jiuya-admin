<template>
<div class="adminNav">
    <el-row class="tac">
        <el-col :span="24" class="aside-h">
            <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo aside-h"
            router
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened="true">
            <el-menu-item index="/admin" class="tags">后台管理系统</el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/goodslist" >商品列表</el-menu-item>
                <el-menu-item index="/goodsadd">商品添加</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/userlist" >用户列表</el-menu-item>
                <el-menu-item index="/useradd">用户添加</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/orderlist" >订单列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item @click="userlogout">
                <i class="el-icon-setting"></i>
                <span slot="title">退出登录</span>
            </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</div>
</template>

<script>
import {mapActions} from 'vuex';
  export default {
    name:'adminNav',
    methods: {
      ...mapActions(["logout"]),
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      userlogout(){
        this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.$message({
                type: 'success',
                message: '退出登录!'
              });
              this.logout({});
              this.$router.replace('/admin');
              // console.log(result.message);   
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
    }
  }
</script>
<style lang="stylus">
    .adminNav
        width 100%
        height 100%
        display flex
        min-width 201px
        .tac
            height 100%
            width 100%
        .aside-h
            height 100%
            .tags
                height 80px
                font-size 18px
                line-height 80px
                text-align center
               
</style>