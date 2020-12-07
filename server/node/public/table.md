# 数据库

## User

| 字段      | 类型    | 默认     | 备注                                        |
| --------- | ------- | -------- | ------------------------------------------- |
| admin     | boolean | false    | 是否是管理员                                |
| name      | string  |          |                                             |
| avatar    | string  |          |                                             |
| gender    | string  | male     | 枚举：{male:'男',female:'女',unknow:'未知'} |
| sign      | string  |          | 个性签名                                    |
| phone   | string  |          |                                             |
| pwd       | string  |          |                                             |
| createdAt | date    | Date.now | 创建时间，默认当前时间                      |
| updatedAt | date    | Date.now | 更新时间，默认当前时间                      |

