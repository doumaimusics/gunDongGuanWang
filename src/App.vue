<template>
    <div id="app">
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
import Footer from '@/components/pc/footer'  // 底部
export default {
    components: {
        Footer
    }
}
</script>

<style lang="scss">
#app {
    padding-top: 102px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
