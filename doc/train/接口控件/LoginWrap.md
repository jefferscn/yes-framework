# 登录功能高阶函数

## 使用方法
    同ControlWrap

## 接口
```javascript
    render() {
        return (
            <WrappedComponent
                handleClickLogin={this.handleClickLogin}
                {...this.props}
            />
        );
    }
```
* handleClickLogin

    调用这个函数就可以完成默认的系统登录功能

    ```javascript
    handleClickLogin = (user, password, params, md) => { }
    ```

    1. user

        登录帐号
    2. password

        登录密码
    3. params

        登录参数
    4. md

        登录模式，1-PC, 2-Mobile