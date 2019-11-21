import Vue from 'vue'
import App from './App'
import Http from './common/http.js'
 
Vue.config.productionTip = false

 
// 图标组件
import faicon from '@/components/fa-icon/fa-icon.vue'
Vue.component('fa-icon',faicon)

//全局访问的url
//Vue.prototype.websiteUrl = 'http://localhost:8089/ycxq/m/tc/';  
Vue.prototype.websiteUrl = 'https://yohaoyun.com/ycxq/m/tc/';  
//封装的promise方法
Vue.prototype.webhttp = Http

Vue.prototype.getGlobalTCUser = function(key) {
	var userInfo = uni.getStorageSync("tcuser");
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
