<template>
    <div class="litsUser">
      <el-table
        :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        >
        <el-table-column
          prop="id"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user_pwd"
          label="用户密码">
        </el-table-column>
        <el-table-column
          prop="user_phone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="user_sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="user_address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="user_birthday"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="user_sign"
          label="爱好">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>       
        </el-table-column>
      </el-table>
      <el-row class="pagin-bottom">
        <el-col :span="8"><div class="grid-content ">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            :page-size="pagesize"   
            :total="userList.length">
          </el-pagination>  
        </div></el-col>
      </el-row>
      <el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="()=>{dialogFormVisible = false;getuserlist();}">取 消</el-button>
          <el-button type="primary" @click="updateuserlist(form)">确 定</el-button>
        </div>
      </el-dialog>   
    </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios'
import {getUserList,deleteUser} from './../api/index'
export default {
    name:'UserList',
    data() {
        return {
          currentPage:1, //初始页
          pagesize:6, //每页的数据
          userList: [],
          dialogFormVisible: false,
          formLabelWidth: '120px',
          form:{}
        }
    },
    created(){
      this.getuserlist();
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.form=row;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await deleteUser(row.id);
          if(result.success_code === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getuserlist();
          }else{
              console.log(result.message);   
          }  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        // console.log(this.currentPage)  //点击第几页
      },
      async getuserlist(){//获取用户列表
        const result = await getUserList();
          if(result.success_code === 200){
              this.userList=result.message;
          }else{
              console.log(result.message);   
          }
      },
      updateuserlist(form){//更新用户信息
        if(form.user_phone){
          if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(form.user_phone)){
              this.$message({
                  type: 'error',
                  message: '请输入正确的手机号！'
              });
              return
          }
        }
        axios.post('http://localhost:3000/admin/updateuserlist',form).then(res => {
          //  console.log(res)
          this.getuserlist();
          if(res.data.success_code === 200){
                this.$message({
                    type: 'success',
                    message: res.data.message
                });
                this.dialogFormVisible = false;
             }else{
                 this.$message({
                    type: 'error',
                    message: res.data.message
                });
                // console.log(this.$refs);
            }
          
        })
        // console.log(form)
      }
      
    }
  
}
</script>

<style lang="stylus">
    .listUser
        width 100%
    .pagin-bottom
        position fixed
        bottom 1px
        left 35%
</style>