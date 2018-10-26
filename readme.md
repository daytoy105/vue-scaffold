### 技术栈
    <br>Vue 2.x + Vue-Router +  Vuex + webpack4.x + babel + sass + axios
### Installation 教程
1. 安装依赖包： cnpm i
2. 运行demo :   npm run dev
3. 本地运行: http://127.0.0.1:80/dist  (webpack-dev-server)
4. npm run build(线上打包)

### 说明
1. 提取样板文件(tree shaking)
2. Sass预编译，分离css文件，开启css自动补全 (style-loader、css-loader、postcss-loader、sass-loader、node-sass、mini-css-webpack-plugins（或extract-text-webpack-plugin@next）、autoprefixer)
3. 分离第三方库，webpack配置externals
4. import()动态路由加载
5. 热加载（webpack-dev-server）
6. 入口配置，可扩展（在pages页面增加文件入口，即可扩展为多入口配置，而不需要修改webpack配置）
7. 单元测试（Jest、react-test-utils、浅渲染、Mocha、Chai）
