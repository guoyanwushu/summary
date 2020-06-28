## 构建工具

* 项目里webpack的优化
* webpack构建流程
* webpack插件原理
* 有自己写过插件么
* 从零构建一个webpack项目可以么
* load的原理
* 描述一下splitChunkPlugin
* 


## HTTP
* 三次握手 、四次挥手
* HTTP和TCP的区别
* HTTP2对比HTTP1.1
* HTTP2是怎么解决对头阻塞的
* HTTP2是如何压缩头部的
* 为什么说HTTPS比HTTP安全
* 对称加密和非对称加密
* HTTP请求的时候什么时候用的对称加密什么时候用的非对称加密
* 对称加密的原理
* 攻击
* 有关HTTP缓存的首部字段说一下
* HTTP中的keep-alive有了解吗？
* 在一次传输中它是如何保证每个数据包之间的顺序的？
* 具体说一下HTTP/2中的多路复用
* GET和POST的区别
* 为什么说GET会留下历史记录？
* GET可以上传图片吗？
* GET和POST的安全性问题为什么说POST相对安全一些
* GET就一定是幂等的吗？
* 说一下你所知道的缓存方案

## JS基础
* EventLoop
* requestAnimationFrame属于宏任务还是微任务
* 输入URL到页面的呈现
* script与css还有页面的渲染顺序
* script标签的async是什么时候加载的
* 说一下==数据类型转换吧
* 说一说原型链
* null为什么被typeof错误的判断为了'object'
* 说一说几种this指向
* 使用箭头函数时需要注意什么？
* 说一下JS内置对象
* 描述一下作用域链
* 闭包的使用场景
* 使用闭包需要注意什么
* 用过哪些ES6的功能
* 谈谈你对模块的理解

## css
* position属性有哪些值分别介绍一下
* relative的定位规则
* 脱离文档流是会呈现什么样的效果呢？
* 常规流(文档流)是个怎样的排列关系
* inline-block的使用场景
* 有做过移动端项目么，说一下你们的适配方案
* 怎么让移动端项目在PC端也能较好的使用
* 








## node
* 有用过node吗？比如用它写一些中间层

## vue
* vue中key的作用    
    1. 利用key规避diff时的最大化复用策略，使得前后dom更新时能够触发完整的生命周期并且能够触发过渡
    2. 同样是利用key，使得updateChildren的时候，在四轮首位对比均未命中的情况下可以更快定位到旧节点中的相同节点，间接的提升效率。
* 可以将key设置为Math.random()随机数么

    不能, 如果把key设置为Math.random(), 将会导致diff时，几乎无法复用旧的节点，每一次update都将会走
    remove和create的策略，于性能而言，是很不好的。
* 如果让你设计一个双向绑定，会怎么设计
* 说一下Vue的diff算法，能不能描述一下vue的diff流程?

    vue通过diff算法来控制dom更新粒度。首先diff只在同层节点间进行，如果判断sameNode失败，就会删除旧节点，创建新节点
插入原有位置，如果sameNode成功就会进入diff流程，在原有真实节点上更新。在前后都有children的情况下，进入childrendiff
流程，会尝试最大化利用之前的已有节点作更新，然后对新增节点和移除节点作对应的真实dom创建和新增。
    
* diff算法的缺点
    事实上每一次diff都必须从根节点开始逐层对比，即便是完全静态的节点，也必须经过diff流程。可能一个vDom只有最后一个元素的一个文本引用了data数据，那么之前的所有diff都没有意义, 只有最后
    一个节点的diff是有意义的diff。vue3中，通过打标签的形式，在生成vNode的时候进行标记收集，最终生成一个动态节点树，patch的时候不再进行整个vNode树对比，而只进行动态节点树对比，提高了diff效率。
* Vue的双向绑定原理，Object.defineProperty()有什么缺点？Vue3为什么用Proxy?

    通过Object.definProperyty劫持data对象属性的get和set，在get时收集依赖，set时触发更新,从而实现data更新时自动同步dom更新，双向绑定不过是响应输入事件更改data罢了。defineProperty有缺陷，无法识别到对象属性的新增删除和数组的直接索引变更以及length变更,而proxy原生支持。另外一方面Object.defineProperty是属性级别的劫持，必须遍历对象的每一个属性进行劫持，而proxy是对象级别的劫持，无须遍历对象
* nextTick实现原理
    向callbacks里添加一个处理函数。在当前的同步任务执行完成后，就会去callbacks里面取出来，挨个执行。
* nextTick中的waiting是什么时候变为true的呢    
    每一个更新队列开始时，第一次执行queueWatcher时，waiting被设置为true。在队列更新全部完成后, waiting被重置为false
* 说一下虚拟DOM的作用以及实现原理    
     
    虚拟dom是将真实dom中我们最关注一的一些特性抽离处理，比如属性、节点类型、事件等以js对象树代替真实的dom树来进行维护，一方面虚拟dom更轻量化，另外一方面可以通过diff算法，实现由数据驱动，完全自动的dom更新。
* Vue3有哪些新的API或者有做哪些优化？
    * 新api
        * 组合式api
        vue3将2.0中常见的选项式api进行抽离，将响应式属性，生命周期钩子等常见的功能选项抽离成单独的函数，通过引入并使用的形式来完成业务逻辑
            优点:    
                1. 通过函数而非选项来完成相关的业务功能，可以获得完整的代码提示和类型推导，利用typescript开发vue应用也变得更加容易
                2. 于组件而言，逻辑将会更加清晰，对应的逻辑块可以集中处理并抽离，而不是分散在选项的各处，更有利于阅读和维护
                3. 受益于vue3的tree shaking技术，按需引入将使得最终的生成文件可以剔除掉没有用到的功能代码，生产文件将更小
                4. 组合式api更利于功能复用，不再受限于this的限制
        * 配置api更改
        在2.0中，所有的mixin 插件 指令等最终都会挂在在vue对象上，第三方出现的异常将会污染整个vue对象。在3.0中，通过 app  = createApp() , 然后 app.use app.component app.directive, 都会挂载在app实例上，不会对vue对象产生影响
        * vue-fragement
        解决根节点只能有一个的问题
        * suspense
        在组件未彻底加载成功之前显示后备组件，比如loading等
        * v-model
        3.0支持可以带属性名的v-model指令
        * Portals
        在当前组件之外显示某些内容, 比如弹出窗口，tagView的右侧小菜单等，逻辑上属于当前组件容器，但是却不得不放到组件外比如body上面去
        * 新的自定义指令api
        于组件声明周期一致，更容易理解。beforeMount mounted beforeUpdate updated beforeUnmount unmounted

    * 优化
        * 全局api tree shakeable 按需导入，未用到的功能将会被剔除
        * proxy实现的数据劫持监听
            解决Object.defineProperyty 不能检测对象属性新增和删除，数组索引及length修改的响应式变化， 在对象级别建立监听而不用遍历递归在每一个属性上建立监听，效率大大提升
        * diff算法更新
        
* 谈一谈vuex的原理，有了解过其他的持久化方案么比如redux，说一下他们的区别
* 

## 项目
* 权限控制，路由权限和按钮权限
    
* 按钮权限有几种控制方式
    
* token一般放在哪里
* token放在Cookie、sessionStorage、localStorage有什么不同
* Cookie有哪些安全问题、如何预防
* SameSite设置为了lax之后是怎样来控制Cookie的发送的，如果顶级域名不同会发送吗
* 如果使用jsonp的话会有什么安全问题吗？
* 你们有做过单点登陆吗
* 有用过ngnix吗？用它做过哪些事？
* 项目里做过哪些优化？
* 你认为你做的项目最大的亮点在哪里
* 项目中碰到的技术难点
* 动态表单的实现
* 你们项目一般是如何做缓存的
* 项目中的环境变量是如何控制的？
* 假设有两个子项目，他们需要共用同一个用户体系如何保证关掉页面之后打开另一个项目用户还是登录状态
* 首屏加载优化
* SSR的使用场景
* 你们的UI组件库怎么实现按需引入的呢？
* 如果有一个组件需要和前面的组件相关联你会怎么做
* 说一下你们的工作流

