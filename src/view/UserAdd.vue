<template>
    <div class="addUserbox">
        <div class="adduserheader">添加用户</div>
        <div class="adduser">
            <el-form :model="form" ref="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.user_name" autocomplete="off" placeholder="必填！请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="formLabelWidth">
                    <el-input v-model="form.user_pwd" autocomplete="off" placeholder="必填！请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.user_phone" autocomplete="off" placeholder="选填！请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="form.user_sex" placeholder="选填！" >
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
                </el-form-item> 
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.user_address" autocomplete="off" placeholder="选填！请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth">
                    <el-date-picker type="date" format="yyyy年MM月dd日" placeholder="选填！" v-model="form.user_birthday" style="width: 30%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="爱好" :label-width="formLabelWidth">
                    <el-input v-model="form.user_sign" autocomplete="off" placeholder="选填！"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-right">
                <el-button @click="clearForm">清 空</el-button>
                <el-button type="primary" @click="adduserlist(form)">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'UserAdd',
    data() {
        return {
          formLabelWidth: '120px',
          formDataWidth:'50px',
          form:{
              user_name:'',
              user_pwd:'',
              user_phone:'',
              user_sex:'',
              user_address:'',
              user_birthday:'',
              user_sign:''
          }
        }
    },
    methods:{
        clearForm(){ //清空表单
            this.form={
              user_name:'',
              user_pwd:'',
              user_phone:'',
              user_sex:'',
              user_address:'',
              user_birthday:'',
              user_sign:''
          };
        },
        adduserlist(form){//添加用户
            if(form.user_phone){
                if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(form.user_phone)){
                    this.$message({
                        type: 'error',
                        message: '请输入正确的手机号！'
                    });
                    return
                }
            }
            axios.post('http://localhost:3000/admin/adduser',form).then(res => {
             if(res.data.success_code === 200){
                this.$message({
                    type: 'success',
                    message: res.data.message
                });
                this.clearForm()//清空表单
             }else{
                 this.$message({
                    type: 'error',
                    message: res.data.message
                });
                // console.log(this.$refs);
             }
            })
            // console.log(form)
        },
    }
}
</script>

<style lang="stylus">

    .addUserbox
        background #fff
        .adduserheader
            font-size 18px
            line-height 50px
            color #606266
            text-align center
            padding 0 150px
        .adduser
            width 70%
            margin auto
            box-sizing border-box
            padding  20% 10%
            padding-top 0
            .dialog-right
                display flex
                justify-content flex-end 
</style>