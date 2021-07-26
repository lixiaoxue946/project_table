
// 确保是模块
export {};

declare global {
    //全局变量
    let App:any;
    
    interface Window { 
        [p:string]:any
    }

    interface AppSession{
        app:{
            
        }
    }

    interface AppLocal{
        app:{
            
        }
    }

    //请求参数
    type AjaxParams = {
        url:string;
        method?:string;
        data?:any;
        showError?:boolean;
        headers?:{
            [key:string]:string;
        };
    }
}

/*
declare module '*.css' {
    const styles: any;
    export = styles;
}
*/
  
