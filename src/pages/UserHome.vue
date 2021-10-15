<template lang="">
    <div class='box'>
      <div class='selfinfo'>
        <transition name='cardAct' appear>
          <div class='userimg'>
            <img :src="`http://127.0.0.1:8080/api/static/${img_url}`" alt="">
          </div>
        </transition>

          <div class='modifyself'>
              <div class='oneInfo' v-for="(value, key, index) in modifyinfo" >
                <span>{{key}}</span>
                <input :ref="setItemRef" :disabled='is_show' type="text" :value=value>
              </div>  
              <div class='btn'>
                <el-button @click='modifySelf' type="primary" icon="el-icon-edit" circle></el-button>
                <el-button @click='submitSelf' type="success" icon="el-icon-check" circle></el-button>
              </div>
          </div>
          <div class='fixeinfo'>
              <div class='oneInfo' v-for="(value, key, index) in flexinfo" >
                <h4>{{key}}</h4> 
                <span class='spanVal' >{{value}}</span> 
              </div>  
          </div>
      </div >

      <div class='activeinfo'>
        <div>
          <h2>我发起的活动</h2>
          <ul class='createAct'>
            <transition-group name='cardAct' appear>
            <el-empty v-if="create_list" description="没有创建过活动，快去创建吧！"></el-empty>
              <li @click=detailAct(item.act_id) class='createCard' v-for="(item, index) in create_act_info" :key="index">
                <div @click.stop=getDetail(item.act_id)>
                  <el-popover 
                    placement="right"
                    :width="550"
                    trigger="focus"
                  >
                    <template #reference>
                      <el-button circle type='primary' >{{item.tag}}</el-button>
                    </template>
                    <div class='tipDetail'>
                      <h3>{{data.subject}}</h3>
                      <span>{{data.content}}</span>
                      <div class=tip>
                        <div class='tip-time'>
                          <span>开始时间：{{data.starttime}}</span>
                          <span>创建时间：{{data.created_time}}</span>
                        </div>
                        <div class='tip-num'>
                          <span>热度：{{data.click_num}}</span>
                          <span>喜欢：{{data.like}}</span>
                        </div>
                      </div>
                    </div>
                  </el-popover>
                </div>
                <div>
                  <sub>{{item.subject}}</sub>
                </div>
                <div class='like-time'>
                  <span>{{item.click_num}}</span>
                  <span>{{item.update_time}}</span>
                </div>
              </li>   
            </transition-group>
          </ul>
        </div>
        <div>
          <h2>我参加的活动</h2>
          <ul class='joinAct'>
            <transition-group name='userTagact' appear>
              <el-empty v-if="join_list" description="没有参加过活动，快去参加吧！"></el-empty>
              <li @click=detailAct(item.act_id) class='joinCard' v-for="(item, index) in create_act_info" :key="index">
                <div @click.stop=getDetail(item.act_id)>
                  <el-popover 
                  
                    placement="right"
                    :width="550"
                    trigger="focus"
                  >
                    <template #reference>
                      <el-button circle type='warning'>{{item.tag}}</el-button>
                    </template>
                    <div class='tipDetail'>
                      <h3>{{data.subject}}</h3>
                      <span>{{data.content}}</span>
                      <div class=tip>
                        <div class='tip-time'>
                          <span>开始时间：{{data.starttime}}</span>
                          <span>创建时间：{{data.created_time}}</span>
                        </div>
                        <div class='tip-num'>
                          <span>热度：{{data.click_num}}</span>
                          <span>喜欢：{{data.like}}</span>
                        </div>
                      </div>
                    </div>
                  </el-popover>
                </div>
                <div>
                  <sub>{{item.subject}}</sub>
                </div>
                <div class='like-time'>
                  <span>{{item.click_num}}</span>
                  <span>{{item.update_time}}</span>
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
    </div>

</template>
<script>
  import axios from 'axios' 
  import { reactive, toRefs, computed, watch} from 'vue'
  import {httpServer, staticServer} from '../hook/util'
  import {useStore} from 'vuex'
  import {useRoute} from 'vue-router'
  import { getUserIndex } from '../hook/getUser'
  import ActiveDetail from '../components/ActiveDetail'
  export default {
      name: 'UserInfo',
      components: {ActiveDetail},
      setup() {
        let detailInfo = reactive({
          data: {
            subject: null,
            content: null,
            starttime: null,
            created_time: null,
            click_num: null,
            like: null
          },
          create_list: computed(()=>{
            let result =  getInfo.create_act_info.length? false:true 
            return result
          }),
          join_list: computed(()=>{
            let result =  getInfo.join_act_info.length? false:true 
            return result
          }),

        })

        let store = useStore()
        let inputValItem = []
        let actId = useRoute().query.id
        let getInfo = getUserIndex(actId)

        // ref标记多个节点 
        const setItemRef = (el) => {
          if (el) inputValItem.push(el)
        }

        const handleClose = (done) => {
              store.commit('active/CLOSEDRAWER')
              done()
        }

        // 获取活动详情
        function getDetail(act_id){
          var url = `${httpServer}/v1/activitys/detail?act_id=${act_id}`
          axios.get(url).then(
              response=>{
                  if (response.data.code===200){
                    detailInfo.data = response.data.data
                  }else{
                      alert(response.data.message)
                  }
              },error=>{
                  alert('请求服务器出错，' , error.message)
              }
          )
        }

        // 进入活动详情
        function detailAct(act_id){
          store.commit('active/enterActDetail', [act_id, false])
        }
        
        // 修改个人信息
        function modifySelf() {
          getInfo.is_show = false
          for (let key in inputValItem){
              inputValItem[key].style.backgroundColor='#EEE0E5'
          }
        }

        // 提交信息
        function submitSelf() {
          getInfo.is_show = 'disabled'
          for (let key in inputValItem){
              inputValItem[key].style.backgroundColor='#BCD2EE'
          }
        }

        return {
          ...toRefs(getInfo),
          modifySelf,
          submitSelf,
          setItemRef,
          getDetail,
          ...toRefs(detailInfo),
          detailAct,
          handleClose,
          drawer: computed(() => store.state.active.drawerDetail.dra_flag),
          ...toRefs(store.state.active.drawerDetail)
        }
      }
  }
</script>
<style lang="css" scoped>

.box{
  background-color: #F8F8FF;
  margin: 50px 0 0 0;
  padding: 50px 0 0 0 ;
  width: 70vw;
  height: 100vh;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 20px -10px 20px #5d5f64;
  
}

.selfinfo{
  display: flex;
  margin-left: 2vw;
}

/* 用户头像 */
.userimg>img{
  margin-top:20px;
  width: 8vw;
  height: 15vh;
  border-radius: 100px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
  transition: all 1s;
}

.userimg>img:hover{
  transform: scale(1.1);
}

/* 可修改信息样式 */
.modifyself{
  width: 20vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.5rem;
  background-color: #BCD2EE;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
  margin: 0 10vw 0 5vw;
  font-family: "楷体","楷体_GB2312"; 

}


div>input{
  display: inline-block;
  width: 10vw;
  text-align: center;
  font-size: 18px;
  border: 1px solid #BCD2EE;
  border-radius: 4px;
  background-color: #BCD2EE;
  padding: 4px 7px;
  font-family: "楷体","楷体_GB2312"; 

}

.btn{
  margin: 0 20px 10px 0;
  display: flex;
  justify-content: flex-end;
}


.oneInfo{
  margin: 10px 0 0 40px;
}

.fixeinfo>.oneInfo{
  background-color: rgb(219, 215, 210);
  border-radius: 10px;
  width: 15vw;
  padding: 0 0 0 2vw;
}

/* 可修改信息样式 结束 */



/* 不可修改信息 样式开始 */
.fixeinfo{
  background-color: #93e5e5;
  width: 20vw;
  height: 30vh;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
  font-family: "楷体","楷体_GB2312"; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.oneInfo:last-child{
  margin-bottom: 10px;
}

h4{
  width: 5vw;
  display: inline-block;
}

.spanVal{
  font-size: 18px;
  color: rgb(51, 110, 238);
}




/* 活动 样式开始 */
.activeinfo{
  /* background-color: wheat; */
  display: flex;
  width: 50vw;
  min-height: 60vh;
  margin: 5vh 0 0vh 14vw;
  padding: 30px 0 0 1vw;

}

ul{
  font-size: 28px;
  padding: 10px 0 0 1vw;
  width: 23vw;
  height: 52vh;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
  margin-bottom: 2vh;
  overflow:auto;
  font-family: "楷体","楷体_GB2312"; 
}

.activeinfo>div>h2{
  width: 24vw;
  padding-bottom: 1vh;
  margin-bottom: 15px;
  font-weight: 700;
  color: #918db4;
  transition: all 1.2s;
  border-bottom: solid black 1px;
}

.activeinfo>div>h2:hover{
  transform: scale(1.1);
}

.activeinfo>div>ul>li{
  transition: all 0.5s;
}
.activeinfo>div>ul>li:hover{
  transform: scale(1.1);
}


.createAct{
  margin-right: 4vw;

}

.createCard, .joinCard{
  background-color: lightsteelblue;
  margin: 10px 0 0 0 ;
  width: 20vw;
  height: 4vh;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
}

.createCard>div:nth-child(1):hover, .joinCard>div:nth-child(1):hover{
  color: #d0ee29;
  transform: scale(1.1);
}

.createCard>div:nth-child(1), .joinCard>div:nth-child(1){
  color: green;
}


.createCard>div:nth-child(3), .joinCard>div:nth-child(3){
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 15px;
  color: yellow;
  justify-content: space-between;
  align-items: flex-end;
}
/* 创建活动样式结束 */


/* 参加活动  样式开始 */
.joinCard{
  background-color: rgb(144, 165, 185);

}

/* 弹窗详情 */
.tipDetail{
  padding: 1vh 1vw 0 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "楷体","楷体_GB2312"; 
}

.tip{
  margin-top: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tipDetail>span{
  font-size: 1.2rem;
}

.tipDetail>h3{
  font-size: 2rem;
  margin-bottom: 2vh;
}

.tip span{
  color: #545658;

}

.tip-time>span, .tip-num>span{
  margin-right: 1vw;
}

/*定义滚动条样式（高宽及背景）*/
::-webkit-scrollbar {
  width: 6px; /* 滚动条宽度， width：对应竖滚动条的宽度 height：对应横滚动条的高度*/
  background: #cdd4d8;
}

/*定义滚动条轨道（凹槽）样式*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(243, 14, 14, 0.3); /* 较少使用 */
  border-radius: 10px;
}

/*定义滑块 样式*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  height: 100px; /* 滚动条滑块长度 */
  background-color: rgb(218, 108, 108);
}
</style>