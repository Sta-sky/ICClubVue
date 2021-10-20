<template lang="">
    <div class="act">
        <div class="title">
            <h1>最新活动</h1>
            <div class="search">
                <el-input
                    v-model="keyWord"
                    placeholder='请输入要搜索的内容'
                    class="input-with-select"
                >
                    <template #prepend>
                        <el-select 
                            v-model="select"
                            @change='selectTag'
                        >
                            <el-option 
                                v-for="item in tagList.tag"
                                :label="item" 
                                :value="item"  
                                :key="item"
                            ></el-option>
                        </el-select>
                    </template>
                    <template #append>
                        <el-button icon="el-icon-search">{{searchKey}}</el-button>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="actlist">
            <ul>
                <transition-group
                    name='cardAct'
                    appear
                >
                <el-empty v-if="have_active" description="没有创建过活动，快去创建吧！"></el-empty>
                    <li 
                        class="actCard"
                        v-for="items in contentInfo" 
                        :key="items.id"
                        @click="enterActDetail(items.id, items.title)"
                    >   
                        <img :src="`http://127.0.0.1:8080/api/static/${items.act_img}`" alt="">
                        <div class="conteneInfo">
                            <h2>{{items.title}}</h2>
                            <p>{{items.content}}</p>
                        </div>
                        <div class="detail">
                            <span class='label'>{{items.label}}</span>
                            <span class="hot">热度：{{items.click_num}}</span>
                            <span class="times">{{items.update_time}}</span>
                        </div>
                    </li>
                </transition-group>
            </ul>
        </div>
    </div>
    <el-drawer
        v-model=drawer
        direction="rtl"
        size='70%'
        :lock-scroll=scrollFlag
        :before-close="handleClose"
        :destroy-on-close=destroyFlag
    >
        <div>
            <ActiveDetail/>
        </div>
    </el-drawer>
</template>

<script>
    import axios from 'axios'
    import {ref, computed, provide, reactive, toRefs, onBeforeMount, onMounted} from 'vue'
    import {useRouter} from 'vue-router'
    import { getTag} from '../hook/activeHook'
    import ActiveDetail from './ActiveDetail' 
    import {useStore} from 'vuex'
    import { ElMessageBox } from 'element-plus'
    export default {
        name: 'actList',
        components: {ActiveDetail},
        setup() {
            const store = useStore()
            let tagList = getTag()
            const activeParams = reactive({
                keyWord: null,
                searchKey: '全局',
                select:null,
                have_active: computed(()=>{
                }),
                handleClose: (done)=>{
                    store.commit('active/CLOSEDRAWER')
                    done()
                },
                enterActDetail: (id) => {
                    store.commit('active/enterActDetail', [id, false])
                },
            })
            store.dispatch('active/updateActInfo', [1, null])
            function selectTag(params) {
                activeParams.searchKey = params 
            }
            
        return {
            ...toRefs(activeParams),
            tagList,
            drawer: computed(() => store.state.active.drawerDetail.dra_flag),
            contentInfo: computed(() => store.state.active.activeInfo),
            selectTag,
            ...toRefs(store.state.active.drawerDetail)
            }
        },
    }
</script>
<style lang="css" scoped>

    .act{
        display: flex;
        flex-direction: column;
    }

    .title{
        display: flex;
        margin:10px 10px;
        flex: 1;
        justify-content:space-between;
    }

    .title>h1{
        width: 10vw;
        margin: 20px 10px 0px 10px;
    }
    .search{
        margin-top: 50px;
        background-color: chartreuse;
        margin-right: 45px;
    }

    .actlist{
        margin-top: 10px;
        display: flex;
    }


    .actCard{
        border-radius: 10px;
        border: solid #f6efef 1px;
        margin: 40px 50px;
        height: 20vh;
        background-color: #f6efef;
        display: flex;
    }

    .actCard:hover{
        box-shadow: 0 -9px 5px -5px  rgba(255,255,255, 1) inset, /* dark shadow */
        2px -2px 3px 0px rgba(255,255,255, 1), /* white - top */
        2px 2px 3px 0px rgba(255,255,255, 1); /* white - bottom */

    }
 
    .actCard>img{
        width: 10vw;
        height: 15vh;
        flex: 1;
        margin: 20px 10px 0px 10px;
        transition: all 1.2s ease;
    }
    .actCard>img:hover{
        transform: scale(1.1);
    }

    .conteneInfo{
        flex: 5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 10px 10px;
        text-align: center;
    }

    .conteneInfo:nth-child(2){
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .conteneInfo>h2{
        color: #181818;
    }

    .detail{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }   

    .label{
        margin-top: 10px;
        background-color: #a180ca;

    }
    .hot{
        margin-top: 10px;
        background-color: #4fc4cf;
    }
    .times{
        margin-bottom: 10px;
        background-color: #fbdd74;

    }

    .detail>span{
        margin-right: 10px;
        padding: 0px 10px;
        height: 2.5vh;
        color: rgb(15, 61, 75);
        border-radius: 20px;
        font-size: 15px;
        font-weight: bolder;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* 为抽屉添加滚轮 */
    .el-drawer__body {
        overflow: auto;
    }
    
    /*2.隐藏滚动条，太丑了*/
    .el-drawer__container ::-webkit-scrollbar{
        display: none;
    }


</style>