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
- [ ] 对象设计
- [ ] 页面设计

### 域名

- [ ] 地址解析

### 页面

- [ ] 模板组合
- [ ] 预览
- [ ] 发布

### 模板

- [ ] 注册表单
- [ ] 文案信息（TDK、版权信息）
- [ ] 弹框
- [ ] 按钮
- [ ] 图片（背景图）

## 设想&方案

### 地址解析

先通过云解析，将所以 **业务域名** 解析到固定 IP 上。根据约定的 **页面映射关系** 进行解析处理。

服务端接入流程：

1. 访问 http://www.abc.com/QWERTTY.html，通过解析得到：

   - domain: www.abc.com
   - path: /20190220/ABCDEF.html

2. 判断地址映射关系 AddressMapper 状态
3. 拿到具体页面 Page 信息
4. 加载对应资源文件，渲染页面

### 通用模板

大到支撑整个页面，小到某个具体元素（按钮，文字）

每个模板可设置 js 功能

按照历史“经验”，大致模板分为：

| 模板     | 说明     | 类型   |
| -------- | -------- | ------ |
| 顶部广告 | -        | image  |
| 内容区   | 页面主体 | image  |
| 底部版权 | -        | text   |
| 锚点定位 | -        | button |
| app 下载 | -        | button |
| 注册表单 | 注册     | mix    |
| 协议     | -        | mix    |
| 弹框     | -        | mix    |

### 模板结构

```js
[
	{
		id: 1,
		name: '协议',
		active: true,
		style: {
			element: {
				name: 'div'
			}
		}
	}
];
```

### 页面构成

每个 Page 目前 **有且只有一个** Template 模板（包含页面所有展示内容）

通过 Page 的 **预览/发布** 操作生成 html、js、css、image、fonts 资源文件

### 预览/发布
