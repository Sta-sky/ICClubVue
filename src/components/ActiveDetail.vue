<template lang="">
    <div class="detail_box">
        <div class='top_info'>
            <el-button type="primary" icon="el-icon-place" circle>
            </el-button>
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </div>
        <div class="bottom_info">
            <div class="left_info">
                <h1>{{info.subject}}</h1>
                <img :src="`${staticServer}/${info.act_img}`" alt="">
                <div class="tips_info">
                    <span>点赞数：{{info.click_nums}}</span>
                    <span>创建时间：{{info.created_time}}</span>
                </div>
            </div>
            <div class="right_info">
                <el-empty v-if="is_content" description="活动没有添加内容"></el-empty>
                <p>{{info.content}}</p>
                <textarea rows="5" cols="92"></textarea>
                <el-button type="primary" icon="el-icon-comment" ></el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {computed, onBeforeMount, reactive, toRefs} from 'vue'
    import axios from 'axios'
    import {staticServer, httpServer} from '../hook/util'
    import {useStore} from 'vuex'
    export default {
        name: 'ActiveDetail',
        setup() {
            const store = useStore()
            let activeInfo = reactive({
                info:{
                    id: '',
                    user_id: '',
                    subject: "",
                    updated_time: "",
                    click_nums: 0,
                    act_img: "",
                    content: "",
                    created_time: ""
                },
                is_content: computed(()=>{
                    let result = activeInfo.info.content? false:true
                    return result
                })
            })

            onBeforeMount(() => {
                let url = null
                if (store.state.active.drawerDetail.official){
                    url = `${httpServer}/v1/activitys/article_info?article_id=${store.state.active.drawerDetail.id}`
                }else{
                    url = `${httpServer}/v1/activitys/detail?act_id=${store.state.active.drawerDetail.id}`
                }
                axios.get(url).then(
                    response=>{
                        if (response.data.code===200){
                            activeInfo.info = response.data.data
                        }else{
                            alert(response.data.message)
                        }
                    },error=>{
                        alert('请求服务器出错，' , error.message)
                    }
                )
            })

            return {...toRefs(activeInfo), staticServer}
        }
    }
</script>
<style lang="css" scoped>
    .detail_box{
        display: flex;
        flex-direction: column;
    }

    .top_info{
        display: flex;
        flex-wrap: wrap;
        justify-content:flex-end;
    }

    .top_info>button{
        margin: 30px;
    }

    .bottom_info{
        display: flex; 
    }

    /* 左边格式  box shaow左 上 下  右 */
    .left_info{
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 300px;
        padding: 40px 40px 10px 10px;
        background-color: burlywood;
        box-shadow:
            -2px 0 10px -1px black,
            0 -2px 10px -1px black, 
            0 2px 10px -1px black, 
            2px 0 10px -1px black;
    }

    .left_info>img{
        width: 200px;
        height: 150px;
    }

    .tips_info{
        display: flex;
        justify-content: space-between;
    }


    /* 右边格式 */

    .right_info{ 
         box-shadow:inset 
        -1px 0px 5px white,
        0px -1px 5px white,
        0px 1px 5px white,
        1px 0px 5px white; 
    }


    .btn_comm{
        width: 68px;
        height: 35px;
        float: right;
        margin-right: 30px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
}
</style>