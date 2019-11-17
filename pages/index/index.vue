<template>
	<view class="page-fill">
		 <!-- 搜索框 start-->
			<view class="searchwrap bcolor">
				<view class="bodysearch">
					<view style="width: 15%;height: 30px; border-right: #007AFF 1px solid;"> <image src="../../static/img/index/search.png" class="searchimg"></image></view>
					<view style="width: 60%;"><input class="searchtext" v-model="searchword" type="text" maxlength="20" placeholder="找工作 | 租房子 | 看同城" placeholder-style="searchhint"/></view> 
					<view style="width: 15%;"><view class="searchbtn" @tap="gotosearch"> 搜索 </view></view>
				</view>
				<view class="bottomview">
					本站浏览1205.34万  发布总量:5600
				</view>
			</view>
		 <!-- 搜索框 end-->
		 
		 <!-- 带图分类导航 start-->
		 <view class="classify">
			 <block v-for="(clz,index) in classifyarry" :key="index">
				 <view class="clzwraper" @tap="gotoclassify(clz.id)" >
					<image :src="clz.icon" class="clzimg"></image>
					<view class="clztext">{{clz.name}}</view>
				 </view>
			  </block>
		 </view>
		 <!-- 带图分类导航end-->
		 
		 <!-- 分类的导航栏 start-->
		 <view class="infowrap">
			 <view class="infoitem">垣曲县</view>
			 <view class="infoitem">
				 <view class="itemtext" @tap="showfenleiPicker">{{fenlei}}</view>
				 <image class="daosanjiao" src="../../static/img/index/daosj.png"></image>
			 </view>
			 <view class="infoitem">
				 <view class="itemtext" @tap="showpaixuPicker">{{paixu}}</view>
				 <image class="daosanjiao" src="../../static/img/index/daosj.png"></image>
			 </view>
		 </view>

		 <!-- 轮播广告位  目前不加-->
		 
		 <!-- 没有数据的展示start-->
		 <nodata v-if="tcinfolist.length==0"></nodata>
		 <!-- 没有数据的展示end-->
		 
		 <!-- 列表详情 start-->
		 <list-content @disdetail="gotodetail" :tcinfolist="tcinfolist" :disall="false"></list-content>
		 <!-- 列表详情 end-->
		 
		 <!-- 防止顶到最下方start -->
		 <view class="whitespace"></view>
		 <!-- 防止顶到最下方end -->
		 
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
		 	 @onChange="onChange" 
		 	 @onConfirm="onConfirm" 
		 	 @onCancel="onCancel" 
		 	 :pickerValueArray="fenleiarry"></mpvue-picker>
		 	 <mpvue-picker ref="paixuPicker"
		 	 :mode="mode" 
		 	 :pickerValueDefault="[0]" 
		 	 @onConfirm="onConfirmpaixu" 
		 	 :pickerValueArray="paixuarry"></mpvue-picker>
		  </view>
		 <!-- 分类的导航栏 end-->
	</view>
</template>

<script>
	import mpvuePicker from 'mpvue-picker';
	import listContent from '../../components/list-content/list-content.vue';
	import nodata from '@/components/nodata/nodata.vue';
	
	export default {
		data() {
			return {
				title: 'Hello',
				backtoTop:500,
				showBackTop: false,
				mode:'selector',
				page:1,
				pagesize:15,
				totalpage:1,
				qmap:{},
				fenlei:'全部分类',
				paixu:'默认排序',
				searchword:'',
				tcinfolist:[],
				fenleiarry: [{ label: '全部分类', value: '0' },{ label: '顺风车', value: '1' }, { label: '招聘求职', value: '2' },
							{ label: '本地服务', value: '3' },{ label: '房屋租售', value: '4' },
							{ label: '生意转让', value: '5' },{ label: '汽车交易', value: '6' },
							{ label: '二手交易', value: '7' }
							],
				paixuarry: [
							{ label: '默认排序', value: '0' },
							{ label: '最新', value: '1' }, 
							{ label: '有图', value: '2' },
							{ label: '浏览量', value: '3' }],
				classifyarry:[
					{'name':'顺风车','img':'../../static/img/index/shunfengche.png'},
					{'name':'招聘求职','img':'../../static/img/index/zhaopin.png'},
					{'name':'本地服务','img':'../../static/img/index/bendi.png'},
					{'name':'房屋租售','img':'../../static/img/index/fangzi.png'},
					{'name':'生意转让','img':'../../static/img/index/shengyi.png'},
					{'name':'汽车交易','img':'../../static/img/index/qichejiaoyi.png'},
					{'name':'二手交易','img':'../../static/img/index/ershou.png'}],
			}
		},
		components:{
			mpvuePicker,
			listContent,
			nodata,
		},
		onPageScroll(e) {
			var me = this;
			var scrollTop = e.scrollTop;
			me.showBackTop = me.backtoTop < scrollTop;
		},
		onLoad(e) {
			var me = this;
			/* 上线时候再管着个 */
			/* var code= e.code;
			me.webhttp({
				url:me.websiteUrl + 'getwxtoken',
				method:'GET',
				data:{
					code	
				}
			}).then(res=>{
				if(res.code == 200){
					console.log(res);
				}else{
					uni.showToast({
						title: res.msg,
						icon:'none',
						mask:true
					});
				}	
			}); */
			
			me.gettwocategory();
			me.buildqmapAndQuery(me.page);
			 
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
			showpaixuPicker() {
				  this.$refs.paixuPicker.show();
			},
			onConfirm(e) {
				var me = this;
				me.fenlei = e.label;
				me.tcinfolist = [];
				me.page =1;
				me.buildqmapAndQuery(me.page);
			},
			onConfirmpaixu(e) {
				var me = this;
				this.paixu = e.label;
				me.tcinfolist = [];
				me.page =1;
				me.buildqmapAndQuery(me.page);
			},
			/* 进行搜索 */	
			gotosearch(){
				var me = this;
				me.tcinfolist = [];
				me.page =1;
				me.buildqmapAndQuery(me.page);
			},
			onChange(e) {
				//  console.log(e);
			},
			onCancel(e) {
				 console.log(e);
			},
			//返回到页面顶部
			goTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				}); 
			},
			/* 打开分类选择框  end*/
			gotodetail(e){
				var msgid = e.msgid;
				uni.navigateTo({
					url:'../detail/detail?msgid='+msgid
				});
			},
			/* 构造查询的对象 */
			buildqmapAndQuery(page){
				var me=this;
				me.$set(me.qmap,'page',page);
				me.$set(me.qmap,'pagesize',me.pagesize);
				me.$set(me.qmap,'msgptypename',me.fenlei);
				me.$set(me.qmap,'orderkeyword',me.paixu);
				me.$set(me.qmap,'searchword',me.searchword);
				console.info(me.qmap);
				me.gettcinfolist(me.qmap);
			},
			/* 同城分类界面 */
			gotoclassify(id){
				uni.navigateTo({
					url:'../tcclassify/tcclassify?id='+id
				})
			},
			/* 获取分类信息 */
			gettwocategory(){
				var me = this;
				
				me.webhttp({
					url: me.websiteUrl + 'gettwocategory',
					method: 'GET',
					data: {},
				}).then(res=>{
					console.info(res);
					if(res.code == 200 ){
						me.classifyarry = res.list;
					}
				});
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
					console.log(res);
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
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
