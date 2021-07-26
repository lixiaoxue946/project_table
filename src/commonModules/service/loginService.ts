import ajax from '../ajax/ajaxMain'
import requestConfig from '../config/requestConfig'

const login = (data) => {
	return ajax({
		url: requestConfig.login,
		data,
		method:'GET'
	})
}

export default {
	login,
}


