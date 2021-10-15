<template lang="">
    <h1>活跃用户</h1>
    <ul class="usertList" >
        <transition-group name='userTagact' appear>
            <li 
                @click=insertUser(item.user_id)
                class="user_li"
                v-for="item in userinfo" :key="item.user_id"
                
            >
                <div class="img_user">
                <img  :src="`${staticServer}/${item.hd_pic}`" alt="">
                </div>
                <div class="user_info">
                    <div class="info_box">
                        <span>{{item.nickname}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <img 
                            class="sex_img"
                            :src="judgeSex(item.gender)" 
                            alt=""
                        >
                    </div>
                    <div>
                        <span>签名：{{item.sign_words}}</span>
                    </div>
                    <div class="part_spon_num">
                        <span>参与数：{{item.participate_num}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>发起数：{{item.sponsor_num}}</span>
                    </div>
                </div>
                <div class="sex_box"></div>
            </li>
        </transition-group>
    </ul>

</template>
<script>
    import {useRouter} from 'vue-router'
    import {toRefs} from 'vue'
    import {httpServer, staticServer} from '../hook/util'
    import {getUser} from '../hook/getUser'
    export default {
        name: 'userActivList',
        setup() {
            let userInfo = getUser()
            const router = useRouter()
            function judgeSex(gender){
                let imgs = ''
                if(gender==='男') {
                    imgs = 'boy.png'    
                }else{
                    imgs = 'girl.png'
                }
                return `${staticServer}/images/icon/${imgs}`
            }

            function insertUser(act_id) {
                router.push({path: '/userinfo', query: {id: act_id}})
            }
            return {...toRefs(userInfo), judgeSex, staticServer, insertUser}
        }
    }

</script>
<style lang="css" scoped>
    
    h1{
        margin: 20px 0px 50px 30px;
        color: rgb(95, 99, 102);
        font-size: 30px;
    }

    .user_li{
        width: 90%;
        margin-top: 20px;
        margin-bottom: 10px;
        margin-left: 15px;
        border-radius: 10px;
        border: solid #d6d6d6 1px;
        box-shadow: 10px 10px 20px #5d5f64;
        display: flex;
        flex-direction: row;
        justify-items: center;
    }

    .user_li:hover{
        box-shadow: 0 -9px 5px -5px rgba(255,255,255, 0.8) inset, /* dark shadow */
        2px -2px 3px 0px rgba(255,255,255, 1), /* white - top */
        2px 2px 3px 0px rgba(255,255,255, 1); /* white - bottom */
    }

    .user_info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
    }

    .img_user>img{
        width: 70px;
        height: 70px;
        border-radius: 50px;
    }


    .sex_img{
        width: 20px;
        height: 20px;
        border-radius: 50px;
    }


    .info_box{
        display: flex;
        justify-content: center;
    }

    .info_box>span{
        color: rgb(49, 61, 71);
        font-size: 18px;
    }

    .part_spon_num{
        display: flex;
        justify-content: center;
    }


</style>