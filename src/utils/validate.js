// import { Message } from 'element-ui'
/* 昵称 */
export const nickName = (rule,value,callback) => {
    if(!value){
        return callback(new Error('请输入昵称'))
    }
}
/* 手机号验证*/
export const userMobile = (rule, value, callback) => {
    if(value == ''){
        callback(new Error('请输入手机号'));
    } else {
        const reg = /^1\d{10}$/i
        if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号'))
        } else {
            callback()
        }
    }
}

/* 验证码长度验证*/
export const code = (rule, value, callback) => {
    if (!value || value.length !== 4) {
        callback(new Error('请输入正确的验证码'))
    } else {
        callback()
    }
}