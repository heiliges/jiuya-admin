<template>
    <div class="litsGoods">
      <el-table
        :data="goodsList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%">
        <el-table-column
          prop="goods_id"
          label="商品ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="short_name"
          label="副标题">
        </el-table-column>
        <el-table-column
          label="图片地址">
          <template slot-scope="scope">
            <img :src="scope.row.thumb_url" width="100" height="100" >
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
          <img src="" alt="">
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
        <el-col :span="8" ><div class="grid-content ">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            :page-size="pagesize"   
            :total="goodsList.length">
          </el-pagination>  
        </div></el-col>
      </el-row>
      <el-dialog title="商品编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品标题" :label-width="formLabelWidth">
            <el-input v-model="form.goods_name" autocomplete="off" placeholder="必填！请输入商品标题"></el-input>
          </el-form-item>
          <el-form-item label="副标题" :label-width="formLabelWidth">
            <el-input v-model="form.short_name" autocomplete="off" placeholder="必填！请输入副标题"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off" placeholder="必填！请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="form.thumb_url" autocomplete="off" placeholder="必填！请上传图片"></el-input>
          <el-upload style="height:100px" class="upload-demo" action="" :auto-upload="false" :limit="1" ref="upload" :http-request="upload" multiple>
              <el-button size="small" type="primary" >上传图片</el-button>
          </el-upload>
            <el-button type="primary" @click="upload" size="small">确定上传</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="()=>{dialogFormVisible = false;getgoodslist();$refs.upload.clearFiles()}">取 消</el-button>
          <el-button type="primary" @click="updategoodslist(form)">确 定</el-button>
        </div>
      </el-dialog>   
    </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios'
import {getRecommendShopList,deleteGoods} from './../api/index'
export default {
    name:'GoodsList',
    data() {
        return {
          currentPage:1, //初始页
          pagesize:6, //每页的数据
          goodsList: [],
          dialogFormVisible: false,
          formLabelWidth: '120px',
          form:{}
        }
    },
    created(){
      this.getgoodslist();
    },
    computed: {
      ...mapState(['recommendshoplist'])
    },
    methods: {
      handleEdit(index, row) { //编辑
        this.dialogFormVisible = true;
        this.form=row;
      },
      handleDelete(index, row) {//删除
        this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await deleteGoods(row.goods_id);
          if(result.success_code === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getgoodslist();
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
        console.log(this.currentPage)  //点击第几页
      },
      async getgoodslist(){//获取商品列表
        const result = await getRecommendShopList();
          if(result.success_code === 200){
              this.goodsList=result.message;
          }else{
              console.log(result.message);   
          }
      },
      async goodsDelete(goods_id){//删除商品
        const result = await deleteGoods(goods_id);
          if(result.success_code === 200){
              this.goodsList=result.message;
          }else{
              console.log(result.message);   
          }
      },
      upload() { //图片上传
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }};
        // console.log(formData);     
        if (!file) { // 若未选择文件
         // 若未选择文件
            this.$message({
                type: 'error',
                message: '请选择上传图片'
            });
          return
        }
        
        formData.append('file', file.raw)
        axios.post('http://localhost:3000/admin/api/upload', formData, headerConfig).then(res => {
          // console.log(res)
          this.form.thumb_url = res.data;
        })
      },
      updategoodslist(form){//更新商品信息
        axios.post('http://localhost:3000/admin/updategoodslist',form).then(res => {
          //  console.log(res)
          if(res.data.success_code === 200){
                this.$message({
                    type: 'success',
                    message: res.data.message
                });
                this.getgoodslist();
                this.$refs.upload.clearFiles();
                this.dialogFormVisible = false;//清空表单
             }else{
                 this.$message({
                    type: 'error',
                    message: res.data.message
                });
             }
        })
        // console.log(form)
      }

    }
  
}
</script>

<style lang="stylus">
    .listGoods
        width 100%
    .pagin-bottom
        position fixed
        bottom 1px
        left 35%
</style>