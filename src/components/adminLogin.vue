<template>
  <div class="indexPage">
    <div class="formdiv">
      <el-form class="form">
        <el-form-item label="账号">
          <el-input v-model="form.id" class="input" />
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
import { getCurrentInstance, reactive, inject } from "vue";

export default {
  name: "indexPage",
  components: {},
  // mounted() {
  //   console.log(this.$route.params.data);
  // },
  setup() {
    const instance = getCurrentInstance();
    const axios = inject("axios");
    const form = reactive({
      id: "",
      password: "",
    });
    function back() {
      instance.proxy.$router.go(-1);
    }
    function login() {
      axios.post("/api/adminlogin", form).then((response) => {
        // console.log(response.data)
        if (response.data) {
          instance.proxy.$router.push({
            path: "inputInfo",
          });
        }
      });
    }
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
