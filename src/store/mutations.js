import {
  HOME_CASUAL,
  RECOMMEND_SHOP_LIST,
  USER_INFO,
  RESET_USER_INFO,
} from './mutation-types'
// import Vue from 'vue';

export default {
  [HOME_CASUAL](state, {homecasual}) {
    state.homecasual = homecasual;
  },
  [RECOMMEND_SHOP_LIST](state, {recommendshoplist}) {
    state.recommendshoplist = state.recommendshoplist.concat(recommendshoplist);
  },
  [USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo;
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {};
  }
}
