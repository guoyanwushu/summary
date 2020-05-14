#### 缓存策略
* 缓存
    * 缓存多久?
        maxage=10000
        expires='2019-08-15' expires是个绝对时间，可能会出现服务端和浏览器端时间不一致，导致缓存异常的问题。所以maxage相对时间要稍微好一点
* 不缓存
    * no store 完全不缓存
    * no cache 询问式缓存
        Last-Modified/If-Modified-Since  Etag/If-none-Match
* public 客户端和代理服务器都可以缓存 (如果使用了cdn， 需要开启使 cdn的代理服务器允许缓存)
* private 只能客户端缓存，代理服务器不允许缓存


#### 因为缓存引起的问题: 

1. ie浏览器的get请求如果url和请求参数一样，会被完全缓存，后续的请求只会从缓存里面取

#### 解决方案

1. 如果用了webpack, 那么可以给每一个文件加上唯一的hash标识，然后服务端将缓存时间maxage设置为1年。这样子可以保证如果缓存未到期则一直使用缓存，如果更新，因为访问的都是新的文件引用，则保证可以同步更新到最新的代码
2. 如果未使用webpack
* 如果使用了模块化，可以考虑在加载真正的js或者css文件前，为对应的文件地址加上随机字符串
  以require为例, 可以在require配置文件里面加上urlArgs参数, 则会在地址后面加上
  ```javascript
    require.config({
        urlArgs: +new Date
    })
  ```
* 如果没使用模块化，那么怎么去做这个事情呢?
  可不可以去写一个工具, 扫描html的引入文件，自动在文件url后面添加唯一字符串，然后返回新的已经加了唯一字符串的文件.可以利用gulp的插件来实现对应功能

#### 服务器的默认缓存策略？请求头的cache-control和响应头的cache-control有什么区别?f5和ctrl+f5的区别?
* ctrl+f5会在请求头里加上cache-control: no-cache , 告诉服务器客户端不想使用本地缓存，如果之前的响应有返回etag或者last-modified，那么就会走协商缓存的路子，询问缓存是否可用，如果可用就是304，如果没有etag或者last-modified，那么就拿的是最新的内容
