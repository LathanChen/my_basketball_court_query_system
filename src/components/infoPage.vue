<template>
  <div class="indexPage">
    <div class="chaxun">
      <div style="display: flex; justify-content: center; align-items: center;">
        <el-text type="primary" style="font-size: 20px">{{myData.list.total}}つの情報があります</el-text>
      </div>
      <!-- element的描述列表组件 -->
      <!-- column：用于控制组件的列数 -->
      <!-- column：用于控制组件的列数 -->
      <div class="back">
        <el-button type="primary" size="small" @click="back">
          <el-icon>
            <ArrowLeft />
          </el-icon>
          戻る
        </el-button>
      </div>
    <div id="mingxi">
  <template v-for="item in myData.list.list" :key="item.bianhao">
    <!-- 这里border报红是vs code的问题 -->
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
          場所
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
          距離
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
          住所
        </div>
      </template>
      {{ item.dizhi }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<div style="height: 20%;margin-top: 3%;">
  <!-- layout="->,prev, pager, next, jumper"中的 -> 表示靠右放置，必须放在layout属性的第一个 -->
  <!-- :total="+myData.list.total"这里+号表示转化为number类型，不然会报警告 -->
    <el-pagination
      v-model:current-page="listset.pageNum"
      v-model:page-size="listset.pageSize"
      :disabled="disabled"
      :background="background"
      layout="->,prev, pager, next, jumper"
      :total="+myData.list.total"
      @current-change="handlePageChange"
    />
  </div>
  </div>
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
</template>
<script>
import { getCurrentInstance,ref,inject, reactive } from "vue";
import { useStore } from 'vuex';

// ---------------------------------------------------------------
// 在 Vue 3 中，useRoute 和 instance.proxy.$router 都是用于获取当前路由信息的 API，但是它们的功能有所不同。
// useRoute 是一个 Vue 3 中的 Composition API，用于在组件内部获取当前路由的信息。通过调用 useRoute 函数，你可以获得一个包含当前路由信息的响应式对象
// useRoute主要用于获取当前路由的信息，而$router主要用于路由导航。
// import { useRoute } from "vue-router";
// ---------------------------------------------------------------

// import { ElH1, ElH2, ElH3} from "element-plus";
// 这个页面要展示数据库查询的结果，思考了一下，有几个难点：
// 1、查询如果包含多条结果，使用element中的元素标签，应该怎么迭代展示？
// 2、除了查询结果之外，还要返回查询到记录的数量，在不给Form对象增加额外属性的前提下，java后台应该怎么实现，使用Map作为返回对象也许是一个办法
// import {Search,Edit,Check,Message,Star,Delete,} from "@element-plus/icons";
export default {
  name: "infoPage",
  components: {},
  // mounted() {
  //   console.log(this.$route.params.data);
  // },

  // 钩子函数，组件加载完毕后执行一次ajax请求，获取第一页的明细内容，后面的内容由组件内的@current-change事件触发获取
  mounted() {
    // 获取本组件的实例
    const { ctx } = getCurrentInstance();
    ctx.getlist()
  },

  setup() {
    // 获取VueX实例对象
    const store = useStore();
    // 引入axios
    const axios = inject("axios");
    const instance = getCurrentInstance();
    // console.log(instance.proxy.$route.meta);

    // -------------------------------------------------------------------
    // 使用VueX的写法，将前一个组件查询到的数据存到VueX中，并在这里读取
    const listset =  store.state.indexform
    // 存储后台查询结果的对象
    const myData = reactive({
      list:[]
    })
    // 是否禁用分页	
    const disabled = ref(false);
    // 是否为分页按钮添加背景色	
    const background = ref(true);
    
    // 查询到的记录数量
    // let courtNums = myData.list.total;
    // const xmnames = store.state.mylist.xiangmunames;
    // -------------------------------------------------------------------

    // function handleCurrentChange(){
    //   pageNum = pageNum;
    //   getUserList();
    // }
    

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
    
    function getlist() {
      axios.post("/api/courts",listset).then((response) => {
        // 将首页表格输入的数据储存到VueX中，便于分页功能的使用
        // console.log(response.data)
        // -------------------------------------------------------------------
        // 使用VueX的写法，将后台查询到的数据存到VueX中，在下个组件中直接读取
        myData.list = response.data
        let total = parseInt(response.data.total)
        myData.list.total = total
        // console.log(myData.list.total)
    })
  }

  function handlePageChange(pageNum) {
    // console.log(listset)
    listset.pageNum = pageNum;
    // console.log(listset)
    getlist();
    }

    function back() {
      instance.proxy.$router.push({ path: "/" })     
      }
    return {
      myData,
      // courtNums,
      back,
      // xmnames,
      // currentPage,
      // pageSize,
      disabled,
      background,
      getlist,
      handlePageChange,
      listset

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
  overflow: hidden;
}
#mingxi {
  height: 100%;
  overflow: auto
}
.cell-item {
  white-space: nowrap;
}

</style>
