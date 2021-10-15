import {Wssockte} from '../../hook/util' 


const state = () => ({
    drawerDetail: {
        dra_flag: false,
        id: null,
        official: false,
        scrollFlag: true,
        destroyFlag: true
    },
    activeInfo: []
})

// action
const actions = {
    updateActInfo(miniStore, parse){
        let page = parse[0]
        let tag = parse[1]
        let websock = null
        let webUrl = null
        if (tag){
            webUrl = `${Wssockte}/active/new/${page}?tag=${tag}`
        }else{
            webUrl = `${Wssockte}/active/new/${page}`
        }
        console.log(webUrl);
        websock = new WebSocket(webUrl)
        websock.onopen = () =>{}
        websock.onmessage = (mes)=>{
            let response = JSON.parse(mes.data)
            if (response.code === 200){
                miniStore.commit('UPDATEACTINFO', response.data)
            }else{
                alert(response.message)
            }
        }
    }


}

const mutations = {
    CLOSEDRAWER(state){
        state.drawerDetail.dra_flag = false
        console.log(state.drawerDetail.dra_flag);
    },

    enterActDetail(state, params){
        state.drawerDetail.official = params[1]
        state.drawerDetail.id = params[0]
        state.drawerDetail.dra_flag = true
        console.log(state.drawerDetail.dra_flag);
    },

    UPDATEACTINFO(state, actinfo){
        state.activeInfo = actinfo
    }
}


const getters = {

}

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters

}