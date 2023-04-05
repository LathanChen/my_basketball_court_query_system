<template>
  <div class="indexPage">
    <div class="chaxun">
      <div>
        <el-text type="primary" style="font-size: 20px">为您查询到{{courtNums}}条记录</el-text>
      </div>
      <!-- element的描述列表组件 -->
      <!-- column：用于控制组件的列数 -->
      <!-- column：用于控制组件的列数 -->
      <div class="back">
        <el-button type="primary" size="small" @click="back">
          <el-icon>
            <ArrowLeft />
          </el-icon>
          返回
        </el-button>
      </div>
    <div id="mingxi">
  <template v-for="item in myData" :key="item.bianhao">
  <el-descriptions
    class="margin-top"
    title="场地信息"
    column:3
    border
    style="margin-top:15px"
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <House />
          </el-icon>
          地点
        </div>
      </template>
    {{ item.court_name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Position />
          </el-icon>
          距离
        </div>
      </template>
      {{ item.juli }}km
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon>
            <Clock />
          </el-icon>
          开放时间
        </div>
      </template>
      <el-tag size="small">{{ item.shijian }}</el-tag>
    </el-descriptions-item>    
    <el-descriptions-item align="left" label-align="left">
      <template #label>
        <div class="cell-item">
          <el-icon>
            <office-building />
          </el-icon>
          地址
        </div>
      </template>
      {{ item.dizhi }}
    </el-descriptions-item>
  </el-descriptions>
</template>
</div>
      <!-- <el-descriptions title="场地信息" style="margin-top:15px">
        <el-descriptions-item>
          <span>
            <el-tag size="large">场地名</el-tag>
            <span>梅田地域学習センター</span>
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <span>
            <el-tag size="large" type="info">地址</el-tag>
            <span>東京都足立区梅田7-33-1 L.ソフィア内</span>
          </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <span>
            <el-tag size="large" type="info">开放时间</el-tag>
            <span>xx:xx-xx:xx</span>
          </span>
        </el-descriptions-item>
      </el-descriptions> -->
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from "vue";
import { useStore } from 'vuex';

// ---------------------------------------------------------------
// 在 Vue 3 中，useRoute 和 instance.proxy.$router 都是用于获取当前路由信息的 API，但是它们的功能有所不同。
// useRoute 是一个 Vue 3 中的 Composition API，用于在组件内部获取当前路由的信息。通过调用 useRoute 函数，你可以获得一个包含当前路由信息的响应式对象，
// import { useRoute } from "vue-router";
// ---------------------------------------------------------------

// import { ElH1, ElH2, ElH3} from "element-plus";
// 这个页面要展示数据库查询的结果，思考了一下，有几个难点：
// 1、查询如果包含多条结果，使用element中的元素标签，应该怎么迭代展示？
// 2、除了查询结果之外，还要返回查询到记录的数量，在不给Form对象增加额外属性的前提下，java后台应该怎么实现，使用Map作为返回对象也许是一个办法
// import {Search,Edit,Check,Message,Star,Delete,} from "@element-plus/icons";
export default {
  name: "indexPage",
  components: {},
  // mounted() {
  //   console.log(this.$route.params.data);
  // },
  setup() {
    // 获取VueX实例对象
    const store = useStore();
    const instance = getCurrentInstance();
    // console.log(instance.proxy.$route.meta);

    // -------------------------------------------------------------------
    // 使用VueX的写法，将前一个组件查询到的数据存到VueX中，并在这里读取
    const myData = store.state.mylist.courtList;
    const courtNums = store.state.mylist.courtNums;
    const xmnames = store.state.mylist.xiangmunames;
    // -------------------------------------------------------------------

    // 获取组件的路由实例对象
    // const route = useRoute()
    // 将上一个组件传递过来的参数转化为js对象
    // const data = JSON.parse(route.query.data)
    // const myData = data.courtList
    // const courtNums = data.courtNums
    // const xmnames = data.xiangmunames
    // const courtNums = JSON.parse(route.query.courtNums)
    // console.log(route.query.data)
    // console.log(xmnames)

    function back() {
          instance.proxy.$router.push({ path: "/indexpage" })     
      }
    return {
      myData,
      courtNums,
      back,
      xmnames
      // data,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.indexPage {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-image: url("../assets/images/basketball-g2ffdbc9b8_1920.jpg");
}
.back {
  position: absolute;
  top: 10px;
  left: 10px;
}
.chaxun {
  padding-top: 20px;
  border-radius: 10px;
  margin: 150px auto 0;
  width: 630px;
  height: 45%;
  background-color: rgba(255, 255, 255, 0.918);
  padding: 20px;
  position: relative;
}
#mingxi {
  height: 100%;
  overflow: auto
}
.cell-item {
  white-space: nowrap;
}

</style>
