const webhttp = (options) =>{
	
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			mask:true,
			title:"加载中..."
		});
		uni.request({
			url: options.url,
			method: options.method,
			data: options.data,
			success: res => {
				resolve(res.data);
			},
			fail: (e) => {
				reject(e);
			},
			complete: () => {
				uni.hideLoading();
			}
		});
	});
}

export default webhttp;