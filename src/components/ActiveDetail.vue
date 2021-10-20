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
                <div>
                    <img :src="`${staticServer}/${info.act_img}`" alt="">
                </div>
                <div class="tips_info">
                    <span>点赞数：{{info.click_nums}}</span>
                    <span>创建时间：{{info.created_time}}</span>
                </div>
            </div>
            <div class="right_info">
                <el-empty v-if="is_content" description="活动没有添加内容"></el-empty>
                <p>{{info.content}}</p>
                <textarea rows="5"></textarea>
                <el-button type="primary" icon="el-icon-comment" >提交</el-button>
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
        background-color: #f9f4ef;
        padding: 10vh 3vw 10vh 3vw;
    }

    .top_info{
        display: flex;
        flex-wrap: wrap;
        justify-content:flex-end;
    }

    .bottom_info{
        display: flex; 
        justify-content: space-between;
    }

    /* 左边格式  box shaow左 上 下  右 */
    .left_info{
        margin-top: 5vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 40vh;
        background-color: #eaddcf;
        padding: 2vh 2vw 2vh 2vw;
        box-shadow:
            -2px 0 10px -1px black,
            0 -2px 10px -1px black, 
            0 2px 10px -1px black, 
            2px 0 10px -1px black;
    }


    .left_info>div>img{
        width: 15vw;
        height: 25vh;
    }

    .tips_info{
        display: flex;
        justify-content:space-around;
    }


    /* 右边格式 */
    .right_info{ 
        background-color:  #eff0f3;
        margin-top: 5vh;
        width:35vw;
        padding: 5vh 3vw 5vh 3vw;
         box-shadow:inset 
        -1px 0px 5px white,
        0px -1px 5px white,
        0px 1px 5px white,
        1px 0px 5px white; 
        margin-left: 3vw;
    }

    .right_info>p{
        border-radius: 10px;
        margin: 0 0 5vh 0;
        color: #2a2a2a;
    }

    .right_info>textarea{
        width:35vw;
        display: block;
        margin-bottom:2vh ;
    }

    .right_info>button{
        float: right;
    }
    .btn_comm{
        width: 68px;
        height: 35px;
        float: right;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
}
</style>