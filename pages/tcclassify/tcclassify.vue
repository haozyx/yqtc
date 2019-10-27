<template>
	<view class="page">
		<!-- 搜索框 start-->
					<view class="searchwrap bcolor">
						<view class="bodysearch">
							<view style="width: 15%;height: 30px; border-right: #007AFF 1px solid;"> <image src="../../static/img/index/search.png" class="searchimg"></image></view>
							<view style="width: 60%;"><input class="searchtext" type="text" maxlength="20" placeholder="在当前分类下进行搜索" placeholder-style="searchhint"/></view> 
							<view style="width: 15%;"><view class="searchbtn"> 搜索 </view></view>
						</view>
					</view>
		<!-- 搜索框 end-->
		
		<!-- 二级分类的导航栏 start-->
		 <view class="infowrap">
			 <view class="infoitem">垣曲县</view>
			 <view class="infoitem">
				 二手物品
			 </view>
			 <view class="infoitem">
				 <view class="itemtext" @tap="showfenleiPicker">{{paixu}}</view>
				 <image class="daosanjiao" src="../../static/img/index/daosj.png"></image>
			 </view>
		 </view>
		 <view >
			 <!-- 分类的-->
			 <mpvue-picker ref="mpvuePicker"
			 :mode="mode" 
			 :pickerValueDefault="[0]" 
			 @onChange="onChange" 
			 @onConfirm="onConfirm" 
			 @onCancel="onCancel" 
			 :pickerValueArray="fenleiarry"></mpvue-picker>
			 
		 </view>
		<!-- 二级分类的导航栏 end-->
		<!-- 该分类下的列表 start  -->
		<list-content @disdetail="gotodetail"></list-content>
		<list-content></list-content>
		<list-content></list-content>
		<list-content></list-content>
		<list-content></list-content>
		<!-- 该分类下的列表 end  -->
	</view>
</template>

<script>
	import mpvuePicker from 'mpvue-picker';
	import listContent from '../../components/list-content/list-content.vue';
	export default {
		components:{
			mpvuePicker,
			listContent,
		},
		data() {
			return {
				mode:'selector',
				paixu:'全部分类',
				fenleiarry: [
					{label:'全部分类',value:'0'},
					{label:'电脑办公',value:'1'},
					{label:'手机',value:'2'},
					{label:'服装配饰',value:'3'},
					{label:'美容保健',value:'4'},
					{label:'家居日常',value:'5'},
					{label:'家具家电',value:'6'},
					{label:'文体户外',value:'7'},
					{label:'儿童母婴',value:'8'},
					{label:'数码产品',value:'9'},
					{label:'交通工具',value:'10'},
					{label:'其他',value:'11'}],
			}
		},
		methods: {
			/* 打开分类选择框 */
			showfenleiPicker() {
				  this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
				this.fenlei = e.label;
			},
			onChange(e) {
				  console.log(e);
			},
			onCancel(e) {
				 console.log(e);
			},
			/* 打开分类选择框  end*/
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
@import url("tcclassify.css");
</style>
