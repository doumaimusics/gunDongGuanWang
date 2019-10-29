<template>
    <div class="sel_box">
        <!-- 顶部 -->
        <page-top></page-top>
        <!-- banner -->
        <div class="banner_box"></div>
        <!-- 中间内容 -->
        <div class="select_content_box">
            <div class="content">
                <div class="title_box">
                    <div class="text">
                        选择定制方案
                    </div>
                    <div class="p1">自由组合，满足不同的运营需求;<br>资深开发人员，完善的服务保障。
                    </div>
                </div>
                <!-- 选择模式 -->
                <div class="selet_box">
                    <div class="title">选择模式</div>
                     <el-table ref="multipleTable" 
                     :data="formArr1" 
                     tooltip-effect="dark" 
                     :show-header="false" 
                     style="width: 100%"
                     @selection-change="handleSelectionChange1">
                        <el-table-column width="120">
                            <template slot-scope="scope">{{ scope.row.modeName }}</template>
                        </el-table-column>
                        <el-table-column  width="500">
                            <template slot-scope="scope" >
                                <div class="text">{{ scope.row.modeDesc }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column  width="100">
                            <template slot-scope="scope">¥ {{ scope.row.price }}</template>
                        </el-table-column>
                        <el-table-column type="selection" width="55"></el-table-column>
                    </el-table>
                </div>

                <!-- 选择公链 -->
                <div class="selet_box">
                    <div class="title">选择公链</div>
                    <el-table ref="multipleTable" 
                     :data="formArr2" 
                     tooltip-effect="dark"  
                     style="width: 100%"
                     :show-header="false"
                     @selection-change="handleSelectionChange2">
                        <el-table-column  width="120">
                            <template slot-scope="scope">{{ scope.row.chainName }}</template>
                        </el-table-column>
                        <el-table-column  width="600" >
                            <template slot-scope="scope" >¥ {{ scope.row.price }}</template>
                        </el-table-column>
                        <el-table-column type="selection" width="55"></el-table-column>
                    </el-table>
                </div>

                <!-- 选择应用 -->
                <div class="selet_box">
                    <div class="title">选择应用</div>
                    <el-table ref="multipleTable" 
                     :data="formArr3" 
                     tooltip-effect="dark"  
                     style="width: 100%"
                     :show-header="false"
                     @selection-change="handleSelectionChange3">
                        <el-table-column label="日期" width="120">
                            <template slot-scope="scope">{{ scope.row.applicationName }}</template>
                        </el-table-column>
                        <el-table-column label="日期" width="600">
                            <template slot-scope="scope">¥ {{ scope.row.price }}</template>
                        </el-table-column>
                        <el-table-column type="selection" width="55"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <!-- 右侧固定,展示结果 -->
        <div class="shou_box">
            <div class="title">合计 ¥ {{count }}</div>
            <div class="list">
                <h3>功能及价格</h3>
                <ul>
                    <li>
                        <div>模式</div>
                        <div> ¥ {{ result1}} </div>
                    </li>
                    <li>
                        <div>公链</div>
                        <div> ¥ {{result2}} </div>
                    </li>
                    <li>
                        <div>应用</div>
                        <div> ¥ {{result3}} </div>
                    </li>
                </ul>
            </div>
            <div class="btn_box">
                <el-button type="primary" round @click="smubsFun">具体定制方案请咨询</el-button>
            </div>
            
        </div>
    </div>
</template>

<script>
import PageTop from '@/components/pc/pageTop'
export default {
    data() {
        return {
            formArr1:[],    // 选择模式的数据
            formArr2:[],    // 选择公链的数据
            formArr3:[],    // 选择应用的数据

            checkList1:[],  //模式id
            checkList2:[],  //公链id
            checkList3:[],  //应用id

            priceList1:[],  // 模式价格
            priceList2:[],  // 公链价格
            priceList3:[],  // 应用价格
            top:false
        }
    },
    computed: {
       
        result1(){     // 选择模式计算结果
            var a = 0;
            for (let i = 0; i < this.priceList1.length; i++) {
                a += this.priceList1[i];
            }
            return a;    
        },
        result2(){     // 选择公链计算结果
            var a = 0;
            for (let i = 0; i < this.priceList2.length; i++) {
                a += this.priceList2[i];
            }
            return a; 
        },
        result3(){     // 选择应用计算结果
            var a = 0;
            for (let i = 0; i < this.priceList3.length; i++) {
                a += this.priceList3[i];
            }
            return a; 
        },
        count(){    // 三个加起来的结果
            return this.result1 + this.result2 + this.result3
        }
    },
    methods: {
        handleSelectionChange1(val){    // 选择模式id和价格
            let arrId = [];   // id
            let arrPrice = [];  // 价格
            val.forEach(item=>{
                arrId.push(item.modeId);
                arrPrice.push(item.price)
            })
            this.checkList1 = arrId;
            this.priceList1 = arrPrice;
        },
        handleSelectionChange2(val){    // 选择公链id和价格
            let arrId = [];   // id
            let arrPrice = [];  // 价格
            val.forEach(item=>{
                arrId.push(item.chainId);
                arrPrice.push(item.price)
            })
            this.checkList2 = arrId;
            this.priceList2 = arrPrice;
        },
        handleSelectionChange3(val){    // 选择应用id和价格
            let arrId = [];   // id
            let arrPrice = [];  // 价格
            val.forEach(item=>{
                arrId.push(item.applicationId);
                arrPrice.push(item.price)
            })
            this.checkList3 = arrId;
            this.priceList3 = arrPrice;
        },
        getList(){   // 获取列表
            this.$post('/user/getProgram').then((res) => {
                if(res.status == 10000){
                    this.formArr1 = res.data.modes;
                    this.formArr2 = res.data.chains;
                    this.formArr3 = res.data.applications;
                } else {
                    this.$message(res.data);
                }
            })
        },
        smubsFun(){   // 点提交
            if (this.checkList1 == '' && this.checkList2 == '' && this.checkList3 == ''){
                this.$message({
                            message:'请选择定制方案',
                            offset:200
                        });
            } else {
                this.$post('/user/submit',{
                    modes:this.checkList1,
                    chains:this.checkList2,
                    applications:this.checkList3
                }).then((res) => {
                    if(res.status == 10000){
                        this.$message({
                            message:'您的方案已提交，客服人员将稍后与您联系。',
                            offset:200
                        });
                        this.getList()
                    } else {
                        this.$message(res.data);
                    }
                })
            }
        }
    },
    mounted() {
        
    },
    created () {
        this.getList()
    },
    components: {
        PageTop
    }
}
</script>

<style>
    
</style>
<style lang="less" scoped>
    .sel_box{
        width: 100%;
        .banner_box{
            width: 100%;
            height: 202px;
            background: url(../../../assets/img/mian/banner4.png) no-repeat;
            background-size: 100% 202px;
        }
        .select_content_box{
            width: 100%;
            background:url(../../../assets/img/mian/bg.png) no-repeat;
            background-size: cover;
            padding: 48px 0;
            .content{
                .title_box{
                    color: #fff;
                    display: flex;
                    margin-bottom: 40px;
                    .text{
                        font-size: 18px;
                        padding-bottom: 7px;
                        border-bottom: 2px solid red;  
                        margin-right: 15px;
                    }
                    .p1{
                        font-size: 12px;
                        // transform: scale(0.90);
                        // transform-origin:0 0;

                        // -ms-transform: scale(0.90);         /* IE 9 */
                        // -ms-transform-origin:0 0;       /* IE 9 */

                        // -webkit-transform: scale(0.90); /* Safari 和 Chrome */
                        // -webkit-transform-origin:0 0;   /* Safari 和 Chrome */

                        // -moz-transform: scale(0.90);        /* Firefox */
                        // -moz-transform-origin:0 0;      /* Firefox */

                        // -o-transform: scale(0.90);      /* Opera */
                        // -o-transform-origin:0 0;        /* Opera */
                    }
                }
                .selet_box{
                    width: 100%;
                    margin-bottom: 16px;
                    background: #1965DD;
                    padding: 20px 300px 20px 85px;
                    color: #fff;
                    .title{
                        font-size: 24px;
                        margin-bottom: 13px;
                    }
                    /deep/ .el-table__body-wrapper{
                        background: #1965dd;
                        color: #fff;
                    }
                    /deep/ .el-table tr{
                        background: #1965dd;
                        border: none;
                    }
                    /deep/ .el-table td, /deep/ .el-table th.is-leaf{
                        border:none;
                    }
                    /deep/ .el-table__body tr:hover>td{
                        background: transparent;
                    }
                    /deep/ .el-table::before{
                        height: 0;
                    }
                    /deep/ .el-table .cell{
                        text-align: right;
                    }
                    /deep/ .el-table .cell .text{
                        text-align: left;
                    }
                }
            }
        }
        .shou_box{
            width: 300px;
            background: #fff;
            position: fixed;
            right: 0px;
            top: 200px;
            border-radius: 4px;
            padding-bottom: 20px;
            z-index: 10;
            .title{
                width: 100%;
                height: 60px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                background: #0474FC;
                text-align: center;
                line-height: 60px;
                color: #fff;
            }
            .list{
                color: #4D4D4D;
                padding: 11px 13px;
                h3{
                    font-size:12px;
                    margin-bottom: 30px;
                }
                ul{
                    li{
                        padding: 0 22px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        margin-bottom: 18px;
                    }
                }
            }
            .btn_box{
                text-align: center;
            }
        }
    }
</style>