<template>
	<view class="page-fill">
		
		<!-- 没有数据的展示start-->
		<nodata v-if="tcinfolist.length==0"></nodata>
		<!-- 没有数据的展示end-->
		<!-- 列表详情 start-->
		<list-content @disdetail="gotodetail" @btnclick="handlereport" :tcinfolist="tcinfolist" :btnarry="btnarry" :disall="false"></list-content>
		<!-- 列表详情 end-->
		
		<!-- 举报原因罗列  start-->
		<uni-popup type="center" ref="jubaopop" :custom="true" :mask-click="false">
			 <view  class="reportwrap">
				<scroll-view scroll-y="true" class="scroll-Y"  >
						<block v-for="(r,rindex) in rptarry" :key="rindex"> 
							<view class="body-text">
								<view class="inline-view">举报时间:</view> {{r.reporttime}}
							</view>
							<view class="body-text">
								<view class="inline-view">举报原因:</view> {{r.reason}}
							</view>
							<view class="body-text">
								<view class="inline-view">举报说明:</view> {{r.content}} 
							</view>
						 </block>
						<view> <button type="primary" @tap="closepop" class="rptbtn">确定</button> </view>
				</scroll-view>
				 
			 </view>
		</uni-popup>
		<!-- 举报原因罗列  end -->
		
	</view>
</template>

<script>
	import listContent from '@/components/list-content/list-content.vue';
	import nodata from '@/components/nodata/nodata.vue';	
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components:{
			listContent,
			nodata,
			uniPopup,
		},
		data() {
			return {
				userobj:{},
				page:1,
				pagesize:15,
				totalpages:0,
				rptarry:[],
				btnarry:['查看原因',"举报确认",'举报无效'],
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
			handlereport(e){
				var me = this;
				if(e.btntext == '举报无效'){
					me.cancelreport(e.msgid);
				}else if(e.btntext == '举报确认'){
					me.confirmreport(e.msgid);
				}else{
					me.viewreason(e.msgid);
					return;
				}
				 
				var arryindex = e.arryindex;
				me.tcinfolist.splice(arryindex,1);//数组异步更新
				
			},
			//确认举报
			confirmreport(msgid){
				var me = this;
				me.webhttp({
					url:me.websiteUrl + 'confirmreport',
					method:'GET',
					data:{
						msgid
					}
				}).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title: "操作成功",
							icon:'none',
							mask:true
						});
					
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
			},
			//取消举报
			cancelreport(msgid){
				var me = this;
				me.webhttp({
						url:me.websiteUrl + 'cancelreport',
						method:'GET',
						data:{
							msgid
						}
					}).then(res=>{
						if(res.code == 200){
							uni.showToast({
								title: "操作成功",
								icon:'none',
								mask:true
							});
						
						}else{
							uni.showToast({
								title: res.msg,
								icon:'none',
								mask:true
							});
						}	
					});
				
			},
			
			
			//查看举报的原因
			viewreason(msgid){
				var me  = this;
				
				me.webhttp({
					url:me.websiteUrl + 'getreportinfolist',
					method:'GET',
					data:{
						msgid
					}
				}).then(res=>{
					if(res.code == 200){
					    me.rptarry = res.rptlist;
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
							mask:true
						});
					}	
				});
				
				
				me.$refs.jubaopop.open();
				
			},
			//关闭弹出层
			closepop(){
				var me  = this;
				me.$refs.jubaopop.close();	
			},
			getshoucanglist(page,pagesize){
				
				var me  = this;
				me.webhttp({
					url:me.websiteUrl + "getsimpletcinfolist",
					method:'POST',
					data:{
						page:page,
						pagesize:pagesize,
						qtype:'jubao',
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
@import url("report.css");
</style>
