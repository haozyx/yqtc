<template>
	<view class="page-fill">
		
		<!-- 没有数据的展示start-->
		<nodata v-if="tcinfolist.length==0"></nodata>
		<!-- 没有数据的展示end-->
		<!-- 列表详情 start-->
		<list-content @disdetail="gotodetail" @btnclick="quxiaoshoucang" :tcinfolist="tcinfolist" :btnarry="btnarry" :disall="false"></list-content>
		<!-- 列表详情 end-->
	</view>
</template>

<script>
	import listContent from '@/components/list-content/list-content.vue';
	import nodata from '@/components/nodata/nodata.vue';	
	export default {
		components:{
			listContent,
			nodata,
		},
		data() {
			return {
				userobj:{},
				page:1,
				pagesize:15,
				totalpages:0,
				btnarry:["取消收藏"],
				tcinfolist:[],
			}
		},
		onLoad() {
			var me = this;
			var user = me.getGlobalTCUser();
			if(user){
				me.userobj = user;
				me.getshoucanglist(me.page,me.pagesize);
			}
		},
		methods: {
			quxiaoshoucang(e){
				var me = this;
				console.log(e);
				var arryindex = e.arryindex;
				//只有一个取消收藏的按钮,所以直接取笑收藏即可 canclemelikeinfo
				me.webhttp({
					url:me.websiteUrl + 'canclemelikeinfo',
					method:'POST',
					data:{
						msgid:e.msgid,
						userid:me.userobj.id	
					}
				}).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title: "取消收藏成功",
							icon:'none',
							mask:true
						});
						me.tcinfolist.splice(arryindex,1);//数组异步更新
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
				
			},
			
			getshoucanglist(page,pagesize){
				
				var me  = this;
				me.webhttp({
					url:me.websiteUrl + "getsimpletcinfolist",
					method:'POST',
					data:{
						page:page,
						pagesize:pagesize,
						qtype:'shoucang',
						userid:me.userobj.id
					},
					showloading:true
				}).then(res=>{
					console.log(res);
					if(res.code == 200){
						me.totalpages = res.totalpages;
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
@import url("shoucang.css");
</style>
