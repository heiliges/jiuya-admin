<template>
    <div class="orderList">
       <el-table
        :data="orderList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        >
        <el-table-column
          prop="order_id"
          label="订单编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goods_id"
          label="商品编号"
          width="120">
        </el-table-column>
        <el-table-column
          label="商品图片"
          width="150">
          <template slot-scope="scope">
            <img :src="scope.row.thumb_url" width="100" height="100" >
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user_address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="120">
          <template slot-scope="scope">
                 {{Number(scope.row.price /100).toFixed(2)}}
               </template>
        </el-table-column>
        <el-table-column
          prop="buy_count"
          label="数量"
          width="120">
        </el-table-column>
        <el-table-column label="订单状态" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)" v-if="scope.row.state==0" type="primary" plain>订单可发货</el-button>
            <el-tag type="success" v-else-if="scope.row.state==2">订单已完成</el-tag>
            <el-tag type="info" v-else>等待确认收货</el-tag>
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
            :total="orderList.length">
          </el-pagination>  
        </div></el-col>
      </el-row> 
    </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios'
import {getOrderList,updateState} from './../api/index'
export default {
    name:'OrderList',
    data() {
        return {
          currentPage:1, //初始页
          pagesize:6, //每页的数据
          orderList: [],
        }
    },
    created(){
        this.getOrderLists();
    },
    methods:{
        async getOrderLists(){//获取订单列表
            const result = await getOrderList();
            if(result.success_code === 200){
                this.orderList=result.message;
            }else{
                console.log(result.message);   
            }
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            // console.log(this.currentPage)  //点击第几页
        },
        handleUpdate(index,row) {
            this.$confirm('是否发货?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
            const result = await updateState({order_id:row.order_id,state:1});
            if(result.success_code === 200){
                this.$message({
                    type: 'success',
                    message: result.message
                });
                this.getOrderLists();
            }else{
                // console.log(result.message);   
            }  
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消发货'
            });          
            });
        },    
    }
}
</script>

<style lang="stylus">
    .orderList
        width 100%
    .pagin-bottom
        position fixed
        bottom 1px
        left 35%
</style>