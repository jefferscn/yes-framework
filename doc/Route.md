路由功能介绍
==============================================

> 路由定义了可以在应用中用来跳转的路径和控件的对应关系，同时也定义了初始的路由，整个App都是由路由系统来开始的。
> 当前系统使用的是react-navigation。

定义
---------------------------------------------

* 修改route.json

## 基本路由属性
* key
* type
* isRoot

  如果为true则当前路由就是初始路由，在登录之后会直接显示
* path
  
  路由的路径，这个路径在跳转的时候使用
## 控件路由
控件路由的type是control
* control

  指向注册的控件

```javascript
    {
        "key": "Home",
        "type": "control",
        "path": "Home",
        "control" : "Home",
        "isRoot": true 
    }
```
## 单据路由
单据路由的type是billform
* formKey
* oid
* status

```javascript
 {
     "type": "billform",
     "formKey": "TSL_ToDoList",
     "oid": -1,
     "key": "TodoList",
     "status": "DEFAULT"
}
```
## Tab路由
Tab路由的type是tab
* tabPosition

  top或者是bottom，定义tab的位置
* tabs

  这个属性是一个路由的数组

```javascript
{
        "key": "TodoList",
        "type": "tab",
        "path": "TodoList",
        "tabPosition": "top",
        "isRoot": false,
        "tabs" : [
            {
                "type": "billform",
                "formKey": "TSL_ToDoList",
                "oid": -1,
                "key": "TodoList",
                "status": "DEFAULT"
            },{
                "type": "billform",
                "formKey": "TSL_RejectWF",
                "oid": -1,
                "key": "RejectWF",
                "status": "DEFAULT"
            },{
                "type": "billform",
                "formKey": "TSL_DoneWorkflow",
                "oid": -1,
                "key": "DoneWorkflow",
                "status": "DEFAULT"
            }
        ]
    },
```