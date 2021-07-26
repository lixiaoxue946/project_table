//release 输出不同的目录
const webpack = require('webpack')

module.exports = {
    mode:"production",
    optimization:{
        runtimeChunk:'single',
        splitChunks:{
            chunks:'all'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ]
};