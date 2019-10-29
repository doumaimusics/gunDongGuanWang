<template>
    <div class="top_box">
        <div class="content">
            <div class="log_box" @click="goIndex"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'pageTop',
    methods: {
        goIndex(){
            this.$router.push({
                name:'index'
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .top_box{
        width: 100%;
        height: 102px;
        background: #164A9C;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        .content{
            height: 100%;
            .log_box{
                width: 476px;
                height: 100%;
                background: url(../../assets/img/mian/logo.png) no-repeat;
                background-size: 100% 61px;
                background-position: center;
                margin-right: 30px;
                cursor: pointer;
            }
        }
    }
</style>