// 1. 引入对应模块
import Vue from 'vue'
import VueRouter  from 'vue-router'
//一级路由
// import Home from './../pages/Home/Home'
// import Recommend from './../pages/Recommend/Recommend'
// import Search from './../pages/Search/Search'
// import Chat from './../pages/Chat/Chat'
// import Me from './../pages/Me/Me'
// import Login from './../components/Login/Login'
//路由懒加载
// const Home = ()=>import('./../pages/Home/Home');
// const Recommend = ()=>import('./../pages/Recommend/Recommend');
// const Search = ()=>import('./../pages/Search/Search');
// const Chat = ()=>import('./../pages/Chat/Chat');
// const Me = ()=>import('./../pages/Me/Me');
const Login = ()=>import('./../components/Login/Login');
const Admin = ()=>import('./../view/Admin.vue');
const GoodsList = ()=>import('./../view/GoodsList.vue');
const GoodsAdd = ()=>import('./../view/GoodsAdd.vue');
const UserList = ()=>import('./../view/UserList.vue');
const UserAdd = ()=>import('./../view/UserAdd.vue');
const AdminHome = ()=>import('./../view/Children/AdminHome');
const OrderList = ()=>import('./../view/OrderList');
// 2. 声明使用
Vue.use(VueRouter);

// 3. 输出路由对象
export default  new VueRouter({
    routes: [
      {
        path: '/',
        redirect: '/admin'
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/admin',
        component: Admin,
        children:[
          {path:'/goodslist',component:GoodsList},
          {path:'/goodsadd',component:GoodsAdd},
          {path:'/userlist',component:UserList},
          {path:'/useradd',component:UserAdd},
          {path:'/adminhome',component:AdminHome},
          {path:'/orderlist',component:OrderList},
          {path: '/admin',redirect: '/AdminHome'}
        ]
      }
    ]
});
