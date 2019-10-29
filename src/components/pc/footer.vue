<template>
    <div class="footer_box">
        <div class="content">
            <div class="box">
                <div class="left_box">
                    <div class="title">
                        <span>联系我们</span>
                    </div>
                    
                    <p class="p1">免费提供定制方案与建议，欢迎现场参观考察。</p>
                    <p class="p2">咨询热线：13023232312</p>
                    <p class="p3">地址：杭州市滨江区世贸中心2601</p>
                </div>
                <div class="right_box">
                    <div class="input_box">
                        <el-input
                        v-model="name"
                        placeholder="姓名"
                        clearable>
                        </el-input>
                    </div>
                    <div class="input_box">
                        <el-input
                        v-model="phone"
                        placeholder="联系方式"
                        clearable>
                        </el-input>
                    </div>
                    <el-button type="primary" @click="Submission">确定</el-button>
                </div>
            </div>
            
            <p class="gs">Copyright © 2018-2019  杭州雾计算科技有限公司</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'',
            phone:''
        }
    },
    methods: {
        Submission(){
            if(this.name == ''){
                this.$message('请输入姓名');
            } else if(this.phone == ''){
                this.$message('请输入联系方式');
            } else {
                this.$post('/user/submitContact',{
                    phone:this.phone,
                    userName:this.name
                }).then((res) => {
                    if(res.status == 10000) {
                        this.$message('添加成功');
                    } else {
                        this.$message(res.data);
                    }
                })
            }
            
        }
        
    },
}
</script>

<style lang="scss" scoped>
    .footer_box{
        padding: 138px 0  42px 0;
        background: #043786;
        color: #fff;
        .content{
            .box{
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                .left_box{
                    display: flex;
                    flex-direction: column;
                    .title{
                        margin-bottom: 48px;
                        span{
                            font-size: 36px;
                            border-bottom: 2px solid #0464FC;
                        }
                    }
                    .p1{
                        font-size: 16px;
                        margin-bottom: 50px; 
                    }
                    .p2{
                        margin-bottom: 15px;
                    }
                }
                .right_box{
                    .input_box{
                        margin-bottom: 30px;
                    }
                }
            }
            .gs{
                text-align: center;
            }
        }
    }
</style>