import {
  getHomeCasual,
  getRecommendShopList,
  getUserInfo,
  getLogOut
} from '../api'

import {
  HOME_CASUAL,
  RECOMMEND_SHOP_LIST,
  USER_INFO,
  RESET_USER_INFO,
} from './mutation-types'

export default {
  async reqHomeCasual({commit}) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, {homecasual: result.message})
  },
  async reqRecommendShopList({commit}) {
    const result = await getRecommendShopList();
    if(result.success_code === 200){
      commit(RECOMMEND_SHOP_LIST, {recommendshoplist: result.message});
    }
  },
  // 同步用户的信息
  syncUserInfo({commit}, userInfo) {
    commit(USER_INFO, {userInfo});
  },
  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await getUserInfo();
    // console.log(result);
    if (result.success_code === 200) {
      commit(USER_INFO, {userInfo: result.message});
    }
  },

  // 8. 退出登录
  async logout({commit}) {
    console.log(111);
    const result = await getLogOut();
    console.log(result);
    if (result.success_code === 200) {
      commit(RESET_USER_INFO);
    }
  },
 
}
