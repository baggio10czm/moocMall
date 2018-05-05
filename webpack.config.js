const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require('html-webpack-plugin');
function getHtmlWebpackPlugin(name){
 return  new htmlWebpackPlugin({
     template:path.join(__dirname,'./src/view/'+name+'.html'),
     filename:'view/'+name+'.html',
     inject : true,
     hash : true,
     chunks:[name]
 })
}
const config = {
    entry:{
        "index":'./src/page/index/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery':'window.jQuery'
    },
    module:{// 配置所有第三方模块的处理模块
        rules: [ // 是 第三方文件的匹配规则，是用来匹配文件后缀名的，同时指定匹配到的文件，交给 哪种类型的loader 去处理
            {test:/\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader']},// 处理CSS文件的loader 先交给css-loader 再交给 style-loader 处理 从后到前处理的顺序 先css 后 style 顺序不能改
            //{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理less文件的loader
            //{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理scss文件的loader
            { test: /\.(woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                } },
            { test: /\.(png|jp?g|gif|bmp|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'image/[name].[hash:7].[ext]'
                } } // 处理 图片路径的loader  注意：如果某种文件类型，只有一个 loader ，则可以直接 把 loader 名称以字符串形式，交给 use 去使用
            //  在 url-loader 中，有个 limit参数，指定了 转为base64格式最大值  只有小于给定值的图片才会被转码为 base64   注意 limit 的单位 是 Byte（字节）  如果图片大小正好等于给定值，不会被转码
            //{test:/\.js$/,use:'babel-loader',exclude:/node_modules/},// 注意： babel-loader 必须添加 一个 exclude 排除项，把 node_modules 下面的所有第三方模块排除在外，不进行编译转换，否则项目运行不起来！！！
            //{test:/\.vue$/,use:'vue-loader',exclude:/node_modules/}
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'style',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    devServer: {
        // contentBase: './dist/view',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        getHtmlWebpackPlugin('index')
    ]
};

module.exports = config;
