let curConf;
let env = process.env.NODE_ENV;
let baseConf = require('./scripts/base');
let webpackMerge = require('webpack-merge');

console.log(env,'env')
if (env === 'prod') {
    console.log('apply test configs');
    curConf = require('./scripts/prod');
} else {
    console.log('apply dev configs');
    curConf = require('./scripts/dev');
}

curConf = webpackMerge(baseConf,curConf);

module.exports = curConf;
