import {reactive, onBeforeMount} from 'vue'
import axios from 'axios'
import {httpServer} from './util'

export default function(){
    let userInfo = reactive({'userinfo':[]})
    onBeforeMount(()=>{
        axios.get(`${httpServer}/v1/activitys/actvuser2`).then(
            response=>{
                if (response.data.code === 200){
                    userInfo.userinfo = response.data.data
                }else{
                    alert(response.data.message)
                    return userInfo.userinfo = []
                }
            },
            error=>{
                console.log('请求出错啦', error.message)
                return userInfo.userinfo = []
            }
        )
    })
    return userInfo
}