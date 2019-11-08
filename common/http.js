const webhttp = (options) =>{
	
	return new Promise((resolve,reject)=>{
		if(options.showloading){
			uni.showLoading({
				mask:true,
				title:"加载中..."
			});
		}
		
		uni.request({
			url: options.url,
			method: options.method,
			data: options.data,
			success: res => {
				resolve(res.data);
			},
			fail: (e) => {
				console.log(e);
				reject(e);
			},
			complete: () => {
				if(options.showloading){
					uni.hideLoading();
				}
				
			}
		});
	});
}

export default webhttp;