不要单纯的去记几个api、配置项之类的，感觉没得啥子用得?

### 为什么要用webpack?
1. 简化工作流
热更新;less css自动转换;自动添加css兼容性写法;自动索引依赖打包文件；各种插件实现不同的功能
2. 输出优化
压缩、混淆、异步代码拆分


### 优化思路

webpack就是用来处理文件的，优化自然也是优化这个过程

1. 不要去处理不用处理的文件，如babel-loader没得必要去处理node_modules里面的生产文件
2. 将一些固定的永远不变的文件，处理一次后就不要二次处理
3. 开启多进程，使处理得更快
4. 对大消耗的操作开启缓存，可以使得后续的编译过程直接利用缓存，更快一些


##实践
### 打包速度量化 speed-measure-webpack-plugin
npm install --save-dev speed-measure-webpack-plugin ,
var SpeedWebpackPlugin = require('speed-measure-webpack-plugin')
var smtp = new SpeedWebpackPlugin();
module.exports = smtp.wrap({
    //  原有的webpack配置, 打包后会加载出各个流程所花费的时间
})

### 如果有从html通过script标签引入的文件，如jquery，lodash等。打包是不用去解析这种引用的。
通过在 external 中配置 jquery: 'jQuery' (暴露出来的全局变量名称), 然后就可以在代码中通过 import $ from jquery 在进行引用。并且在module配置中进行排除
module.noParse = /jquery | lodash/
```javascript

 externals: {
    jquery: 'jQuery'
  },
  module: {
    noParse: /jquery | lodash/,
  }
```
### 充分利用缓存
* cache-loader
对工作量比较大的loader，比如babel-loader ， 缓存中间结果可以减少构建时间。用法是加到其他loader最前面完事s
* hard-source-webpack-plugin
这个plugin，特别牛皮。如果前后两次啥文件都没变，第二次打包速度将极大减短，如果变了，效果就没得那么明显得。反正加起嘛，直接引进来,在plugins里面配置 new HardSouceWebpackPlugin()就可以了。
### 排除不需要解析的文件
最常见的就是node_modules 里面的文件都是打包好了的，不需要babel再次进行处理的。可以用exclude进行排除或者用include只包含要解析的文件

### 代码重用
多段代码都重复引入一个库是很常见的, 通过commonChunksPlugin来避免重复工作
```javascript
//webpack.config.js
module.exports = {
    optimization: {
        splitChunks: {//分割代码块
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1, //设置优先级，首先抽离第三方模块
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 //最少引入了1次
                },
                //缓存组
                common: {
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, //大小超过100个字节
                    minChunks: 3 //最少引入了3次
                }
            }
        }
    }
}

```
### 开启多进程
通过开启多进程，并行打包。值得注意的是拉起多进程本身就是需要时间的，如果项目不是特别大，开启多进程反而会拖慢打包速度
* happypack
```javascript
const Happypack = require('happypack');
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'Happypack/loader?id=js',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css',
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')
                ]
            }
        ]
    },
    plugins: [
        new Happypack({
            id: 'js', //和rule中的id=js对应
            //将之前 rule 中的 loader 在此配置
            use: ['babel-loader'] //必须是数组
        }),
        new Happypack({
            id: 'css',//和rule中的id=css对应
            use: ['style-loader', 'css-loader','postcss-loader'],
        })
    ]
}

作者：刘小夕
链接：https://juejin.im/post/5e6cfdc85188254913107c1f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
* thread-loader 
加到其他loader最前面就行了，效果和happypack差不多，配置更简单一些。这个和happypack都是并行执行加载器(loader)
* parallel-webpack 
并行执行整个webpack构建

### dllPlugin
