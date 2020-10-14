import Vue from 'vue';
import App from './App';
import store from './store';
// 引入路由器
import router from './router/index';
// 引入字体图标文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/style.css'

Vue.use(ElementUI);
new Vue({
  el:'#app',
  router,
  store,
  render: h=>h(App)
});
