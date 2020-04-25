import { cloneDeep, throttle, debounce } from 'lodash'

const Utils = {}

/**
 * 防抖函数
 * @param {*} func 函数体
 * @param {*} wait 延时
 */
Utils.debounce = (func, wait = 50) => debounce(func, wait)

/**
 * 节流函数
 * @param {*} func 函数体
 * @param {*} wait 延时
 */
Utils.throttle = (func, wait = 50) => throttle(func, wait)
/**
 * 深度遍历，深拷贝
 * @param {*} data
 */
Utils.deepClone = data => cloneDeep(data)
/**
 * 判断对象是否相同，忽略vue__ob__监听
 * @param {object} o1
 * @param {object} o2
 */
Utils.isObjEqual = (o1,o2)=>{
	var props1 = Object.getOwnPropertyNames(o1);
	var props2 = Object.getOwnPropertyNames(o2);
	if (props1.length != props2.length) {
		return false;
	}
	//不监控vue添加的__ob__监听
	for (var i = 0,max = props1.length-1; i < max; i++) {
		var propName = props1[i];
		if (o1[propName] !== o2[propName]) {
			return false;
		}
	}
	return true;
}


export default Utils