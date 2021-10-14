<template lang="">
    <el-carousel :interval="2000" type='card' arrow="always">
        <el-carousel-item style="background-color: white;" v-for="(item, index) in info" :key="index">
          <div class='official' @click="actDetail(item.article_id)">
            <div class='left'>
              <img :src="`${staticServer}/${item.act_img}`" alt="">
            </div>
            <div class='right'>
              <div class='content'>
                  <span>{{item.subject}}</span>
                  <p>{{item.content}}</p>
              </div>
              <div class='infos'>
                <span class='label'>{{item.label}}</span>
                <span class='hot'>热度：{{item.click_nums}}</span>
                <span class='times'>时间：{{item.updated_time}}</span>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
</template>
<script>
    import axios from 'axios'
    import {ref, onBeforeMount, toRefs, reactive, inject} from 'vue'
    import {httpServer, staticServer} from '../hook/util'
    import {useStore} from 'vuex'
    export default {
        name:'officialAct',
        setup() {
          const activeInfo = reactive({
            info: {}
          })
          const store = useStore()
          onBeforeMount(() => {
              let url = `${httpServer}/v1/activitys/article`
              axios.get(url).then(
                  response=>{
                      if (response.data.code===200){
                        console.log(response.data.data);
                        activeInfo.info = response.data.data
                      }else{
                          alert(response.message)
                      }
                  },error=>{
                      alert('请求服务器出错，' , error.message)
                  }
              )
          })

          let actDetail = (id) => store.commit('active/enterActDetail', [id, true])
          return {staticServer, ...toRefs(activeInfo), actDetail}
        }
    }
</script>
<style lang="css" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  
  .official{
    border-radius: 10px;
    background-color: #CCCCFF;
    display: flex;
    flex-direction: row;
    font-family: "Microsoft YaHei",SimSun,'\5b8b\4f53',sans-serif;
  }

  .left{
    flex: 2;
  }

  .right{
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "楷体","楷体_GB2312"; 

  }

  .right>:nth-child(1){
    margin-top: 10px;
  }

  .content>p{
    height: 260%;
    margin: 10px 20px 0px 20px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: "楷体","楷体_GB2312"; 
  }

  .content>span{
    display: block;
    text-align: center;
    font-size: 26px;
  }

  .infos{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    
  }

  .label{
      background-color: #6699ff;

  }
  .hot{
      background-color: #FF7F00;
  }
  .times{
      background-color: #CDC5EE;

  }

  .infos>span{
    padding: 0px 10px;
    color: white;
    text-align: center;
    border-radius: 20px;
    font-size: 15px;
    font-weight: bolder;
  }

  .left>img{
    width: 100%;
    height: 30vh;
    border-radius: 10px;
  }

</style>