<template>
    <div class="main_box">
        <Header @selectFun="scrollTo" :navIndex="tabIndex"/>
        <div class="main" id="scrollBox">
           
            <!-- 轮播 -->
            <div class="swipe_box loucen">
                <el-carousel indicator-position="none" :height="bannerHeight+'px'">
                    <el-carousel-item v-for="(item,index) in carouselImg" :key="index">
                    <img :src="item.img" ref="bannerHeight" @load="imgLoad" class="img_bg" alt="">
                    <!-- <div :style="{background:'url('+item.img+')'}" class="img_bg"></div> -->
                    </el-carousel-item>
                </el-carousel>
                 <!-- 登录按钮 -->
                <div class="login_btn" ref="postTop" @click="toLog">
                    {{btnText}}
                </div>
            </div>

            <!-- 流程服务 -->
            <div class="fw_box loucen" >
                <div class="content">
                    <img src="../../../assets/img/mian/index1.png" alt="">
                </div>
            </div>

            <!-- 应用方案 -->
            <div class="fa_box loucen"  >
                <div class="content">
                    <img src="../../../assets/img/mian/index2.png" alt="">
                </div>
            </div>

            <!-- 应用场景 -->
            <div class="cj_box loucen"  >
                <div class="content">
                    <img src="../../../assets/img/mian/index3.png" alt="">
                </div>
            </div>

            <!-- 安全防护 -->
            <div class="aq_box loucen" >
                <div class="content">
                    <img src="../../../assets/img/mian/index4.png" alt="">
                </div>
            </div>

            <!-- 关于我们 -->
            <div class="wm_box loucen"  >
                <div class="content">
                    <img src="../../../assets/img/mian/index5.png" alt="">
                </div>
            </div>

            <!-- 制作区块链 -->
            <div class="zz_qkl loucen">

            </div>
        </div>
    </div>
    
</template>

<script>
import Header from '@/components/pc/header'   // 头部

export default {
    name:'index',
    data() {
        return {
            tabIndex:0,   // 导航下标
            carouselImg:[
                {
                    img:require('../../../assets/img/banner/banner1.png')
                },
                {
                    img:require('../../../assets/img/banner/banner2.png')
                },
                {
                    img:require('../../../assets/img/banner/banner3.png')
                }
            ],
            token:'',
            bannerHeight:'',   // banner高度
            btnText:'登录查看定制方案'
        }
    },
    methods: {
        dataScroll () {   // 滚动页面
            const navContents= document.querySelectorAll('.loucen');
            const offsetTopArr = [];
            navContents.forEach(item => {
                offsetTopArr.push(item.offsetTop)
            })
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            let st = scrollTop;// + document.querySelector('.header_box').offsetHeight;
            let navIndex = 0;
            for(let i=0;i<offsetTopArr.length;i++){
                if(st >= offsetTopArr[i]){
                    navIndex = i;
                }
            }
            this.tabIndex = navIndex;
        },

        scrollTo(index){  // 点击导航
            const targetOffsetTop = document.querySelector(`.loucen:nth-child(${index+1})`).offsetTop;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            const STEP = 50;
            if(scrollTop > targetOffsetTop){
                // 往上滑
                smoothUp()
            } else {
                // 往下滑
                smoothDown()
            }
            function smoothDown(){   // 下滑函数
                if(scrollTop < targetOffsetTop){
                    // 如果和目标相差距离大于等于 STEP 就跳 STEP
                    // 否则直接跳到目标点，目标是为了防止跳过了。
                    if (targetOffsetTop - scrollTop >= STEP) {
                        scrollTop += STEP
                    } else {
                        scrollTop = targetOffsetTop
                    }
                    let st = scrollTop ;  // - document.querySelector('.header_box').offsetHeight
                    document.body.scrollTop = st;
                    document.documentElement.scrollTop = st;
                    // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
                    requestAnimationFrame(smoothDown)
                } 
            }

            function smoothUp(){    // 上滑函数
                if (scrollTop > targetOffsetTop) {
                    if (scrollTop - targetOffsetTop >= STEP) {
                        scrollTop -= STEP
                    } else {
                        scrollTop = targetOffsetTop
                    }
                    let st = scrollTop;  // - document.querySelector('.header_box').offsetHeight
                    document.body.scrollTop = st;
                    document.documentElement.scrollTop = st;
                    requestAnimationFrame(smoothUp)
                }
            }
        },

        toLog(){   // 登录
            if(this.token){
                this.$router.push({
                    name:'selProgramme'
                })
            } else {
                this.$router.push({
                    name:'login'
                })
            }
            
        },

        imgLoad() {    // 页面渲染完成加载方法，确保屏幕中的图片的高度第一次渲染到页面
            this.$nextTick(() => {
                this.bannerHeight = this.$refs.bannerHeight[0].height;
                this.$refs.postTop.style.top = this.bannerHeight / 2 + (this.$refs.postTop.offsetHeight * 2) + 'px'
            })
        }
    },
    mounted() {
        window.addEventListener('scroll', this.dataScroll, false);   // 监听页面滚动事件

        this.imgLoad();   // 增加监听事件，当窗口发生变化的时候，得到此时图片的高，赋值给bannerHeight
        window.addEventListener('resize', () => {
            this.bannerHeight = this.$refs.bannerHeight[0].height;
            this.$refs.postTop.style.top = this.bannerHeight / 2 + (this.$refs.postTop.offsetHeight * 2) + 'px'
            this.imgLoad()
        },false)
    },
    destroyed() {
        window.removeEventListener('scroll', this.dataScroll)
    },
    components:{
        Header,
    },
    created () {
        this.token = window.localStorage.token;
        this.btnText = this.token ? '查看定制方案' : '登录查看定制方案';
    },
    watch: {
    },
}
</script>

<style lang="scss" scoped>
.active{
        color: #ccc;
    }
    .main{
        width: 100%;
        position: relative;
        .swipe_box{
            width: 100%;
            text-align: center;
            position: relative;
            .login_btn{
                width: 184px;
                height: 57px;
                background: url('../../../assets/img/mian/login_btn.png') no-repeat;
                background-size: cover;
                position: absolute;
                left: 400px;
                // top: 300px;
                z-index: 9;
                cursor: pointer;
                font-size: 18px;
                text-align: center;
                line-height: 57px;
                color: #fff;
            }
            .img_bg{
                width: 100%;
                // height: inherit;
                // min-height: 686px;
                // min-width: 1400px;
                // height: 100%;
                // background-size: cover!important;
                // background-position:center center!important;
                // background-repeat: no-repeat!important;
            }
        }
        .fw_box,.fa_box,.cj_box,.aq_box{
            width: 100%;
            height: 700px;
            .content{
                height: 100%;
                text-align: center;
                img{
                    width: 1200px;
                    height: 100%;
                }
            }
        }
        .fw_box{  
            background: #164A9C;
        }
        .fa_box{
        }.cj_box{
        }.aq_box{
            background: #164A9C;
        }.wm_box{
            height: 2296px;
            background: #F1F2F3;
            .content{
                height: 100%;
                text-align: center;
                img{
                    width: 1200px;
                    height: 100%;
                }
            }
        }
        .zz_qkl{
            width: 100%;
            height: 4399px;
            background: url('../../../assets/img/mian/devBlockChain.jpeg') no-repeat;
            background-size: cover;
        }
    }
    
</style>