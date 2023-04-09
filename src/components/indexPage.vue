<template>
  <div class="indexPage">
    <!-- <el-h1 class="custom-h1">欢迎使用本系统</el-h1> -->
    <div id="guanli">
      <el-button type="primary" icon="User" @click="adminlogin"
        >管理员登录</el-button
      >
    </div>
    <div class="chaxun">
      <el-text type="primary" style="font-size: 36px">欢迎使用本系统</el-text>
      <div style="margin-top: 30px"></div>
      <el-form
        label-width="120px"
        style="margintop: 30px"
      >
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            style="width: 85%"
          />
        </el-form-item>
        <el-form-item label="选择时间段">
          <el-select
            v-model="form.shijianduan"
            placeholder="请选择您想查询的时间段"
            style="width: 85%"
          >
            <el-option label="上午" value="1" />
            <el-option label="下午" value="2" />
            <el-option label="晚上" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择项目">
          <el-select
            v-model="form.xmbianhao"
            placeholder="请选择您想查询的运动项目"
            style="width: 85%"
          >
            <el-option label="篮球" value="1" />
            <el-option label="排球" value="2" />
            <el-option label="乒乓球" value="3" />
            <el-option label="羽毛球" value="4" />
          </el-select>
        </el-form-item>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
          "
        >
          <el-button type="primary" @click="submit">提交</el-button>
          <!-- <el-button type="primary">提交</el-button> -->
          <el-button>取消</el-button>
        </div>
        <!-- <el-form-item>
          <el-button type="success" @click="click">登录</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="tongji">
      <el-badge :value="guestCount">
        <span class="badge-icon">
          <i class="el-icon-user"></i>
        </span>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, inject, getCurrentInstance } from "vue";
import { useStore } from "vuex";
// 导入了 Vue.js 中的 h 函数，以便在应用程序中使用它来创建虚拟 DOM 元素。
import { h } from "vue";
import { ElMessage } from "element-plus";
// import { ElH1, ElH2, ElH3} from "element-plus";

export default {
  name: "indexPage",
  components: {},
  setup() {
    const count = ref(0);
    const store = useStore();
    const instance = getCurrentInstance();
    const guestCount = computed(() => {
      return `您是访问本网站的第${count.value}个用户`;
    });
    const axios = inject("axios");
    const form = reactive({
      date: "",
      shijianduan: null,
      xmbianhao: null,
      pageNum:1,
      pageSize:5
    });
    const openVn = () => {
      ElMessage({
        message: h("p", null, [
          h("span", null, "您有尚未选择的选项！"),
        ]),
      });
    };

    // 新写法, 发送axios的get请求,获得分页信息和查询数据
  //   function submitForm(){
  //     if (
  //       Object.values(form).includes(null) ||
  //       Object.values(form).includes("")
  //     ) {
  //       openVn()
  //     } 
  //     else {
  //       axios.get('/api/courts', {
  //         params: {
  //         pageSize: 100, // 参数
  //       },
  //         data: form 
  //   })
  //   }
  // }

    // 最初的写法,使用表单按钮发送post请求取得数据,但是没有分页功能
    function submit() {
      // console.log(form);
      if (
        Object.values(form).includes(null) ||
        Object.values(form).includes("")
      ) {
        openVn()
      } 
      else {
      // axios.post("/api/form-data", form).then((response) => {
      axios.post("/api/courts",form).then(() => {
        // 将首页表格输入的数据储存到VueX中，便于分页功能的使用
        store.state.indexform = form;
        // console.log(store.state.indexform)
        // -------------------------------------------------------------------
        // 使用VueX的写法，将后台查询到的数据存到VueX中，在下个组件中直接读取
        // store.state.mylist = response.data;
        // -------------------------------------------------------------------

        // 将返回的数据转化为JSON格式,也就是字符串
        // const data = JSON.stringify(response.data);
        // 将字符串保存在query对象的date属性中
        // const query = {
        //   data:data}
        // console.log(data);
        // console.log(store.state.mylist)
        instance.proxy.$router.push({
          name: "infoPage",
          // 发送路由导航的同时,将查询到的数据发送到下一个路由组件
          // query:query
        });
      });}
      // .catch(error => {
      //   console.log(error);
      // })
    }
    function click() {
      // console.log(axios);
      // 通过返回的对象访问 $axios 和 $router
      axios.get("api/login").then((response) => {
        if (response.data.id == 1) {
          instance.proxy.$router.push({ path: "/hello" });
        }
      });
    }
    function adminlogin() {
      // 点击按钮，转到管理员登录页面
      instance.proxy.$router.push({ path: "/adminLogin" });
    }
    return {
      form,
      count,
      guestCount,
      click,
      submit,
      adminlogin,
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
#guanli {
  position: absolute;
  top: 3%;
  left: 1%;
  /* padding: 10%; */
}
.chaxun {
  padding-top: 20px;
  /* 设置圆角边框属性 */
  border-radius: 10px;
  /* 设置外边距，上边距150，左右编剧自动调整，下边距为0 */
  /* -----------以下为调整元素在页面左右居中，离下部65%距离----------- */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  /* -----------以上为调整元素在页面左右居中，离下部65%距离----------- */
  width: 420px;
  height: 40%;
  background-color: rgba(255, 255, 255, 0.918);
  padding: 20px;
  display: flex;
  flex-direction: column;
}
/* 适应窄屏幕 */
@media (max-width: 600px) {
  .form-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* .form-submit-button {
    margin-bottom: 10px;
  } */
}
/* 适应宽屏幕 */
@media (min-width: 601px) {
  .form-buttons {
    justify-content: space-between;
  }
}
/* .custom-h1 {
  display: block;
  font-size: 30px;
  margin-bottom: 20px;
  color: black;
} */
.tongji {
  position: fixed;
  bottom: 20px;
  right: 200px;
  padding: 10px;
}
</style>
