## 设计

### Page 页面

| 属性       | 说明     | 备注           |
| ---------- | -------- | -------------- |
| id         | -        | -              |
| name       | 页面名称 | 清明节推广     |
| domain     | 所属域名 | www.foo.com    |
| url        | 地址     | /abc/def       |
| state      | 0 1 2    | 无、草稿、发布 |
| templateId | 模板 id  | -              |
| deleted    | 删除     | true           |
| createDate | -        | -              |
| updateDate | -        | -              |

### Template 模板

| 属性       | 说明   | 备注         |
| ---------- | ------ | ------------ |
| id         | -      | -            |
| node       | 节点树 | json 数据    |
| type       | 1 2    | 页面、子模板 |
| deleted    | 删除   | true         |
| createDate | -      | -            |
| updateDate | -      | -            |

### System

| 属性       | 说明         | 备注    |
| ---------- | ------------ | ------- |
| id         | -            | -       |
| sourcePath | 资源文件位置 | /market |
