//本地缓存基类
class Storage {
	constructor() {
		
	}
set_storage(params){
	let obj = {
		name:'',
		value:'',
		expires:"",//过期时间
		startTime:new Date().getTime()//记录何时将值存入缓存，毫秒级
	}
	let options = {};
	Object.assign(options,obj,params);//将obj和传进来的params合并
	if(options.expires){
		//如果options.expires设置了的话
		//以options.name为key，options为值放进去
		try {
			// uni.setStorageSync(options.name,JSON.stringify(options));
			localStorage.setItem(options.name,JSON.stringify(options))
		} catch (e) {
			// error
		}
	}else{
		//如果options.expires没有设置，就判断一下value的类型
		let type = Object.prototype.toString.call(options.value);
		//如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
		if(type == '[object Object]'){
			options.value = JSON.stringify(options.value);
		}
		if(type == '[object Array]'){
			options.value = JSON.stringify(options.value);
		}
		try {
			// uni.setStorageSync(options.name,options.value);
			localStorage.setItem(options.name,options.value)
		} catch (e) {
			// error
		}
	}
}
get_storage(name){
	//尝试获取本地缓存
	let item
	try{
		// item = uni.getStorageSync(name)name
		item = localStorage.getItem(name);
	}catch(e){
		//TODO handle the exception
	}
	//先将拿到的试着进行json转为对象的形式
	try{
		//会过期
		item = JSON.parse(item);
	}catch(error){
		//不会过期
	//如果不行就不是json的字符串，就直接返回
		// item = item;	
	}
	if(!item){
		return;
	}
	// console.log(item)
	//如果有startTime的值，说明设置了失效时间
	// console.log(item)
	if(item.startTime){
		let date = new Date().getTime();
		//取出时间 减去 存入时间，与item.expires比较，大于-过期/小于等于-没过期
		if(date - item.startTime > item.expires){
			console.log('token失效')
			//缓存过期，清除缓存，返回false
			this.remove_storage(name);
			return false;
		}else{
		//缓存未过期，返回值
			return item.value;
			// return item;
		}
	}else{
		return item;
	}

}
remove_storage(name){
	try {
		// uni.removeStorageSync(name);
		localStorage.removeItem(name);
	} catch (e) {
		// error
	}
}
clear_storage(){
	try {
		// uni.clearStorageSync();
		localStorage.clear();
	} catch (e) {
		// error
	}
}
}

export { Storage }