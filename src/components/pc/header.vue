<template>
    <div class="header_box">
        <div class="content">
            <!-- 左边 -->
            <div class="log_box">

            </div>
            <!-- 右边 -->
            <div class="nav_box">
                <ul id="ul">
                    <li v-for="(item,index) in navList" :key="item.id" :class="{active:selTab == index}" @click="tabFun(index)">{{item.text}}</li>
                    <li @click="goSelPage">定制方案</li>
                </ul>
            </div>            
        </div>
    </div>
</template>

<script>
export default {
    props:['navIndex'],
    data(){
        return{
            selTab:this.navIndex,
            navList:[
                {
                    text:'首页',
                    id:1
                },
                {
                    text:'服务流程',
                    id:2
                },
                {
                    text:'应用方案',
                    id:3
                },
                {
                    text:'产品演示',
                    id:4
                },
                {
                    text:'安全防护',
                    id:5
                },
                {
                    text:'关于我们',
                    id:6
                },
                {
                    text:'区块链开发',
                    id:7
                },
            ],
        }
    },
    methods: {
        tabFun(i){   // 滚动导航
            this.selTab = i;
            this.$emit('selectFun',i);
        },
        goSelPage(){   // 跳转定制方案
            let token =window.localStorage.token;
            if(token === 'null' || token === '' || token === undefined){
                this.$router.push({
                    name:'login'
                })
            } else {
                this.$router.push({
                    name:'selProgramme'
                })
            }
            
        }
    },
    watch: {
        navIndex(val){
            this.selTab = val
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
    .header_box{
        width: 100%;
        height: 102px;
        background: #164A9C;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        .content{
            display: flex;
            height: 100%;
            // background: #f90;
            .log_box{
                width: 476px;
                height: 100%;
                background: url(../../assets/img/mian/logo.png) no-repeat;
                background-size: 100% 61px;
                margin-right: 30px;
                background-position:center; 
                cursor: pointer;
            }
            .nav_box{
                height: 100%;
                // background: red;
                ul{
                    display: flex;
                    li{
                        line-height: 102px;
                        font-size: 14px;
                        color: #ccc;
                        padding: 0 10px;
                        cursor: pointer;
                    }
                    .active{
                        border-bottom:2px solid #fff; 
                        color: #fff;
                    }
                }
            }
        }
    }
</style>