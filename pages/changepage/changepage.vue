<template>
	<view class="page-fill">
		<!-- 搜索框 start-->
		<view class="searchwrap bcolor">
			<view class="bodysearch">
				<view style="width: 15%;height: 30px; border-right: #007AFF 1px solid;"> <image src="../../static/img/index/search.png" class="searchimg"></image></view>
				<view style="width: 60%;"><input class="searchtext" v-model="searchword" type="text" maxlength="20" placeholder="在当前分类下进行搜索" placeholder-style="searchhint"/></view> 
				<view style="width: 15%;"><view class="searchbtn" @tap="gotosearch"> 搜索 </view></view>
			</view>
		</view>
		<!-- 搜索框 end-->
		
		<!-- 二级分类的导航栏 start-->
		 <view class="infowrap">
			 <view class="infoitem">垣曲县</view>
			 <view class="infoitem">
				本地特色
			 </view>
			 <view class="infoitem">
				 <view class="itemtext" @tap="showfenleiPicker">{{msgtypename}}</view>
				 <image class="daosanjiao" src="../../static/img/index/daosj.png"></image>
			 </view>
		 </view>
		<!-- 二级分类的导航栏 end  -->
		 <!-- 没有数据的展示start-->
		 <nodata v-if="tcinfolist.length==0"></nodata>
		 <!-- 没有数据的展示end-->
		 
		 <!-- 列表详情 start-->
		 <list-content @disdetail="gotodetail" :tcinfolist="tcinfolist" :disall="false"></list-content>
		 <!-- 列表详情 end-->
		 
		 <!-- 返回到最顶部 start-->
		 <view class="back-top" v-if="showBackTop" @tap="goTop">
		 	<image src="../../static/img/top.png"></image>
		 </view>
		 <!-- 返回到最顶部 end-->
		 
		
		
			<view >
	 			 <!-- 分类的-->
	 			 <mpvue-picker ref="mpvuePicker"
	 			 :mode="mode" 
	 			 :pickerValueDefault="[0]" 
	 			 @onConfirm="onConfirm" 
	 			 :pickerValueArray="fenleiarry"></mpvue-picker>
	 			 
	 </view>
	</view>
</template>

<script>
	import mpvuePicker from 'mpvue-picker';
	import listContent from '../../components/list-content/list-content.vue';
	import nodata from '@/components/nodata/nodata.vue';
	export default {
		components:{
			mpvuePicker,
			listContent,
			nodata,
		},
		data() {
			return {
				mode:'selector',
				backtoTop:500,
				showBackTop: false,
				page:1,
				pagesize:15,
				totalpage:1,
				searchword:'',
				msgptypename:'',
				msgtypename:'全部分类',//二级分类
				qmap:{},
				tcinfolist:[],
				fenleiarry: [],//需要从后台获取
			}
		},
		onLoad() {
			var me = this;
			me.gettwocategory(7);
			me.getcategoryinfo(7);
		},
		onPageScroll(e) {
			var me = this;
			var scrollTop = e.scrollTop;
			me.showBackTop = me.backtoTop < scrollTop;
		},
		onReachBottom() {
			var me = this;
			console.log(me.page+"--------"+me.totalpage);
			if(me.page>me.totalpage) return ;
			me.buildqmapAndQuery(me.page);
		},
		methods: {
			/* 打开分类选择框 */
			showfenleiPicker() {
				  this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
		 
				var me = this;
				me.msgtypename = e.label;
				me.tcinfolist = [];
				me.page =1;
				me.buildqmapAndQuery(me.page);
			},
			/* 打开分类选择框  end*/
		    getcategoryinfo(id){
				var me = this;
				me.webhttp({
					url: me.websiteUrl + 'getcategoryinfo',
					method: 'GET',
					data: {id:id},
				}).then(res=>{
					if(res.code == 200 ){
						 me.msgptypename = res.cinfo.name;
						 me.buildqmapAndQuery(me.page);
					}
				});
			},
			/* 进行搜索 */	
			gotosearch(){
				var me = this;
				me.tcinfolist = [];
				me.page =1;
				me.buildqmapAndQuery(me.page);
			},
			//从后台获取二级分类
			gettwocategory(pid){
				var me = this;
				me.webhttp({
					url: me.websiteUrl + 'getthreecategory',
					method: 'GET',
					data: {pid:pid},
				}).then(res=>{
					if(res.code == 200 ){
						res.list.forEach(r=>{
							let tc = {};
							tc.label = r.name;
							tc.value = r.id;
							me.fenleiarry.push(tc);
						});
						
						me.fenleiarry.splice(0,0,{label:'全部分类',value:'100'});
					}
				});
				
			},
			
			/* 构造查询的对象 */
			buildqmapAndQuery(page){
				var me=this;
				me.$set(me.qmap,'page',page);
				me.$set(me.qmap,'pagesize',me.pagesize);
				me.$set(me.qmap,'msgtypename',me.msgtypename); //本机分类名称 
				me.$set(me.qmap,'msgptypename',me.msgptypename); //父分类名称 
				me.$set(me.qmap,'searchword',me.searchword);
			/* 	console.info(me.qmap); */
				me.gettcinfolist(me.qmap);
			},
			/* 获取同城信息 */
			gettcinfolist(qmap){
				var me  = this;
				me.webhttp({
					url:me.websiteUrl + "gettcinfoList",
					method:'POST',
					data:qmap,
					showloading:true
				}).then(res=>{
					if(res.code == 200){
						me.totalpage = res.totalpages;
						me.page = me.page+1;
						me.tcinfolist = me.tcinfolist.concat(res.tclist);
					}else{
						uni.showToast({
							title:res.msg,
							mask:true,
							icon:'none'
						});
					}
				});
			},
			//返回到页面顶部
			goTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				}); 
			},
			/* 前往详情页面 */
			gotodetail(){
				uni.navigateTo({
					url:'../detail/detail'
				})
			},
		}
	}
</script>


<style>
@import url("changepage.css");
</style>
