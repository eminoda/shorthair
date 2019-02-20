# shorthair

市场推广页、活动页可视化管理平台

:fire: working now, :grin: please wait,or checkout demo branch to try

## 功能

- 域名解析
- 模板设置（公共模板、js 逻辑交互）
- 页面管理

## TODO

### 系统

- [ ] 项目构建、框架选择
- [ ] 数据库建表

### 域名

- [ ] 对象设计
- [ ] 页面设计
- [ ] 地址解析

### 模板

- [ ] 对象设计
- [ ] 页面设计
- [ ] 注册表单
- [ ] 文案信息（TDK、版权信息）
- [ ] 弹框
- [ ] 按钮
- [ ] 图片（背景图）

### 页面

- [ ] 对象设计
- [ ] 页面设计
- [ ] 模板组装
- [ ] 预览
- [ ] 发布

## 设想&方案

### 对象设计

Website 网站

| 属性    | 说明 | 举例          |
| ------- | ---- | ------------- |
| id      | -    | -             |
| desc    | 站名 | 财富牛        |
| domain  | 域名 | www.cfniu.com |
| brand   | 品牌 | 九牛          |
| deleted | 删除 | true          |

Page 页面

| 属性          | 说明     | 举例          |
| ------------- | -------- | ------------- |
| id            | -        | -             |
| name          | 页面名称 | 元宵节活动页  |
| code          | 编码     | QWERTTY       |
| suffix        | 后缀     | html          |
| url           | 地址     | /QWERTTY.html |
| jsPath        | -        | -             |
| cssPath       | -        | -             |
| templateMixId | -        | -             |
| device        | 端       | -             |
| deleted       | 删除     | true          |

Template 模板

| 属性    | 说明   | 举例     |
| ------- | ------ | -------- |
| id      | -      | -        |
| name    | 模板名 | 注册表单 |
| styleId | -      | -        |

Element 元素

| 属性       | 说明                       | 举例 |
| ---------- | -------------------------- | ---- |
| id         | -                          | -    |
| type       | 按钮、背景图、图片、输入框 | -    |
| styleCssId | -                          | -    |

TemplateMix 模板组合

| 属性       | 说明 | 举例 |
| ---------- | ---- | ---- |
| id         | -    | -    |
| pageId     | -    | -    |
| templateId | -    | -    |

AddressRouter 地址解析

| 属性      | 说明    | 举例 |
| --------- | ------- | ---- |
| id        | -       | -    |
| websiteId | 网站 id | -    |
| pageId    | 页面 id | -    |
| stoped    | 停用    | true |
| deleted   | 删除    | true |

StyleCss 样式

| 属性            | 说明   | 举例 |
| --------------- | ------ | ---- |
| id              | -      | -    |
| isReact         | 响应式 | -    |
| height          | -      | -    |
| width           | -      | -    |
| color           | -      | -    |
| fontSize        | -      | -    |
| fontBold        | -      | -    |
| background      | -      | -    |
| backgroundColor | -      | -    |
| backgroundImage | -      | -    |
| border          | -      | -    |
| borderColor     | -      | -    |
| borderType      | -      | -    |
| left            | -      | -    |
| right           | -      | -    |
| top             | -      | -    |
| bottom          | -      | -    |
| position        | -      | -    |

### 地址解析

先通过云解析，将所以业务域名解析到固定 IP

**地址解析** 根据已经生成好的 **域名与地址映射关系.json** 进行解析

1. 访问 www.little9niu.com/QWERTTY.html，通过解析得到：

   - domain: www.little9niu.com
   - url: /20190220/ABCDEF.html

2. 得到 AddressRouter 判断解析的状态；同时拿到 Page
3. 根据 Page ，加载资源文件，渲染页面

### 模板

1. 元素定义
2. 公用模板
3. 模板功能

### 页面

1. 多端定义
2. 预览
3. 发布
