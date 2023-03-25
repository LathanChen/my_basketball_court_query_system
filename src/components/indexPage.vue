<template>
  <div class="indexPage">
    <!-- <el-h1 class="custom-h1">欢迎使用本系统</el-h1> -->
    <div id="guanli">
      <el-button type="primary" icon="User" @click="adminlogin">管理员登录</el-button>
    </div>
    <div class="chaxun">
      <el-text type="primary" style="font-size: 36px;">欢迎使用本系统</el-text>
      <el-form label-width="120px" style="marginTop:30px">
        <el-form-item label="选择日期">
        <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            style="width: 85%"/>
          </el-form-item>
        <el-form-item label="选择时间段">
          <el-select 
            v-model="form.shijianduan" 
            placeholder="请选择您想查询的时间段"
            style="width: 85%">
            <el-option label="上午" value=1 />
            <el-option label="下午" value=2 />
            <el-option label="晚上" value=3 />
          </el-select>
        </el-form-item>
        <el-form-item label="选择项目">
          <el-select 
            v-model="form.xiangmu" 
            placeholder="请选择您想查询的运动项目"
            style="width: 85%">
            <el-option label="排球" value="paiqiu" />
            <el-option label="篮球" value="lanqiu" />
            <el-option label="乒乓球" value="pingpangqiu" />
            <el-option label="羽毛球" value="yumaoqiu" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="text-align: center;padding-top: 20px; position: relative;left: 20%;">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="success" @click="click">登录</el-button>
        </el-form-item> -->
      </el-form>
      <div class="tongji">
        <el-badge :value="guestCount">
          <span class="badge-icon">
          <i class="el-icon-user"></i>
          </span>
        </el-badge>
      </div>
  </div>  
  </div>
</template>

<script>
import { computed, reactive,ref,inject,getCurrentInstance } from "vue";
// import { useStore } from 'vuex';
// import { ElH1, ElH2, ElH3} from "element-plus";

export default {
  name: "indexPage",
  components: {
  
  },
  setup() {
    const count = ref(0)
    // const store = useStore();
    const instance = getCurrentInstance();
    const guestCount = computed(() =>{
      return `您是访问本网站的第${count.value}个用户`
    })
    const axios = inject('axios')
    const form = reactive({
      date: '',
      shijianduan:null,
      xiangmu:''
    })
    function submit() {
      // console.log(form);
      axios.post('/api/form-data',form)
      .then(response => {
        // console.log(response.data)
        // -------------------------------------------------------------------
        // 使用VueX的写法，将后台查询到的数据存到VueX中，在下个组件中直接读取
        // store.state.mylist = response.data
        // -------------------------------------------------------------------

        // 将返回的数据转化为JSON格式,也就是字符串
        const data = JSON.stringify(response.data)
        // 将字符串保存在query对象的date属性中
        const query = {
          data:data}
        console.log(data)
        // console.log(store.state.mylist)
        instance.proxy.$router.push({ 
        name: 'infoPage',
        // 发送路由导航的同时,将查询到的数据发送到下一个路由组件
        query:query  
        })
      })
      // .catch(error => {
      //   console.log(error);
      // })
  }
    function click() {
      // console.log(axios);
      // 通过返回的对象访问 $axios 和 $router
      axios.get("api/login").then((response) => {
        if(response.data.id == 1){
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
      adminlogin
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
  top: 10px;
  left: 10px;
  padding: 10px;
}
.chaxun{
  padding-top: 20px;
  border-radius:10px;
  margin: 150px auto 0;
  width: 30%;
  height: 320px;
  background-color: rgba(255, 255, 255, 0.918);
  padding: 20px;
}
.custom-h1 {
  display: block;
  font-size: 30px;
  margin-bottom: 20px;
  color: black;
}
.tongji {
  position: fixed;
  bottom: 20px;
  right: 200px;
  padding: 10px;
}
.custom-h2 {
  display: block;
  font-size: 50px;
  margin-bottom: 20px;
  color: #ec8352;
}
.custom-h3 {
  display: block;
  font-size: 50px;
  margin-bottom: 20px;
  color: #ec8352;
}
</style>
