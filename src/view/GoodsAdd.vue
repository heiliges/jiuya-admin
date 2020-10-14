<template>
    <div class="addgoodsbox">
        <div class="addgoodsheader">添加商品</div>
        <div class="addgoods">
            <el-form :model="form" ref="form">
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
            <div slot="footer" class="dialog-right">
                <el-button @click="()=>{$refs.upload.clearFiles();clearForm();}">清 空</el-button>
                <el-button type="primary" @click="addgoodslist(form)">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'GoodsAdd',
    data() {
        return {
          formLabelWidth: '120px',
          form:{
              goods_name:'',
              short_name:'',
              price:'',
              thumb_url:''
          },
        }
      },
    methods:{
        clearForm(){
            this.form = {
                        goods_name:'',
                        short_name:'',
                        price:'',
                        thumb_url:''
                    };
        },
        upload() { //图片上传
                const formData = new FormData();
                const file = this.$refs.upload.uploadFiles[0];
                const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }};
                // console.log(formData);     
                if (!file) { // 若未选择文件
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
        addgoodslist(form){//添加商品
            axios.post('http://localhost:3000/admin/addgoods',form).then(res => {
             if(res.data.success_code === 200){
                this.$message({
                    type: 'success',
                    message: res.data.message
                });
                this.$refs.form.resetFields()//清空表单
             }else{
                 this.$message({
                    type: 'error',
                    message: res.data.message
                });
                // console.log(this.$refs);
             }
            });
            // console.log(form)
        },
    }
    
}
</script>

<style lang="stylus">
    .addgoodsbox
        background #fff
        .addgoodsheader
            font-size 18px
            line-height 50px
            color #606266
            text-align center
            padding 0 150px
        .addgoods
            width 70%
            margin auto
            box-sizing border-box
            padding  20% 10%
            padding-top 0
            .dialog-right
                display flex
                justify-content flex-end   
              
</style>