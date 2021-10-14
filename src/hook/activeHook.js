import axios from 'axios'
import { onBeforeMount } from "@vue/runtime-core"
import {reactive, ref} from 'vue'
import {httpServer, Wssockte} from './util'

var getTag = function(){
    const tagList = reactive({tag:[]}) 
    onBeforeMount(()=>{
        axios.get(`${httpServer}`+'/label/option').then(
            response=>{
                if (response.data.code===200){
                    tagList.tag = response.data.data
                }
            },error=>{
                alert('服务器请求兴趣列表出错了', error.message)
                tagList.tag = []
            }
        )
    })
    return tagList
}


var getActiv = function(tag) {
    let websock = null
    let webUrl = null
    if (tag){
        webUrl = `${Wssockte}` + "/active/new/1?tag="+ tag
    }else{
        webUrl = `${Wssockte}` + "/active/new/1"
    }
    console.log(webUrl);
    websock = new WebSocket(webUrl)
    websock.onopen = () =>{}
    websock.onmessage = (mes)=>{
        let response = JSON.parse(mes.data)
        if (response.code === 200){
            contentInfo.info = response.data 
        }else{
            alert(response.message)
        }
    }
    return contentInfo
}

export {getActiv, getTag}
