<template>
  <div class="indexPage">
    <div class="chaxun">
      <el-tabs model-value="first" class="demo-tabs">
        <el-tab-pane label="新增信息" name="first">
          <el-form :model="form" label-width="80px">
            <el-form-item label="场馆名">
              <el-select v-model="form.courtname" placeholder="请选择场馆">
                <!-- 使用v-for，必须指定key的值，不然会报错 -->
                <el-option v-for="(item,index) in listvalues.courtnames"
            :key="index"
            :label="item"
            :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="项目">
              <el-select v-model="form.xiangmu" placeholder="请选择项目">
                <el-option v-for="(item,index) in listvalues.xiangmunames"
            :key="index"
            :label="item"
            :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="时间段">
              <el-select
                v-model="form.region"
                placeholder="please select your zone"
              >
                <el-option label="上午" value=1 />
                <el-option label="下午" value=2 />
                <el-option label="晚上" value=3 />
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-time-select
                v-model="form.ks_shijian"
                placeholder="Start time"
                start="08:30"
                step="00:15"
                end="22:00"
              />
            </el-form-item>
            <el-form-item label="结束时间">
              <el-time-select
                v-model="form.js_shijian"
                placeholder="Start time"
                start="08:30"
                step="00:15"
                end="22:00"
              />
            </el-form-item>

            <!-- 这种写法，会将开始时间和结束时间在一行显示 -->
            <!-- <el-row>
              <el-col :span="11">
                <el-form-item label="开始时间">
              <el-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      placeholder="Start time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
            </el-form-item>
              </el-col>
              <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
              <el-col :span="11">
                <el-form-item label="结束时间">
              <el-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      placeholder="Start time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
            </el-form-item>
              </el-col>
            </el-row>           -->
            <el-row>
              <el-col :span="8">
                <el-form-item>
                  <el-popconfirm title="确认要添加吗">
                    <template #reference>
                      <el-button type="primary">添加</el-button>
                    </template>
                  </el-popconfirm>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改信息" name="second"> Config </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, inject } from "vue";

export default {
  name: "inputInfo",
  components: {},
  // mounted() {
  //   console.log(this.$route.params.data);
  // },
  beforeRouteEnter(to,from,next){
    // inputInfo就是当前组件对象，next是回调函数，当next被调用时组件已经创建成功，所以可以获取axios对象
    next((inputInfo) =>{
      inputInfo.axios.get('/api/inputdata')
      .then(response => {
        inputInfo.listvalues.courtnames = response.data.courtnames
        inputInfo.listvalues.xiangmunames = response.data.xiangmunames
        // console.log(inputInfo.courtnames.courtnames)
        // console.log(inputInfo.courtnames.xiangmunames)
        })
      })
      .catch(error => {
        console.error(error);
      });
  },
  setup() {
    const instance = getCurrentInstance();
    const axios = inject("axios");
    // 不知道为什么,这里用于v-for循环的场地列表必须定义为一个对象,如果只定义为一个列表的话,下拉框就不会出现值
    const listvalues = reactive({
      courtnames:[],
      xiangmunames:[]
    });
    const form = reactive({
      courtname: "",
      xiangmu: "",
      shijianduan: "",
      ks_shijian: "",
      js_shijian: "",
      shijian: "",
    });
    function back() {
      instance.proxy.$router.go(-1);
    }
    function login() {
      axios.post("/api/adminlogin", form).then((response) => {
        console.log(response.data);
        if (response.data) {
          instance.proxy.$router.push({
            path: "hello",
          });
        }
      });
    }
    return {
      form,
      back,
      login,
      listvalues
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
.chaxun {
  padding-top: 20px;
  border-radius: 10px;
  margin: 150px auto 0;
  width: 20%;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.918);
  padding: 20px;
  position: relative;
}
.input {
  width: 100%;
}
.formdiv {
  padding-top: 20px;
  border-radius: 10px;
  margin: 270px auto;
  width: 20%;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.918);
  padding: 20px;
  /* position: relative;是CSS中用于设置元素定位的属性之一。当一个元素被设置为相对定位时，它会相对于其在文档流中的原始位置进行定位，即元素的位置会相对于其正常位置发生偏移，但并不会脱离文档流，也不会影响其他元素的位置。 */
  position: relative;
}
.form {
  /* position: absolute;是CSS中用于设置元素定位的属性之一。当一个元素被设置为绝对定位时，它会相对于其最近的定位祖先元素进行定位，而不考虑元素在文档流中的位置，即元素会脱离文档流，可以自由地设置其位置和尺寸，同时它的位置也不会影响其他元素的布局。 */
  position: absolute;
  left: 20%;
  right: 20%;
  top: 20%;
}
/* .el-input {
  width: 50%;
} */
</style>
