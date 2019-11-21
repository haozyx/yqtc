<template>
	<view>
		<view class="title">添加电话信息</view>
		<view class="textwrap">
			<view class="text">分类</view>
			<view class="jilian" :class="cur==0?'':'changcolor'" @tap="showpicker">{{fenlei}}</view>
			
		</view>
		<view class="textwrap">
			<view class="text">名称</view>
			<input type="text" maxlength="20" v-model="name" class="inputext" placeholder="请输入店铺或者单位名称" placeholder-class="textstyle" />
		</view>
		<view class="textwrap">
			<view class="text">电话</view>
			<input type="text" maxlength="22" v-model="phone" class="inputext" placeholder="请输入电话,多个用'|'隔开" placeholder-class="textstyle" />
		</view>
		<view class="textwrap">
			<view class="text">地址</view>
			<input type="text" maxlength="20" v-model="address" class="inputext" placeholder="请输入地址..." placeholder-class="textstyle" />
		</view>
		<view class="hint-text">
			*请您务必填写真实准确的信息，方便你我他，共同建设美好垣曲。
		</view>
		<view class="bottom">
			<button class="button" @tap="savephonebook">提交申请</button>
		</view>
		
		<!-- 分类弹出框 -->
		<view>
			<mpvue-picker
				ref="mpvuePicker"
				:mode="mode"
				:deepLength="deepLength"
				:pickerValueDefault="defaultarry"
				@onConfirm="onConfirm"
				:pickerValueArray="pickerValueArray" ></mpvue-picker>
		</view>
	</view>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
export default {
	components: {
		mpvuePicker
	},
	data() {
		return {
			mode:'multiLinkageSelector',
			deepLength:2,
			fenlei:'请选择分类',
			cur:0,
			parentId:0,
			name:'',
			address:'',
			phone:'',
			eid:'',//二级分类ID
			defaultarry:[0,0], // 默认选中的值
			pickerValueArray: []
		};
	},
	onLoad(e) {
		var me = this;
		me.eid = e.eid;
		me.loadclassify();
	},
	methods: {
		savephonebook(){
			var me = this;
			var pb ={};
			pb.parentId = me.parentId;
			pb.name = me.name;
			pb.levelNum = 3;
			pb.address = me.address;
			pb.phone = me.phone;
			pb.status = 1; // 改为0 则需要审核
			//console.log(pb);
			
			if(me.parentId==0){
				uni.showToast({
					mask:true,
					icon:'none',
					title:"请选择分类"
				});
				return ;
			}
			if(me.name == '' || me.name.length == 0){
				uni.showToast({
					mask:true,
					icon:"none",
					title:"请输入名称"
				});
				return ;
			}
			if(me.phone == '' || me.phone.length == 0){
				uni.showToast({
					mask:true,
					icon:"none",
					title:"请输入电话"
				});
				return ;
			}
			if(me.address == '' || me.address.length == 0){
				uni.showToast({
					mask:true,
					icon:"none",
					title:"请输入地址"
				});
				return ;
			}
			
			uni.request({
				url:me.websiteUrl  +  'savephonebookinfo',
				method: 'POST',
				data: pb,
				success: res => {
					if(res.data.code==200){
						uni.showToast({
							mask:true,
							title:"添加成功,感谢您的反馈"
						});
						setTimeout(function() {
							uni.redirectTo({
								url: '../index/index'
							});
						}, 3000);
					}
				},
				fail: () => {},
				complete: () => {}
			});
			
		},
		loadclassify(){
			var me = this;
			uni.request({
				url:me.websiteUrl + 'getallclassify',
				method: 'GET',
				success: res => {
					 
					if(res.data.code==200){
						me.pickerValueArray = res.data.list;
					}
					me.setdefaultarry();
				},
				fail: () => {},
				complete: () => {}
			});
		},
		showpicker(){
			 this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
		 // console.log(e);
		  this.fenlei = e.label;
		  this.cur=1;
		  this.parentId = e.value[1];
		},
		setdefaultarry(){
			var me = this;
			if(me.eid==''||me.eid==undefined) return;
			var a =0;
			for(let i=0;i<me.pickerValueArray.length;i++){
				if(me.eid==me.pickerValueArray[i].id){
					a=i;
					break;
				}
			}
			me.defaultarry=[a,0];
		}

	}
};
</script>

<style>
@import url('add.css');
</style>
