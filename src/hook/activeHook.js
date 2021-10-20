import axios from 'axios'
import { onBeforeMount } from "@vue/runtime-core"
import {reactive, ref} from 'vue'
import {httpServer, Wssockte} from './util'

var getTag = ()=>{
    const tagList = reactive({tag:[]}) 
    onBeforeMount(()=>{
        axios.get(`${httpServer}`+'/label/option').then(
            response=>{
                if (response.data.code===200){
                    tagList.tag = response.data.data
                }
            },error=>{
                alert( error)
                tagList.tag = []
            }
        )
    })
    return tagList
}


export {getTag}
