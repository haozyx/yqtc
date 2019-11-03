<template>
	<view>
		<uni-notice-bar :single="true" :show-icon="true" text="免责声明:本平台不对任何人提供任何形式担保." />
		<view class="line-wrap"><view class="line"></view></view>
		
		<block v-if="publishtype == 'shunfengcheng'">
		<view class="textwrap">
			<view class="leftwrap">
				<view class="lefttext">出发地 :</view>
				<input class="input" placeholder="请输入出发地" />
			</view>
			<view class="rightwrap"><fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon></view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>
		<view class="textwrap">
			<view class="leftwrap">
				<view class="lefttext">目的地 :</view>
				<input class="input" placeholder="请输入目的地" />
			</view>
			<view class="rightwrap"><fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon></view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>

		<!-- 天天拼没有乘车时间 -->
		<view class="textwrap">
			<view class="leftwrap"><view class="lefttext">乘车时间 :</view></view>
			<view class="rightwrap">
				<view class="righttext" @tap="showccsjPicker">{{ chengcheshijian }}</view>
				<fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon>
			</view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>

		<view class="textwrap">
			<view class="leftwrap"><view class="lefttext">乘车人数 :</view></view>
			<view class="rightwrap">
				<view class="righttext" @tap="showccPicker">{{ chengkerenshu }}</view>
				<fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon>
			</view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>

		<view class="textareawrap">
			<view class="top-text">内容填写 :</view>
			<textarea maxlength="500" class="textarea" placeholder-class="hintcolor" placeholder="请简要补充说明,例如上车时间/小区等,为保护隐私,请不要填写手机,QQ!"></textarea>
		</view>
		</block>
		<!-- 求职模块 -->
		<block v-if="publishtype == 'qiuzhi'">
			<view class="zhaopinwrap">
				<view class="leftwrap"><view class="lefttext">期望职位 :</view></view>
				<view class="rightwrap">
					<view class="tagview">
						<!-- 根据点进来不同的分类去找不同的标签 -->
						<view class="tagwrap" v-for="(zw, index) in zhiweiarry" :key="index">
							<uni-tag :inverted="choosezhiweiarry.indexOf(zw) == -1" :text="zw" 
							:data-tagname="zw" @tap="selzw" type="success" />
						</view>
					</view> 
				</view>
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			
			<view class="textwrap">
				<view class="leftwrap"><view class="lefttext">性别 :</view>
					<!-- 性别选择框 -->
					<view class="sexrap">
						<radio-group  @change="qiuzhisexChange">
							<label class="sexlabel"><radio style="transform:scale(0.7)" value="男" /> 男</label>
							<label class="sexlabel"><radio  style="transform:scale(0.7)" value="女" /> 女</label>
						</radio-group>
					</view>
				</view>
				 
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			
			<view class="textwrap">
				<view class="leftwrap"><view class="lefttext">工作经验 :</view></view>
				<view class="rightwrap">
					<view class="righttext" @tap="showgzjyPicker">{{ gongzuojingyan }}</view>
					<fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon>
				</view>
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			<view class="textwrap">
				<view class="leftwrap"><view class="lefttext">期望薪资 :</view></view>
				<view class="rightwrap">
					<view class="righttext" @tap="showqwxzPicker">{{ qiwangxinzi }}</view>
					<fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon>
				</view>
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			<view class="textareawrap">
				<view class="top-text">自我评价 :</view>
				<textarea maxlength="500" class="textarea" placeholder-class="hintcolor" placeholder="一句话介绍自己,让别人更了解你,为保护隐私,请不要填写手机,QQ!"></textarea>
			</view>
		</block>
 
		<!-- 招聘模块 -->
		<block v-if="publishtype == 'zhaopin'">
			<view class="zhaopinwrap">
				<view class="leftwrap"><view class="lefttext">招聘职位 :</view></view>
				<view class="rightwrap">
					<view class="tagview">
						<!-- 根据点进来不同的分类去找不同的标签 -->
						<view class="tagwrap" v-for="(zw, index) in zhiweiarry" :key="index">
							<uni-tag :inverted="choosezhiweiarry.indexOf(zw) == -1" :text="zw" 
							:data-tagname="zw" @tap="selzw" type="success" />
						</view>
					</view> 
				</view>
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			
			<view class="textwrap">
				<view class="leftwrap"><view class="lefttext">性别 :</view>
					<!-- 性别选择框 -->
					<view class="sexrap">
						<radio-group  @change="qiuzhisexChange">
							<label class="sexlabel"><radio  style="transform:scale(0.7)" value="不限" /> 不限</label>
							<label class="sexlabel"><radio style="transform:scale(0.7)" value="男" /> 男</label>
							<label class="sexlabel"><radio  style="transform:scale(0.7)" value="女" /> 女</label>
						</radio-group>
					</view>
				</view>
				 
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			<view class="textwrap">
				<view class="leftwrap"><view class="lefttext">职位薪资 :</view></view>
				<view class="rightwrap">
					<view class="righttext" @tap="showqwxzPicker">{{ qiwangxinzi }}</view>
					<fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon>
				</view>
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			<view class="textareawrap">
				<view class="top-text">职位描述 :</view>
				<textarea maxlength="500" class="textarea" placeholder-class="hintcolor" placeholder="请简要说明招聘岗位,任职需求,公司介绍等,为保护隐私,请不要填写手机,QQ!"></textarea>
			</view>
		</block>
		
		<!-- 标签  各个发布界面的标签不同 start -->
		<view class="tagview" v-if="publishtype=='shunfengche'">
			<!-- 根据点进来不同的分类去找不同的标签 -->
			<view class="tagwrap" v-for="(czr, index) in czrarry" :key="index">
				<uni-tag :inverted="choosetagarry.indexOf(czr.name) == -1" :text="czr.name" :data-tagname="czr.name" @tap="seltag" type="primary" />
			</view>
		</view>

		<view class="line-wrap"><view class="line"></view></view>
		<!-- 标签  各个发布界面的标签不同 end -->

		<!-- 上传照片 start -->
		<view class="upload-text">
			<view class="left-text">图片上传</view>
			<view class="right-text">{{ photoarry.length }}/6</view>
		</view>
		<view class="myphoto">
			<view class="photo-close" v-for="(photo, index) in photoarry" :key="index">
				<image :src="photo" class="photo-single" @tap="preview" :data-index="index"></image>
				<image src="https://img.yohaoyun.com/yohaoyun/commphoto/phptox.png" @tap="subone" :data-index="index" class="photo-x"></image>
			</view>
			<view class="photo-single jia" v-if="saturation"><image src="https://img.yohaoyun.com/yohaoyun/commphoto/jia.png" @tap="chooseImage" class="jiaimg"></image></view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>
		<!-- 上传照片 end -->

		<view class="textwrap">
			<view class="leftwrap">
				<view class="lefttext">联系人 :</view>
				<input class="input" placeholder="请输入联系人" />
			</view>
			<view class="rightwrap"><fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon></view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>

		<view class="textwrap">
			<view class="leftwrap">
				<view class="lefttext">电话 :</view>
				<input class="input" placeholder="请输入联系电话" />
			</view>
			<view class="rightwrap"><fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon></view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>

		<view class="textwrap">
			<view class="leftwrap">
				<view class="lefttext">信息置顶 :</view>
				<input class="input" v-model="zhiding" placeholder="选择后信息将显示到最顶部"  @tap="showxxzdPicker()"/>
			</view>
			<view class="rightwrap"><fa-icon class="fa-angle-right" color="#C9C8CD" size="20"></fa-icon></view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>

		<view class="textwrap">
			<view class="leftwrap">
				<view class="lefttext">发布条款 :</view>
				<checkbox-group>
					<label @tap="agree=!agree"> <checkbox value="cb" style="transform:scale(0.7)" checked="true"  /> 
					已阅读,并同意
					</label>
				</checkbox-group>
				 <view class="spanview" @tap="gotoclause">[发布须知]</view>
			</view>
		</view>
		<view class="line-wrap"><view class="line"></view></view>
		
		<!-- 发布按钮 -->
		<view>
			<button class="publishbtn" >发布</button>
		</view>
		
		
		
		
		
		
		<view>
			<!-- 下拉列表控件 -->
			<!-- 乘车人数 -->
			<mpvue-picker
				ref="ccmpvuePicker"
				:mode="mode"
				themeColor="#52A9EC"
				:pickerValueDefault="[0]"
				@onChange="onChange"
				@onConfirm="onConfirm"
				@onCancel="onCancel"
				:pickerValueArray="ccrsarry"></mpvue-picker>
			<!-- 信息置顶 -->
			<mpvue-picker
				ref="xxzdmpvuePicker"
				:mode="mode"
				themeColor="#52A9EC"
				:pickerValueDefault="[0]"
				@onConfirm="confirmxxzd"
				:pickerValueArray="xxzdarry"></mpvue-picker>
			<!-- 工作经验 -->
			<mpvue-picker
				ref="gzjympvuePicker"
				:mode="mode"
				themeColor="#52A9EC"
				:pickerValueDefault="[0]"
				@onConfirm="confirmgzjy"
				:pickerValueArray="gzjyarry"></mpvue-picker>			
			<!-- 期望薪资 -->
			<mpvue-picker
				ref="qwxzmpvuePicker"
				:mode="mode"
				themeColor="#52A9EC"
				:pickerValueDefault="[0]"
				@onConfirm="confirmqwxz"
				:pickerValueArray="qwxzarry"></mpvue-picker>				
					
			<!-- 乘车时间  -->
			<yu-datetime-picker ref="ccsjpicker" :current="true" color="#52A9EC" :isAll="false" @confirm="confirmccsj"></yu-datetime-picker>
		</view>
	</view>
</template>

<script>
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import mpvuePicker from 'mpvue-picker';
//时间到秒的选择器
import yuDatetimePicker from '@/components/yu-datetime-picker/yu-datetime-picker.vue';
//标签
import uniTag from '@/components/uni-tag/uni-tag.vue';

export default {
	components: {
		uniNoticeBar,
		uniPopup,
		mpvuePicker,
		yuDatetimePicker,
		uniTag
	},
	data() {
		return {
			mode: 'selector',
			publishtype:'zhaopin',
			chengkerenshu: '1人',
			chengcheshijian: '2019-11-02 10:10:09',
			czrarry: [
				{ id: 1, name: '按时发车' },
				{ id: 2, name: '有偿发车' },
				{ id: 3, name: '限男' },
				{ id: 4, name: '限女' },
				{ id: 5, name: '能开车' },
				{ id: 6, name: '男女不限' }
			],
			photoarry: [],
			preindex: 0,
			saturation: true /* 饱和--图片数组长度为5隐藏,反之显示*/,
			choosetagarry: [],
			agree:true,
			ccrsarry: [
				{ label: '1人', value: '0' },
				{ label: '2人', value: '1' },
				{ label: '3人', value: '2' },
				{ label: '4人', value: '3' },
				{ label: '5人', value: '4' },
				{ label: '6人', value: '5' },
				{ label: '6人及以上', value: '6' }
			],
			zhiding:'',
			xxzdarry: [
				{ label: '3元/1天', value: '0' },
				{ label: '6元/2天', value: '1' },
				{ label: '9元/3天', value: '2' },
				{ label: '12元/4天', value: '3' },
				{ label: '15元/5天', value: '4' },
				{ label: '18元/6天', value: '5' },
				{ label: '21元/7天', value: '6' },
				{ label: '不选择置顶', value: '7' }
			],
			/* 招聘求职 */
			zhiweiarry:['销售','客服','文员','前台','服务员','司机','店长','收银员','导购','店员/营业员',
			'迎宾/礼仪','经理/主管','助理','财务','设计师','教师','医生/护士','普工/技工','学徒','厨师','理发师/技师',
			'保安','保洁','快递员','其他'],
			choosezhiweiarry:[],
			gongzuojingyan:'请选择',
			gzjyarry:[{ label: '应届生', value: '0' },
				{ label: '1年以下', value: '1' },
				{ label: '1-3年', value: '2' },
				{ label: '3-5年', value: '3' },
				{ label: '5-10年', value: '4' },
				{ label: '10年以上', value: '5' }],
			qiwangxinzi:'请选择',
			qwxzarry:[{ label: '工资面议', value: '0' },
				{ label: '2000以下', value: '1' },
				{ label: '2000-4000', value: '2' },
				{ label: '4000-6000', value: '3' },
				{ label: '6000-10000', value: '4' },
				{ label: '1W以上', value: '5' }],	
				
		};
	},
	methods: {
		/* 打开乘车人数选择框 */
		showccPicker() {
			this.$refs.ccmpvuePicker.show();
		},
		/* 打开信息置顶的选择框 */
		showxxzdPicker(){
			this.$refs.xxzdmpvuePicker.show();
		},
		/* 打开工作经验选择框 */
		showgzjyPicker(){
			this.$refs.gzjympvuePicker.show();
		},
		/* 打开期望薪资选择框 */
		showqwxzPicker(){
			this.$refs.qwxzmpvuePicker.show();
		},
		showccsjPicker() {
			this.$refs.ccsjpicker.show();
		},
		onConfirm(e) {
			this.chengkerenshu = e.label;
		},
		confirmccsj(e) {
			this.chengcheshijian = e.selectRes;
		},
		confirmxxzd(e) {
			this.zhiding = e.label;
		},
		/* 确认工作经验 */
		confirmgzjy(e){
			this.gongzuojingyan = e.label ;
		},
		/* 确认期望薪资 */
		confirmqwxz(e){
			this.qiwangxinzi = e.label ;
		},	
		onChange(e) {
			console.log(e);
		},
		onCancel(e) {
			console.log(e);
		},
		/* 打开分类选择框  end*/
		seltag(e) {
			var me = this;
			var tagname = e.e.currentTarget.dataset.tagname;
			if (me.choosetagarry.indexOf(tagname) != -1) {
				me.choosetagarry.splice(me.choosetagarry.indexOf(tagname), 1);
			} else {
				me.choosetagarry.push(tagname);
			}
		},
		/* 上传照片 */
		chooseImage() {
			var me = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择
				success: function(res) {
					//JSON.stringify(res.tempFilePaths)
					me.photoarry = me.photoarry.concat(res.tempFilePaths);
					if (me.photoarry.length == 6) {
						me.saturation = false;
					}

					//console.log(JSON.stringify(res.tempFilePaths));
				}
			});
		},
		subone(e) {
			var me = this;
			var index = e.currentTarget.dataset.index;
			me.photoarry.splice(index, 1);
			if (me.photoarry.length < 6) {
				me.saturation = true;
			}
		},
		preview(e) {
			var me = this;
			/* 必须是整形才能生效 */
			var index = parseInt(e.currentTarget.dataset.index);
			console.info(index);
			uni.previewImage({
				urls: me.photoarry,
				current: index
			});
		},
		/* 前往发布须知 */
		gotoclause(){
			uni.navigateTo({
				url:'/pages/clause/clause'
			})
		},
		/* 招聘求职 */
		selzw(e){
			var me = this;
			
			var tagname = e.e.currentTarget.dataset.tagname;
			if (me.choosezhiweiarry.indexOf(tagname) != -1) {
				me.choosezhiweiarry.splice(me.choosezhiweiarry.indexOf(tagname), 1);
			} else {
				if(me.choosezhiweiarry.length ==3){
					uni.showModal({
						showCancel:false,
						confirmText:'确定',
						confirmColor:'#52A9EC',
						content:'最多可以选择3项',
						success(res) {
							//console.log(res);
						}
					})
					return ;
				}
				me.choosezhiweiarry.push(tagname);
			}
		},
		qiuzhisexChange(e){
			console.log(e.detail.value);
		}
	}
};
</script>

<style>
@import url('chezhaoren.css');
</style>
