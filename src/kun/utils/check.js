/*
*验证类
*/
const ua = navigator.userAgent.toLowerCase();
export class check {
	constructor() {
		
	}
	isEmail = (s) => {//邮箱
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
	}
	isMobile = (s) => {//手机号
	return /^1[0-9]{10}$/.test(s)
	}
	isPhone = (s) => {//电话号
	return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
	}
	isURL = (s) => {//url
	return /^http[s]?:\/\/.*/.test(s)
	}
	isString = (o) => {//
	return Object.prototype.toString.call(o).slice(8, -1) === 'String'
	}
	isBoolean = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
	}
	isFunction = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
	}
	isNull = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
	}
	isUndefined = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
	}
	isObj = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
	}
	isArray = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
	}
	isRegExp = (o) => {//正则
	return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
	}
	isError = (o) => {//错误对象
	return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
	}
	isSymbol = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
	}
	isPromise = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
	}
	isSet = (o) => {
	return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
	}
	isWeiXin = () => {//weixin
	return ua.match(/microMessenger/i) == 'micromessenger'
	}
	isDeviceMobile = () => {//移动端
	return /android|webos|iphone|ipod|balckberry/i.test(ua)
	}
	isQQBrowser = () => {//qq浏览器
	return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
	}
	isSpider = () => {//爬虫
	return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
	}
	isIos = () => {//ios
	var u = navigator.userAgent;
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {  //安卓手机
	return false
	} else if (u.indexOf('iPhone') > -1) {//苹果手机
	return true
	} else if (u.indexOf('iPad') > -1) {//iPad
	return false
	} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
	return false
	} else {
	return false
	}
	}
	isPC = () => {//pc
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
	"SymbianOS", "Windows Phone",
	"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
	if (userAgentInfo.indexOf(Agents[v]) > 0) {
	flag = false;
	break;
	}
	}
	return flag;
	}
	isCardID = (sId) => {
	if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
	console.log('你输入的身份证长度或格式错误')
	return false
	}
	//身份证城市
	var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
	if (!aCity[parseInt(sId.substr(0, 2))]) {
	console.log('你的身份证地区非法')
	return false
	}

	// 出生日期验证
	var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
	d = new Date(sBirthday)
	if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
	console.log('身份证上的出生日期非法')
	return false
	}

	// 身份证号码校验
	var sum = 0,
	weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
	codes = "10X98765432"
	for (var i = 0; i < sId.length - 1; i++) {
	sum += sId[i] * weights[i];
	}
	var last = codes[sum % 11]; //计算出来的最后一位身份证号码
	if (sId[sId.length - 1] != last) {
	console.log('你输入的身份证号非法')
	return false
	}

	return true
	}
	isObjectEqual = (a, b) => {//判断两个对象是否键值相同
	var aProps = Object.getOwnPropertyNames(a);
	var bProps = Object.getOwnPropertyNames(b);

	if (aProps.length !== bProps.length) {
	return false;
	}

	for (var i = 0; i < aProps.length; i++) {
	var propName = aProps[i];

	if (a[propName] !== b[propName]) {
	return false;
	}
	}
	return true;
	}
}