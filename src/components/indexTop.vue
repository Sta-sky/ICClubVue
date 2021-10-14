<template lang="">
  <div class="name">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="/index"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @select='handleSelect'
    >
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <template #title>主页</template>
      </el-menu-item>

      <el-sub-menu index="">
        <template #title>
          <i class="el-icon-location"></i>
          <span>活动管理</span>
        </template>
          <el-menu-item index="/createact">创建活动</el-menu-item>
          <el-menu-item index="/myactive">我的活动</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/userinfo">
        <i class="el-icon-document"></i>
        <template #title>兴趣列表</template>
      </el-menu-item>
      <el-menu-item index="/Comment">
        <i class="el-icon-setting"></i>
        <template #title>个人中心</template>
      </el-menu-item>
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
          const isCollapse = ref(true)
          const handleSelect = (key, keyPath) => {
            router.push(keyPath[0])
          }
          return {
            isCollapse,
            handleSelect
          }
      }
    })
</script>
<style lang="css" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }


</style>