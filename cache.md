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