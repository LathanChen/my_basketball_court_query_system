<template>
  <div class="indexPage">
    <div class="formdiv">
      <el-form class="form" 
      label-position="right"
      label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" class="input" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" class="input" />
        </el-form-item>
      </el-form>
      <div style="display: flex; justify-content: center; align-items: center;margin-top: 30px;">
        <el-button type="success" @click="login">登录</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 导入了 Vue.js 中的 h 函数，以便在应用程序中使用它来创建虚拟 DOM 元素。
import { getCurrentInstance, reactive,ref, inject,h,watch,onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from 'vue-router'

export default {
  name: "adminLogin",
  components: {},
  setup() {
    onMounted(() => {
      if (currentData.value){
      mes.value = currentData.value
      openVn()
      mes.value = ''
      }
    });
    const instance = getCurrentInstance();
    const axios = inject("axios");
    const form = reactive({
      username: "",
      password: "",
    });
    // 获取当前路由信息
    const route = useRoute()
    // 将路由信息传递过来的值变为响应式的对象currentData
    const currentData = ref(route.query.data)
    // 监视值的变化
    watch(() => route.query.data, (newVal) => {
      currentData.value = newVal
    })
    function back() {
      instance.proxy.$router.push({ path: "/" });
    }

    const mes = ref("")
    function login() {
      axios.post("/api/adminlogin", form).then((response) => {
        // console.log(response.data.state)
        if (response.data.state) {
          // console.log(response.data.state)
          localStorage.setItem('token', response.data.token);
          console.log(localStorage.token)
          instance.proxy.$router.push({
            path: "inputInfo",
          })
        }
        else{
          // console.log(response.data.state)
          mes.value = "用户名或密码有误，请重新输入"
          openVn()
        }
      });
    }
    const openVn = () => {
      ElMessage({
        message: h("p", null, [
          h("span", null, mes.value),
        ]),
      });
    };
    return {
      form,
      back,
      login,
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
.formdiv {
  padding-top: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  width: 300px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.918);
  padding: 20px;
  /* position: relative;是CSS中用于设置元素定位的属性之一。当一个元素被设置为相对定位时，它会相对于其在文档流中的原始位置进行定位，即元素的位置会相对于其正常位置发生偏移，但并不会脱离文档流，也不会影响其他元素的位置。 */
}
.form {
  /* position: absolute;是CSS中用于设置元素定位的属性之一。当一个元素被设置为绝对定位时，它会相对于其最近的定位祖先元素进行定位，而不考虑元素在文档流中的位置，即元素会脱离文档流，可以自由地设置其位置和尺寸，同时它的位置也不会影响其他元素的布局。 */
  /* position: absolute; */
  margin: 0 auto;
  width: 80%;
}
/* .el-input {
  width: 50%;
} */
</style>
