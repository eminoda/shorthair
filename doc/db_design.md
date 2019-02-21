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

| 属性       | 说明     | 举例         |
| ---------- | -------- | ------------ |
| id         | -        | -            |
| name       | 页面名称 | 元宵节活动页 |
| code       | 编码     | QWERTTY      |
| device     | 端       | -            |
| tdk        | -        | -            |
| createDate | -        | -            |
| updateDate | -        | -            |
| deleted    | 删除     | true         |

AddressMapper 地址解析

| 属性      | 说明    | 举例 |
| --------- | ------- | ---- |
| id        | -       | -    |
| websiteId | 网站 id | -    |
| pageId    | 页面 id | -    |
| deleted   | 删除    | true |

SourceFile 资源文件

| 属性          | 说明        | 举例       |
| ------------- | ----------- | ---------- |
| id            | -           | -          |
| fileName      | 文件名      | QWERTTY.js |
| type          | css js html | -          |
| buildRecordId | -           | -          |

BuildRecord 页面构建记录

| 属性       | 说明     | 举例 |
| ---------- | -------- | ---- |
| id         | -        | -    |
| pageId     | -        | -    |
| active     | 启用状态 | -    |
| createDate | -        | -    |

Template 模板

| 属性          | 说明     | 举例     |
| ------------- | -------- | -------- |
| id            | -        | -        |
| associationId | 元素集合 |          |
| name          | 模板名   | 注册表单 |
| active        | 启用状态 |          |
| deleted       | 删除     | true     |

Association 组合

| 属性            | 说明   | 举例 |
| --------------- | ------ | ---- |
| id              | -      | -    |
| templateId      | -      | -    |
| childTemplateId | 子模板 | -    |
| styleId         | -      | -    |

Element 元素

| 属性 | 说明   | 举例 |
| ---- | ------ | ---- |
| id   | -      | -    |
| name | 元素名 | -    |
| tag  | 标签   | div  |

StyleTable 样式

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
