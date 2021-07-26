import { message } from 'antd';

/*
@param params:{
    
    url:【必填】,请求地址
    method:选填,默认POST;
    data:选填，根据get/post 默认[]/{} ,请求参数,
    showError:选填，默认true  当请求出错时,是否弹出错误提示
    headers:选填,默认{} header 相关信息

}
*/

const ajax = (params: AjaxParams)=>{
    let responseObj = null;
    let showError = params.showError;
    if(showError === undefined){
        showError = true;
    }
    let headers = params.headers||{};

    const isGet = params.method && params.method.toLowerCase() === 'get'
    const isPut = params.method && params.method.toLowerCase() === 'put'
    if (isGet) {
        let str = '';
        Object.entries(params.data || []).map((item, index) => {
            str += `${index === 0 ? '?' : '&'}${item[0]}=${item[1]}`
        })
        params.url += str;
    }
    return fetch(params.url, {
        method: params.method || 'POST',
        body: isGet ? null : (isPut ? params.data || {} : JSON.stringify(params.data || {})),
        
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': sessionStorage['token'] ? sessionStorage['token'] : '',
            'flowIds':sessionStorage['flowsId'] ? sessionStorage['flowsId'] : '',
            ...headers
        },
        mode: "cors"
    }).then(response => {
        //后端延迟token的优化处理
        response.headers.forEach((key, val: any) => {
            if(key === 'token' && val && val.accessToken){
                sessionStorage['token'] = val.accessToken;
            }
            if (val === 'token' && key) {
                var keyObj = JSON.parse(key)
                let time = +new Date()
                if (keyObj.accessToken) {
                    sessionStorage['token'] = keyObj.accessToken;
                }
            }
        });
        let statusStartCode = response?.code
        //status 4xx 5xx 是错误
        if(statusStartCode=='200'){
            return Promise.reject(response);
        }else{
            return response.json();
        }
    }).then(response => {
        //token
        if(response?.result?.token){
            sessionStorage['token'] = response?.result?.token;
        }
        responseObj = response;
        const requestResult = response;
        const code = response?.code
        if (code=='200') {
            return Promise.resolve(requestResult);
        } else {
            return Promise.reject(response);
        }
    }).catch(error => {
        if (error?.code!=='200') {
            message.error(error?.message)
            return Promise.resolve(error?.message)
        }
        
    })
}



export default ajax;

