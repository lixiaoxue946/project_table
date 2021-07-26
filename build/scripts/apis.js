let env = process.env.NODE_ENV;
let dev;
console.log(process.env.NODE_ENV, "process.env", process.env.REACT_APP_TEST);

// dev--开发, it--集成，uat--验收，sim--仿真,prd--生产
if (env === "development") {
  // 开发
  console.log("development");
  dev = `https://dijhgg.39nat.com`;
} else if ( env === "prod") {
  // 生产
  console.log("prd", env);
  dev = ``;
}

// 如果配置文件有设置，则取配置文件地址
if (!!window.app && !!window.app.env.BASE_URL) {
  dev = window.app.env.BASE_URL;
}
module.exports = dev;
