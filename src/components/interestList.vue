<template lang="">
    <div class='box'>
        <h1>兴趣列表</h1>
        <ul>
            <transition-group name='userTagact' appear>
                <li @click=showTagActive(item) v-for="(item, index) in tagList.tag" :key="index">
                    <span>{{item}}</span>
                </li>
            </transition-group>
        </ul>
    </div>

</template>
<script>
import {getTag} from '../hook/activeHook'
import {useStore} from 'vuex'
export default {
    name:'interestList',
    setup() {
        let tagList = getTag()
        const store = useStore()        
        let showTagActive = (tag) => {
            store.dispatch('active/updateActInfo', [1, tag])
        }

        return {
            tagList,
            showTagActive,

        }
    }
}
</script>
<style lang="css" scoped>
    .box{
        border: solid #d6d6d6 1px;
        border-radius: 10px;
        box-shadow: 10px 10px 20px #5d5f64;
    }

    h1{
        margin: 20px 0px 20px 20px;
        color: rgb(95, 99, 102);
        font-size: 30px;
    }

    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-between;
    }

    li{
        width: 100px;
        height: 40px;
        margin: 10px 10px;
        background-color: #7fa0ff;
        margin-top: 10;
        border-radius: 10px;
        display:flex;
        flex-direction: row;
        justify-content: center;
 
    }
    li:hover {
        transform: scale(1.1);
    }

    li>span{
        font-weight: 600;
    }

    li>span:hover{
        color: yellow;
    }
    
</style>