<template>
	<view class="page-fill">
		<tab-control :tabarry="tabarry" @send="getflvalue"></tab-control>
		<view style="grayspace"></view> 
		<!-- 列表详情 start-->
		<my-list-content  :tcinfolist="tcinfolist" :disall="true"></my-list-content>
		<!-- 列表详情 end-->
		
		<!-- 没有数据的展示start-->
		<nodata v-if="tcinfolist.length==0"></nodata>
		<!-- 没有数据的展示end-->
		
		
	</view>
</template>

<script>
	/* 使用定义的子组件 */
	import tabControl from "@/components/tab-control/tab-control.vue";
	import myListContent from '@/components/my-list-content/my-list-content.vue';
	import nodata from '@/components/nodata/nodata.vue';
			
	export default {
		components:{
			tabControl,
			myListContent,
			nodata,
		},
		data() {
			return {
				page:1,
				pagesize:15,
				totalpages:0,
				userobj:{},
				status:1,
				tcinfolist:[],
				tabarry:['全部','展示中','未支付','已下架']
			}
		},
		onLoad() {
			var me = this;
			var user = me.getGlobalTCUser();
			if(user){
				me.userobj = user; 
				me.gettcinfolist(me.page,me.pagesize,me.status);
			}
		},
		onReachBottom() {
			var me = this;
			if(me.page>me.totalpages) return;
			
			me.gettcinfolist(me.page,me.pagesize,me.status);
		},
		methods: {
			getflvalue(e){
			 
				var me =this;
				if(e==2 ){
				me.status =3;	
				}else  if(e==3 ){
					me.status =0;
				}else{
					me.status=1;
				}
				me.page =1;
				me.tcinfolist=[]; 
				me.gettcinfolist(me.page,me.pagesize,me.status);
			},
			/* 获取列表信息 */
			gettcinfolist(page,pagesize,status){
				
				var me  = this;
				me.webhttp({
					url:me.websiteUrl + "getminecinfolist",
					method:'POST',
					data:{
						page:page,
						status:status,
						userid:me.userobj.id,
						pagesize:pagesize
					},
					showloading:true
				}).then(res=>{
				 
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
@import url("minetcinfo.css");
</style>
