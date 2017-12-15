const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); /*生成html*/
const CopyWebpackPlugin = require('copy-webpack-plugin'); /*复制文件*/
module.exports = {
	entry: {						
		index: './js/index.js', /*首页*/	
		second:'./js/second.js', /*第二页*/
		three: './js/three.js', /*第三页*/
	},
	devtool: 'cheap-source-map',   //开启调试模式，cheap-source-map提升打包速度和编译速度。
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "./js/[name].js", 
	},
	module: {
		loaders: [
			{
		        test: /\.(less|css)$/,
		        use:[ 'style-loader','css-loader','less-loader'],
		     },
			{
			      test: /\.ejs$/,
			      loader: 'ejs-html-loader',			     
			  },
			 {
			 	//提取html里面的img文件
		        test: /\.(htm|html)$/i,
		        loader: 'html-withimg-loader',
		   },
			   {
			   	//图片打包
			   	test:/(\.jpg|\.png|\.gif|\.jpeg|\.ttf)$/, 
			   	use:{
			   		loader:'file-loader',
			   		 options: {
			   		 	outputPath: '/',
			   		 	name:'[name].[ext]',		   		 	
				      	useRelativePath:true
				    }
			   	}
			   },			 
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '首页',
			filename: 'index.html',
			template: 'ejs-render-loader!index.ejs',			
			chunks: ['index'],
		}),
		new HtmlWebpackPlugin({
			title: '第二页',
			filename: 'second.html',
			template: 'ejs-render-loader!second.ejs',			
			chunks: ['second'],
		}),
		new HtmlWebpackPlugin({
			title: '第三页',
			filename: 'three.html',
			template: 'ejs-render-loader!three.ejs',			
			chunks: ['three'],
		}),
		new CopyWebpackPlugin([{
		    from: __dirname + '/img',
		    to:'img/'
		}]),

	],

	resolve:{		
		extensions: [".js",".less",".css"],
	},
	
	//构建本地服务器的相关配置 需要在`package.json`里面激活
	devServer: {
		contentBase:'./build',
		historyApiFallback: true, //不跳转
		inline: true,//实时刷新,
	},
 
}