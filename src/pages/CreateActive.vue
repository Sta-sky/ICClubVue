<template lang="">
  <div class='box'>
      <div v-show="isMap" class="create">
        <h1>创建活动</h1>
        <div class='create_act'>
          <ul>
            <li>
              <span>活动主题</span>
              <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              </el-select>
            </li>
            <li>
              <span>活动标题</span>
              <input class='title' v-model="input" placeholder="请输入活动标题" />
            </li>
            <li>
              <span>起始时间</span>
                <el-date-picker
                v-model="value2"
                type="datetimerange"
                start-placeholder="Start Date"
                end-placeholder="End Date"
              >
              </el-date-picker>
            </li>
            <li>
              <span>活动地点</span>
              <input v-model="input" placeholder="请输入活动地点" />
              <el-button @click='showMap' type='primary'>地图搜索</el-button>
            </li>

            <li>
              <span>活动人数</span>
              <input type="text" name="" id="">
            </li>
            <li>
              <span>活动详情</span>
              <input type='file' />
              <textarea name="" id="" cols="25" rows="10"></textarea>
            </li>
          </ul>
    
        </div>
        <div class='btn'>
          <el-button type='primary'>创建</el-button>
          <el-button type='danger'>取消</el-button>
        </div>
      </div>
      <div 
        class='map'
        v-show='!isMap'
      >不合格烦恼和规范你好过分
        <baidu-map
          class='Bmap'
          ak='A9LgCYwMmzqUMz1nMfAo5T7DWR3n1tjP'
          :center="center" 
          :zoom="zoom"
          @ready="handler"
        >
        </baidu-map>
      </div>
    <div class='user'>
      <userActivList/>
    </div>
  </div>
</template>
<script>
  import {toRefs, ref, reactive, onMounted} from 'vue'
  import userActivList from '../components/userActivList'
  import BaiduMap from 'vue-baidu-map'

  export default {
      name: 'CreateActive',
      components: {
        userActivList,
        BaiduMap,
      },
      setup() {
        const state = reactive({
          timeVale: '',
          isMap: true,
          center: {lng: 0, lat: 0},
          zoom: 0
        })
        function handler() {
          this.center.lng = 116.404
          this.center.lat = 39.915
          this.zoom = 15
        }

        function showMap(BMap){
          state.isMap = false
        }

        return {...toRefs(state), showMap, handler}
      }
  }
</script>
<style lang="css" scoped>

  .box{
    margin: 5vh 0 0 0;
    display: flex;

  }

  .box>div{
    margin-right: 3vw;
  }

  .user{
    height: 20vh;
    width: 25vw;
  }

  .create{
    background-color: #eff0f3;
    display: flex;
    flex-direction: column;
    width: 30vw;
    color:#0d0d0d;
    padding: 5vh 2vw 5vh 0vh;
    justify-content: space-between;
    align-items: center;
  }

  .map{
    width: 30vw;
    height: 50vh;
    background-color: tomato;
  }
  .Bmap{
    width: 100%;
    height: 400px;
  }
  .create>h1{
    margin-bottom: 2vh;
  }

  ul>li{
    margin: 2.5vh 0 0 2vw;

  }

  li>span{
    display: inline-block;
    width: 7vw;
    color: #2a2a2a;
    font-weight: 700;
    font-size: 1.4rem;
  }
  li:last-child>textarea{
    display: block;
    margin-left: 7vw;
    width: 20vw;
    border-radius: 10px
  }
  
  input{
    height: 4vh;
    border-radius: 5px;
    border: 1px #fff ;
  }

  .btn{
    margin-top: 5vh;
  }

  .btn .el-button--primary{
    background-color: #ff8e3c;
    color: #0d0d0d;
  }

  .btn .el-button--primary:hover{
    background-color: rgb(77, 129, 207);
    color: white;
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