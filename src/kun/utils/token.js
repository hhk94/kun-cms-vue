import { Storage } from '@/kun/utils/storage'
var storage = new Storage();

class Token {
	constructor() {
		
	}
	set_token(params){
		let data = {
			name:'USER_INFO',
			value:params,
			expires:1 * 60 * 60 * 4000
		}
		storage.set_storage(data)
	}
	
	get_token(){
		return storage.get_storage('USER_INFO')
	}
	remove_token(){
		storage.remove_storage('USER_INFO')
	}
}
export { Token }