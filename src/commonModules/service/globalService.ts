/*
{
    "phone": "string",
    "type": 0
  }
*/

import ajax from '../ajax/ajaxMain'
import requestConfig from '../config/requestConfig'

let ajaxService = ({ url, data, method = 'POST', showError = true, headers = {} }) => {
  return ajax(
    {
        url,
        data,
        method
    },
    showError,
    headers
  )
}


// pm 下载
const pmExportExcel = (data) => {
    return ajaxService({
        url: requestConfig.pmExportExcel,
        data,
        method:'GET'
    })
}

// pm 列表
const queryList = (data) => {
    return ajaxService({
        url: requestConfig.queryList,
        data,
        method:'GET'
    })
}

// lot下拉列表
const queryLot = (data) => {
    return ajaxService({
        url: requestConfig.queryLot,
        data,
        method:'GET'
    })
}

// product下拉列表
const queryProduce = (data) => {
    return ajaxService({
        url: requestConfig.queryProduce,
        data,
        method:'GET'
    })
}

// checkStandard 审核
const checkStandard = (data) => {
    return ajaxService({
        url: requestConfig.checkStandard,
        data,
        method:'POST'
    })
}

// detailinfo下拉列表
const detailinfo = (data) => {
    return ajaxService({
        url: requestConfig.detailinfo,
        data,
        method:'GET'
    })
}

// standardList 下载
const standardExportExcel = (data) => {
    return ajaxService({
        url: requestConfig.standardExportExcel,
        data,
        method:'POST'
    })
}

// standardList 导入
const standardImportExcel = (data) => {
    return ajaxService({
        url: requestConfig.standardImportExcel,
        data,
        method:'POST'
    })
}

// plateform下拉列表
const standardPlatForm = (data) => {
    return ajaxService({
        url: requestConfig.standardPlatForm,
        data,
        method:'GET'
    })
}

// standardList 提交
const saveStandard = (data) => {
    return ajaxService({
        url: requestConfig.saveStandard,
        data,
        method:'POST'
    })
}

// standardList-页面展示列表
const standardList = (data) => {
    return ajaxService({
        url: requestConfig.standardList,
        data,
        method:'GET'
    })
}

// standardList-copy
const standardCopy = (data) => {
    return ajaxService({
        url: requestConfig.standardCopy,
        data,
    })
}



// 审核清单列表
const productCheckList = (data) => {
    return ajaxService({
        url: requestConfig.productCheckList,
        data,
        method:'GET'
    })
}

export default {
    pmExportExcel,
    queryList,
    queryLot,
    queryProduce,

    checkStandard,
    detailinfo,
    standardExportExcel,
    standardImportExcel,
    standardPlatForm,
    saveStandard,
    standardList,
    standardCopy,
    productCheckList,
    
}
  