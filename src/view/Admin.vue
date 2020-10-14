<template>
    <Login v-if="!userInfo.id"/>
    <div v-else class="box">
        <!-- <admin-nav/>
        <div class="adminHome">
            <el-menu 
                default-active="/admin"
                router
                class="el-menu-demo tab-page admin-h"
                mode="horizontal"
                active-text-color="#409EFF">
            <el-menu-item index="/admin" >首页</el-menu-item>
            <el-menu-item >管理员</el-menu-item>
            </el-menu>
            <div></div>
            <router-view></router-view>
        </div> -->
        <el-row style="height:100%;">
            <el-col :span="3" style="height:100%; min-width:200px;">
              <div class="grid-content bg-purple" style="height:100%;min-width:200px;">
                <admin-nav/>
              </div>
            </el-col>
            <el-col :span="21" style="height:100%;">
                <div class="grid-content bg-purple-light" style="height:100%;">
                    <el-menu 
                        default-active="/admin"
                        router
                        class="el-menu-demo tab-page admin-h"
                        mode="horizontal"
                        active-text-color="#409EFF"
                    >
                      <el-menu-item style="margin:auto;">欢迎进入九雅商城管理系统后台：{{userInfo.user_name}}</el-menu-item>
                    </el-menu>
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Login from './../components/Login/Login';
import AdminNav from './AdminNav';
export default {
    name: "Admin",
    computed:{
      ...mapState(['userInfo'])
    },
    components:{
        Login,
        AdminNav
    }
}
</script>

<style>
  .adminHome{
      width: 78%;
      height: 100%;
      display: flex;
  }
  .box{
    height: 100%;
  }
  .box>div{
      height: 100%;
      display: flex;
  } 
  /* .el-row {
    
  } */
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .admin-h{
      flex:1;
      height: 65px;
  }
</style>