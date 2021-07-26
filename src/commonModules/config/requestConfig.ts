import dev from "@scripts/apis";

let requestConfig = {
  login: `${dev}/user/login`, // 登录接口

  // Pm_control页面相关接口
  pmExportExcel: `${dev}/pm/query/exportExcel`, // pm 下载
  queryList: `${dev}/pm/query/list`, // pm 列表
  queryLot: `${dev}/pm/query/lot`, // pm下拉列表
  queryProduce: `${dev}/pm/query/product`, // product下拉列表

  // Standard相关接口
  checkStandard: `${dev}/standard/query/checkStandard`, // checkStandard 审核
  detailinfo: `${dev}/standard/query/detailinfo`, // detailinfo下拉列表
  standardExportExcel: `${dev}/standard/query/exportExcel`, //  standardList 下载
  standardImportExcel: `${dev}/standard/query/importExcel`, // standardList 导入
  standardPlatForm: `${dev}/standard/query/plateform`, // plateform下拉列表
  saveStandard: `${dev}/standard/query/saveStandard`, // standardList 提交
  standardList: `${dev}/standard/query/standardList`, // standardList-页面展示列表
  standardCopy:`${dev}/standard/query/copy`,// copy

  // 审核清单
  productCheckList: `${dev}/productCheck/query/list`, // 审核清单列表


  //以下为error test!!

  bizError: "/bizError",
  //400-请求无效
  error400: "/error400",
  //不存在
  error404: "/error404",
  //服务器内部错误
  error500: "/error500",
  //服务不可用
  error503: "/error503",
  //301
  biz301: "/biz301",
};

export default requestConfig;
