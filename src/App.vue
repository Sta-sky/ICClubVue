<template>
  <div id="all_box">
    <div id="box">
      <div id="header">
        <!-- 头部 -->
        <indexTop></indexTop>
      </div>
      <div id="box_mid">
          <router-view class="view"></router-view>
      </div>
    </div>
    <div>
      <IndexBto/>
    </div>
  
  </div>
  
</template>
<script>
  import indexTop from './components/indexTop'
  import IndexBto from './components/IndexBto'
  import Index from './components/index'
  import {ref, getCurrentInstance, defineComponent} from 'vue'
  export default defineComponent({
    name: 'App',
    components: {
      indexTop,
      IndexBto,
      Index
    },
    setup() {

    }
  })
</script>

<style>

  /* 样式的起手式 */

  html, body, td, th {
    margin: 0;
    padding:0;
    height: 100%;
    font-family: "楷体","楷体_GB2312"; 
  }

  *{
    margin: 0px;
    padding: 0px;
  }
  a{
    text-decoration: none;
  }

  ul{
    list-style: none;
  }
  
  li{
    list-style: none;
  }
  /* 样式的起手式  end*/


  #all_box{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
  }

  /* 弹性布局 */
  #box{
    display:flex;
    flex-direction: column;
    justify-content: space-between;
  }

  #box_mid{
    margin-left: 15vw;
  }  

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }

  /* 动画 */
  /* 主页卡片动画 */


  /* .cardAct-leave-to{
    display: none;
  } */

  .cardAct-enter-active {
      animation: cardMove 0.5s infinite;
  }
  .cardAct-leave-active {
      display:none;
      animation: cardMove 0.5s reverse;
  }

  @keyframes cardMove {
      from {
        transform: translateX(-50px);
      }
      to{
        display: none;

      }
  }

    /* 用户列表、 兴趣 动画 */
    .userTagact-enter-active {
        animation: userTagactMove 0.5s infinite; 
    }

    .userTagact-leave-active {
        display:none;
        animation: userTagactMove 0.5s reverse;
    }

    @keyframes userTagactMove {
        from {
          transform: translateX(100px);
        }
        to{
          display: none;
        }
    }

</style>
