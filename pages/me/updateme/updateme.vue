<template>
	<view>
		
		<view class="info-wapper">
			<label class="words-lbl">设置昵称</label>
			<input name="username" type="text"   class="input" placeholder="请输入用户名" placeholder-class="graywords" />
		</view>

		<view class="info-wapper" >
			<label class="words-lbl">绑定手机</label>
			<input name="password" type="text" value=""   class="input" placeholder="请输入密码"  placeholder-class="graywords" />
		</view>
		
		<view class="info-wapper" >
			<label class="words-lbl">绑定微信</label>
			<input name="password" type="text" value=""   class="input" placeholder="请输入密码"  placeholder-class="graywords" />
		</view>
		
		<view class="info-wapper" >
			<label class="words-lbl">真实姓名</label>
			<input name="password" type="text" value=""   class="input" placeholder="请输入密码"  placeholder-class="graywords" />
		</view>
		
		<view class="info-wapper" >
			<label class="words-lbl" >修改性别</label>
			<view class="sexrap">
				<radio-group  @change="sexChange">
					<label class="sexlabel"><radio style="transform:scale(0.7)" value="男" /> 男</label>
					<label class="sexlabel"><radio  style="transform:scale(0.7)" value="女" /> 女</label>
					<label class="sexlabel"><radio  style="transform:scale(0.7)" value="保密" /> 保密</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			sexChange(e){
				console.log(e);
			}
		}
	}
</script>

<style>
	@import url("updateme.css");
</style>
