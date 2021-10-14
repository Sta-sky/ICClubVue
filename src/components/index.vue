<template lang="">
    <div class="box_right">
      <div class="middle">
        <!-- 中部 -->
          <div class="mid_top">
            <!-- 中部上层 -->
            <officialAct/>
          </div>
            <!-- 中部下层 -->
          <div class="mid_bto">
      
              <!-- 中部下层左边 -->
            <div class="mid_bto_letf">
                <actList/>
            </div>
      
            <!-- 中部下层右边 -->
            <div class="mid_bto_right">
              <div class="mid_bto_right_top">
                <interestList/>
              </div>
              <div class="mid_bto_right_bto">
                <!-- 活跃用户列表 -->
                <userActivList/>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>

  import actList from './actList'
  import interestList from './interestList'
  import userActivList from './userActivList'
  import officialAct from './officialAct'
  import HotAct from './hotAct'


  export default {
    name: 'Index',
    components:{actList, interestList, userActivList, officialAct, HotAct}
  }
</script>
<style lang="css">


  /* 中间 开始*/
  .box_right{
    display: flex;
    flex-direction: column;
    width: 70vw;
  }

  .middle{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }

  .mid_bto{
    display: flex;
    /* background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#b083b6), to(#4fc2d1)); */
  }

  /* 中间左部布局 */
  .mid_bto_letf{
    flex: 3;
    margin-right: 10PX;
    border-radius: 10px;
    border: solid #d6d6d6 1px;
    box-shadow: 10px 10px 20px #5d5f64;
  }

  /*中间右部布局  */
  .mid_bto_right{
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  .mid_bto_right_top{
    flex: 1;
    margin-bottom: 10px;
    width: 13vw;
    border-radius: 10px;
  }

  .mid_bto_right_bto{
    flex: 3;
    width: 18vw;
    border-radius: 10px;
    border: solid #d6d6d6 1px;
    box-shadow: 10px 10px 20px #5d5f64;
  }



</style>