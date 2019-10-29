<template>
    <div class="login_box">
         <!-- 顶部 -->
        <page-top></page-top>
        <!-- banner -->
        <div class="banner_box"></div>
        <!-- 注册表单 -->
        <div class="login_from">
            <div class="content">
                <div class="title">
                   <span>注册</span>
                </div>
                <div class="from_box">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" :label-position="labelPosition">
                       
                        <el-form-item label="昵称" prop="nickName">
                            <el-input class="input" v-model="ruleForm.nickName" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="mobile">
                            <el-input class="input" v-model="ruleForm.mobile" ref="aaa" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="验证码" class="code-btn" prop="code">
                            <el-input class="input2" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
                            <el-button type="primary" class="code_btn" size="medium" @click="handleGetCode">获取验证码</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="btn_box"> 
                        <el-button type="primary" size="medium" @click="loginFun">登录/注册</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageTop from '@/components/pc/pageTop'
import * as valid from '@/utils/validate'
export default {
    name:'login',
    data() {
        return {
            labelPosition: 'right',
            ruleForm: {
                nickName: '',
                mobile:'',
                code:'',
            },
            rules: {
                nickName:[
                    { required: true, trigger: 'blur', validator:valid.nickName }
                ],
                mobile:[
                    { required: true, trigger: 'blur', validator: valid.userMobile}
                ],
                code:[
                    { required: true, trigger: 'blur', validator:valid.code}
                ]
            },
        }
    },
    methods: {
        handleGetCode(){   // 获取验证码
            let p1 = new Promise((resolve, reject) => {
                this.$refs.ruleForm.validateField('nickName',(validMessage)=>{
                    if(validMessage){ 
                        resolve();
                    } else {
                        reject()
                    }
                })
            })

            let p2 = new Promise((resolve, reject) => {
                this.$refs.ruleForm.validateField('mobile',(validMessage) => {
                    if(validMessage) {
                        resolve();
                    } else {
                        reject()
                    }
                })
            })
            Promise.all([p2,p1]).then(() => {
                console.log("没有输入")
            }).catch(()=>{
                console.log("请求获取验证码接口");
                this.getCode()
            })
        },
        getCode(){   // 获取验证码接口
            this.$post("/user/sendCode",{
                phone:this.ruleForm.mobile
            }).then((res)=>{
                if(res.status == 10000){
                     this.$message('发送成功');
                    let elem = document.querySelector('.code_btn');
                    this.$publicFun.sendCode(elem,60);
                } else {
                     this.$message(res.data);
                }
            })
        },
        loginFun(){    // 登录注册
            this.$post("/user/login",{
                phone:this.ruleForm.mobile,
                code:this.ruleForm.code,
                userName:this.ruleForm.nickName
            }).then((res) => {
                if(res.status == 10000){
                    this.$store.commit('$_setStorage',{user:this.ruleForm.mobile});
                    this.$store.commit('$_setToken',res.data.token);
                    this.$store.commit('$_setNickName', res.data.userName);
                    this.$store.commit('$_setMobile', res.data.mobile);
                    this.$message('登录成功');
                    this.$router.push({
                        name:'index'
                    })
                } else {
                    this.$message(res.data);
                }
            })
        }
    },
    created () {
       
    },
    components:{
        PageTop
    }
}
</script>

<style >
    .el-form-item__label{
        color: #fff;
    }
</style>
<style lang="scss" scoped>

    .login_box{
        .banner_box{
            width: 100%;
            height: 202px;
            background: url(../../../assets/img/mian/banner4.png) no-repeat;
            background-size: cover;
        }
        .login_from{
            width: 100%;
            height: 1651px;
            background: url(../../../assets/img/mian/login_bg.png) no-repeat;
            background-size: cover;
            .content{
                padding-top: 106px;
                .title{
                    text-align: center;
                    color: #fff;
                    font-size: 36px;
                    margin-bottom: 53px;
                    span{
                        padding-bottom: 15px;
                         border-bottom: 1px solid #0464FC;
                    }
                }
                .from_box{
                    width: 600px;
                    margin: 0 auto;
                    
                    .input{
                        width: 395px;
                    }
                    .input2{
                        width: 211px;
                    }
                    .code_btn{
                        width: 162px;
                        padding: 12px 20px;
                        margin-left: 20px;
                        background: #0474FC;
                        border: none;
                    }
                }
                .btn_box{
                    margin-top: 51px;
                    text-align: center;
                    button{
                        width: 255px;
                        height: 53px;
                        border:none;
                         background: #0474FC;
                    }
                }
            }
        }
    }
</style>