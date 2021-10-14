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
                <span>{{key}}</span><input :ref="setItemRef" :disabled='is_show' type="text" :value=value>
              </div>  
              <div class='btn'>
                <el-button @click='modifySelf' type="primary" icon="el-icon-edit" circle></el-button>
                <el-button @click='submitSelf' type="success" icon="el-icon-check" circle></el-button>
              </div>
          </div>
          <div class='fixeinfo'>
              <div class='oneInfo' v-for="(value, key, index) in flexinfo" >
                <h3>{{key}}   {{value}}</h3> 
              </div>  
          </div>
      </div >

      <div class='activeinfo'>
        <ul class='createAct'>我创建的活动
          <transition name='cardAct' appear>
            <li class='createCard'>
              
            </li>   
          </transition>

        </ul>
        <ul class='joinAct'>我参加的活动
          <transition name='userTagact' appear>
            <li class='joinCard'>

            </li>
          </transition>

        </ul>
      </div>

    </div>

</template>
<script>
  import {ref, reactive, toRefs, watch, nextTick} from 'vue'
  import {httpServer, staticServer} from '../hook/util'
  export default {
      name: 'UserInfo',
      setup(infos,test) {
        let inputValItem = []
        let selfInfo = reactive({
          is_show: 'disabled',
          modifyinfo: {
            "昵称":'jack',
            "生日":'2021-09',
            "城市":'成都',
            "性别":'男',
            "兴趣": '音乐'
          },
          is_self: true,
          flexinfo:{
            "等级":3,
            "喜欢":5,
            "创建活动":10,
            "参与活动":3
          },
          img_url: 'images/official/music.jpg'
        })

        const setItemRef = (el) => {
          if (el) inputValItem.push(el)
        }

        function modifySelf() {
          selfInfo.is_show = false
          for (let key in inputValItem){
              inputValItem[key].style.backgroundColor='#EEE0E5'
          }

        }

        function submitSelf(pars) {
          selfInfo.is_show = 'disabled'
          for (let key in inputValItem){
              inputValItem[key].style.backgroundColor='#BCD2EE'
          }
        }

        watch(()=>selfInfo.is_show, (newValue,oldValue)=>{
          
        })
        return {
          ...toRefs(selfInfo),
          modifySelf,
          submitSelf,
          setItemRef
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

}


div>input{
  text-align: center;
  font-size: 18px;
  border: 1px solid #BCD2EE;
  border-radius: 4px;
  background-color: #BCD2EE;
  padding: 4px 7px;
}

.btn{
  margin: 0 20px 10px 0;
  display: flex;
  justify-content: flex-end;
}


.oneInfo{
  margin: 20px 0 0 40px;
}

/* 可修改信息样式 结束 */



/* 不可修改信息 样式开始 */
.fixeinfo{
  background-color: #EEE8CD;
  width: 20vw;
  height: 30vh;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;

}

.flexKey{
  width: 100px;
}

.flexVal{
  width: 100px;

}

.userimg>img{
  margin-top:20px;
  width: 8vw;
  height: 15vh;
  border-radius: 100px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
}


/* 活动 样式开始 */

.activeinfo{
  background-color: wheat;
  display: flex;
  width: 50vw;
  min-height: 60vh;
  margin: 5vh 0 0 14vw;
  padding: 30px 0 0 1vw;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
}

ul{
  font-size: 28px;
  padding: 10px 0 0 1vw;
  width: 22vw;
  height: 30vh;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
}

.createAct{
  background-color: lightblue;
  margin-right: 5vw;

}

.joinAct{
  background-color: lightsalmon;

}


ul>li{
  margin: 10px 0 0 0 ;
  width: 20vw;
  height: 6vh;
  border-radius: 10px;
  border: solid #d6d6d6 1px;
  box-shadow: 10px 10px 20px #5d5f64;
}

.createCard{
  background-color: lightsteelblue;

}

.joinCard{
  background-color: lightslategray;

}

</style>