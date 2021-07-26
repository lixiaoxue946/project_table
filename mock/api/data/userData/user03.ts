module.exports = { 
    "userInfo": { 
        "username": "I am user03",
        "email": "root@wx.io",
        "mobile": "13612345678",
        "status": 1
    }, 
    "urlList": [
        "/biz/personalCenter", 
        "/biz/mobxExample",
        "/biz/welcome", 
    ], 
    "menuList": [
        {
            "name": "欢迎光临", 
            "url":null,
            "children": [{ 
                "parentId": 59,
                "name": "欢迎页", 
                "url": "/biz/welcome", 
                "children": [], 
            }]
        },
        {
            "name": "mobx示例", 
            "url": "/biz/mobxExample", 
            "children": [], 
        }
    ],
    "permList": ["sys:user:query"]
}