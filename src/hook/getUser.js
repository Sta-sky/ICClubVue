import {reactive, onBeforeMount} from 'vue'
import axios from 'axios'
import {httpServer, messageTip} from './util'


// 获取活跃用户列表
const getUser = () =>{
    let userInfo = reactive({'userinfo':[]})
    onBeforeMount(()=>{
        axios.get(`${httpServer}/v1/activitys/actvuser2`).then(
            response=>{
                if (response.data.code === 200){
                    userInfo.userinfo = response.data.data
                }else{
                    alert(response.data.message, ']]]]')
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


// 获取用户主页信息

const getUserIndex = (act_id) =>{
    let userInfo = reactive({
        is_show: 'disabled',
        modifyinfo: {
          "昵称":'jack',
          "生日":'2021-09',
          "城市":'成都',
          "性别":'男',
          "兴趣": '音乐',
          "签名": ''
        },
        is_self: true,
        flexinfo:{
          "等级":3,
          "喜欢":5,
          "登录天数": 1,
          "信誉": 100,
          "发起活动":10,
          "参加活动":3
        },
        img_url: 'images/official/music.jpg',
        create_act_info: [],
        join_act_info: []

    })
    onBeforeMount(() =>{
        let url = `${httpServer}/users/home?id=${act_id}`
        axios({
            url: url,
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ilx1Njc0ZVx1OTZlZlx1ODNmMiIsImV4cCI6MTYzNDcxOTExMC4yOTI3ODg3fQ.zEbWDHD3JoMmxhc8pnOCsJqPDQgWZ9kMjakb3wylRY0'
            }

        }).then(
            response=>{
                console.log(response.data);
                if (response.data.code === 200){
                    console.log(response.data);
                    let backData = response.data.data
                    userInfo.modifyinfo.昵称 = backData.user_info.nickname
                    userInfo.modifyinfo.签名 = backData.user_info.introduction
                    userInfo.modifyinfo.性别 = backData.user_info.gender
                    userInfo.modifyinfo.生日 = backData.user_info.birth
                    userInfo.modifyinfo.城市 = backData.user_info.city
                    userInfo.modifyinfo.兴趣 = backData.user_info.interest
                    userInfo.flexinfo.等级 = backData.user_info.level
                    userInfo.flexinfo.登录天数 = backData.user_info.logins_days
                    userInfo.flexinfo.信誉 = backData.user_info.credit
                    userInfo.flexinfo.喜欢 = backData.user_info.likes
                    userInfo.flexinfo.发起活动 = backData.user_info.sponson_num
                    userInfo.flexinfo.参加活动 = backData.user_info.participat_num
                    userInfo.is_self = backData.is_self
                    userInfo.img_url = backData.user_info.url
                    userInfo.create_act_info = backData.create_act_info
                    userInfo.join_act_info = backData.join_act_info
                }else if(response.data.code === 10201){
                    messageTip('warning', response.data.message)
                }else{
                    messageTip('warning', response.data.message)
                }
            },
            error=>{
                messageTip('error', response.data.message)
            }
        )
      })
      return userInfo
}





export {getUser, getUserIndex}
