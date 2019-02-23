# shorthair

市场推广页、活动页可视化管理平台

:fire: working now, :grin: please wait,or checkout demo branch to try

## 功能

- 域名解析
- 模板设置（公共模板、js 逻辑交互）
- 页面管理

## TODO

### 系统设计

- [x] shorthair-app 项目初始化
- [x] shorthair-admin 项目初始化
- [ ] 对象设计
- [ ] 数据库建表
- [ ] 页面设计

### 域名

- [ ] 地址解析
- [ ] 域名维护

### 页面

- [ ] 页面维护
- [ ] 模板维护
- [ ] 页面模板双向修改
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
3. 拿到 Page，并加载对应资源文件，渲染页面

### 通用模板

大到支撑整个页面，小到某个具体元素（按钮，文字）

每个模板可设置 js 功能

按照历史“经验”，大致页面模板分为：

| 模板      | 说明 |
| --------- | ---- |
| h5 注册页 | -    |
| pc 注册页 | -    |
| app 下载  | -    |

### 模板结构

```js
[
  {
    element: {
      tag: "div",
      attribs: {
        class: "signup-modal-wrap"
      }
    },
    style: {
      color: "red"
    },
    nodes: [
      {
        element: {
          tag: "li",
          attribs: {
            class: "shouji"
          }
        },
        style: {
          color: "green"
        },
        nodes: [{}]
      },
      {
        element: {
          tag: "li",
          attribs: {
            class: "shouji"
          }
        },
        style: {
          color: "green"
        },
        nodes: [{}]
      }
    ]
  }
];
```

### 页面构成

每个 Page 目前 **有且只有一个** Template 模板（包含页面所有展示内容）

加载资源文件 **资源文件**

### 预览/发布

1. 预览（**管理界面** 中展示模板）

pageId -> templateId -> 遍历 Templates 集合 -> 内联样式到标签 -> 投到管理界面中进行预览

2. 发布 （**客户端** 展示）

pageId -> Page -> buildRecordId -> sourceFile -> 得到所需资源的引用文件

3. 同步设置 （管理界面 View 和 Model 交互）
