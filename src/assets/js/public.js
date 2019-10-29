// 倒计时
function _sendCode(el,num){
    let timer = setInterval(() => {
        num --;
        el.innerHTML = num + '秒后重新获取';
        el.style.code = "#ccc";
        el.disabled = 'disabled';
        if(num === 0) {
            el.disabled = '';
            el.style.code = "#2858de";
            el.innerHTML = "获取手机验证码";
            clearInterval(timer)
        }
    },1000)
}

export default {
    sendCode:_sendCode   // 倒计时
}