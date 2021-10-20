<template lang="">

  <div class="name">
  <el-menu
    default-active="/index"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#232946"
    text-color="#b8c1ec"
    active-text-color="#fde24f"
    @select="handleSelect"
  >
    <el-menu-item index="/index">主页</el-menu-item>
    <el-menu-item index="/actCenter" >活动中心</el-menu-item>
    <el-menu-item index="/userinfo">个人中心</el-menu-item>
    <el-sub-menu index="">
      <template #title>活动管理</template>
      <el-menu-item index="/createact">创建活动</el-menu-item>
      <el-menu-item index="/myactive">我的活动</el-menu-item>
    </el-sub-menu>
  </el-menu>
  </div>
</template>
<script> 
    import {ref, getCurrentInstance, defineComponent} from 'vue'
    export default defineComponent({
        name: 'Header',
        setup() {
          const {proxy} = getCurrentInstance()
          const router =  proxy.$root.$router
          const handleSelect = (key, keyPath) => {
            if (keyPath[0] == '/userinfo'){
              router.push({path: keyPath[0], query: {id: 1}})
            }else{
              if (keyPath.length > 1){
                console.log(keyPath[1]);
                router.push(keyPath[1])
              }
              router.push(keyPath[0])
            }
          }
          return {
            handleSelect
          }
      }
    })
</script>
<style  scoped>
  .test{
    background-color: blanchedalmond;

  }

  .el-menu{
    color: blueviolet;
  }
  @media (min-device-width:600px) {
    img[src-600px] {
      content: attr(src-600px, url); 
          }
  }
  @media (min-device-width:800px) {
    img[src-800px] {
      content: attr(src-800px, url);    
      }
  }
</style>
