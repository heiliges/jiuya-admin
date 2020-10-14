import ajax from './ajax'

// 1. 基础路径
const BASE_URL = '/admin';
// const BASE_URL = 'http://localhost:3000';

// 2. 请求方法

// 2.1 请求首页的轮播图
export const getHomeCasual = ()=>ajax(BASE_URL + '/admin/homecasual');

//请求商品列表数据
export const getRecommendShopList = (params)=>ajax(BASE_URL + '/admin/recommendshoplist');
//删除单个商品
export const deleteGoods = (goods_id)=>ajax(BASE_URL+'/admin/deletegoods',{goods_id},'POST');
//用户名和密码登录
export const pwdLogin = (name, pwd)=>ajax(BASE_URL + '/admin/login', {name, pwd}, 'POST');

//获取登录的用户信息
export const getUserInfo = ()=>ajax(BASE_URL + '/admin/user_info');
//获取商品列表页码
export const getGoodsListPage = ()=>ajax(BASE_URL + '/admin/goodslistpage');
//退出登录
export const getLogOut = ()=>ajax(BASE_URL + '/admin/logout');
//修改用户信息
export const changeUserInfo = (user_id, user_name, user_sex, user_address, user_birthday, user_sign) => ajax(BASE_URL + '/admin/change_user_msg', {
    user_id,
    user_name,
    user_sex,
    user_address,
    user_birthday,
    user_sign
  }, 'POST');
//获取用户列表
export const getUserList = ()=>ajax(BASE_URL + '/admin/userlist')  
//删除单个用户
export const deleteUser = (id)=>ajax(BASE_URL+'/admin/deleteuser',{id},'POST');
//获取订单列表
export const getOrderList = ()=>ajax(BASE_URL+'/admin/getorderlist');
//修改订单状态
export const updateState = (params)=>ajax(BASE_URL+'/admin/updatestate',params,'POST');