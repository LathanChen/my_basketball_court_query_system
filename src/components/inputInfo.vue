<template>
  <div class="indexPage">
    <div class="chaxun">
      <el-tabs model-value="first" class="demo-tabs">
        <el-tab-pane label="新增信息" name="first">
          <el-form :model="form" label-width="80px">
            <el-form-item label="场馆名">
              <el-select v-model="form.cdbianhao" placeholder="请选择场馆">
                <!-- 使用v-for，必须指定key的值，不然会报错 -->
                <el-option v-for="(item,index) in listvalues.courts"
            :key="index"
            :label="item.court_name"
            :value="item.cdbianhao"/>
              </el-select>
            </el-form-item>
            <el-form-item label="项目">
              <el-select v-model="form.xmbianhao" placeholder="请选择项目">
                <el-option v-for="(item,index) in listvalues.xiangmunames"
            :key="index"
            :label="item.xmname"
            :value="item.xmbianhao" />
              </el-select>
            </el-form-item>
            <el-form-item label="周数">
              <el-select
                v-model="form.zhoushu"
                placeholder="请选择周数"
              >
                <el-option label="第一周" value=1 />
                <el-option label="第二周" value=2 />
                <el-option label="第三周" value=3 />
                <el-option label="第四周" value=4 />
                <el-option label="第五周" value=5 />
                <el-option label="每周" value=6 />
              </el-select>
            </el-form-item>
            <el-form-item label="星期数">
              <el-select
                v-model="form.zhouji"
                placeholder="请选择星期数"
              >
                <el-option label="星期一" value=1 />
                <el-option label="星期二" value=2 />
                <el-option label="星期三" value=3 />
                <el-option label="星期四" value=4 />
                <el-option label="星期五" value=5 />
                <el-option label="星期六" value=6 />
                <el-option label="星期日" value=0 />
              </el-select>
            </el-form-item>
            <el-form-item label="时间段">
              <el-select
                v-model="form.shijianduan"
                placeholder="请选择时间段"
              >
                <el-option label="上午" value=1 />
                <el-option label="下午" value=2 />
                <el-option label="晚上" value=3 />
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-time-select
                v-model="form.ks_shijian"
                placeholder="开始时间"
                :start="ks_shijian_from"
                step="00:15"
                :end="js_shijian_from"
                :disabled="ks_shijian"
              />
            </el-form-item>
            <el-form-item label="结束时间">
              <el-time-select
                v-model="form.js_shijian"
                placeholder="结束时间"
                :start="ks_shijian_end"
                step="00:15"
                :end="js_shijian_end"
                :disabled="js_shijian"
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
                      <el-button type="primary" @click="insertInfo">添加</el-button>
                    </template>
                  </el-popconfirm>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item>
                  <el-button @click="back">取消</el-button>
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
import { getCurrentInstance,ref,reactive, inject, watch, computed, toRefs,toRaw } from "vue";

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
        inputInfo.listvalues.courts = response.data.courts
        inputInfo.listvalues.xiangmunames = response.data.xiangmunames
        console.log(inputInfo.listvalues.courts)
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
      courts:[],
      xiangmunames:[],
      deep:true
    });
    const form = reactive({
      cdbianhao: "",
      xmbianhao: "",
      shijianduan: "",
      ks_shijian: "",
      js_shijian: "",
      zhoushu:"",
      zhouji:"",
    });
    // 通过计算属性拼接网页输入的开始时间+结束时间
    const shijian = computed(() =>{
      return `${form.ks_shijian}-${form.js_shijian}`
    })

    // 重新创建一个新的对象formWithShijian，里面包含form对象的所有属性，并且加上了计算属性shijian
    const formWithShijian = reactive({
      // ES6展开运算符，将form对象的属性一一展开，合并上计算属性shijian后重新生成一个响应式对象formWithShijian
      ...toRefs(form),
      shijian
    })

    // const requestForm = toRaw(formWithShijian)

    let ks_shijian_from = ref('08:30')
    let js_shijian_from = ref('12:00')
    let ks_shijian_end = ref('08:30')
    let js_shijian_end = ref('12:00')
    let ks_shijian = ref(true)
    let js_shijian = ref(true)

    // 监视form的shijianduan属性，这里watch方法的第一个参数必须写成一个函数，并且要开启深度监视
      // 原因：在Vue 3中，watch函数的第一个参数可以是一个函数，也可以是一个响应式对象或一个ref。如果第一个参数是一个响应式对象或一个ref，Vue 3会自动将其转换成一个getter函数，然后使用该函数来获取属性的值进行监视。因此，如果我们需要监视一个响应式对象或一个ref的属性，可以直接将其作为第一个参数传递给watch函数。
      // 但是，如果我们想要监视一个属性的派生值，就需要将第一个参数写成一个函数。因为在这种情况下，我们需要在函数中定义派生值的计算逻辑，然后返回计算结果。watch函数会在初始化时调用该函数，然后监视该函数的返回值。只要返回值发生变化，watch函数就会调用回调函数。
    watch(
      () =>form.shijianduan,
      (newvalue) =>{
      // console.log(newvalue,oldvalue)
      if (newvalue == 1){
        form.ks_shijian = ''
        form.js_shijian = ''
        ks_shijian_from.value = '08:30'
        ks_shijian_end.value = '12:00'
        js_shijian_from.value = '11:30'
        // const [hours, minutes] = form.ks_shijian.split(':'); // 将字符串拆分成小时和分钟
        // const dateObject = new Date(); // 创建一个日期对象
        // dateObject.setHours(hours); // 设置日期对象的小时
        // dateObject.setMinutes(minutes); // 设置日期对象的分钟
        // dateObject.setMinutes(dateObject.getMinutes() + 30); // 加上 30 分钟
        // ks_shijian_end.value = dateObject.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        js_shijian_end.value = '12:00'
        ks_shijian.value = false
        js_shijian.value = true
      }
      else if (newvalue == 2){
        form.ks_shijian = ''
        form.js_shijian = ''
        ks_shijian_from.value = '12:30'
        js_shijian_from.value = '18:00'
        ks_shijian_end.value = '12:30'
        js_shijian_end.value = '18:00'
        ks_shijian.value = false
        js_shijian.value = true
      }
      else if (newvalue == 3){
        form.ks_shijian = ''
        form.js_shijian = ''
        ks_shijian_from.value = '18:30'
        js_shijian_from.value = '22:00'
        ks_shijian_end.value = '18:30'
        js_shijian_end.value = '22:00'
        ks_shijian.value = false
        js_shijian.value = true
      }
      // else if (newvalue == 2){
      //   ks_shijian.value = '12:30'
      //   js_shijian.value = '15:00'
      // }
      // else if (newvalue == 3){
      //   ks_shijian.value = '18:00'
      //   js_shijian.value = '22:00'
      // }
    },
    {
      deep:true
    })

    watch(
      () =>form.ks_shijian,
      (newvalue) =>{
        if (newvalue <= form.js_shijian||form.js_shijian == ''){
        form.ks_shijian = newvalue
        const [hours, minutes] = form.ks_shijian.split(':'); // 将字符串拆分成小时和分钟
        // console.log(form.ks_shijian)
        const dateObject = new Date(); // 创建一个日期对象
        dateObject.setHours(hours); // 设置日期对象的小时
        dateObject.setMinutes(minutes); // 设置日期对象的分钟
        dateObject.setMinutes(dateObject.getMinutes() + 30); // 加上 30 分钟
        ks_shijian_end.value = dateObject.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          if(newvalue == ''){
            js_shijian.value = true
          }
          else{
            js_shijian.value = false
          }       
        }
        else{
          // ks_shijian_from.value = js_shijian_from.value
          // alert("开始时间不能晚于结束时间！")
        }
      },
      {
      deep:true
    }
    )
    // watch(
    //   () =>form.js_shijian,
    //   (newvalue) =>{
    //     if (newvalue >= form.ks_shijian||form.ks_shijian==''){
    //       form.js_shijian = newvalue
    //     }
    //     else{
    //       alert("结束时间不能早于开始时间！")
    //       newvalue = ''
    //     }
    //   },
    //   {
    //   deep:true
    // }
    // )

    function insertInfo() {
      axios.post("/api/insertinfo", toRaw(form)).then((response) => {
        console.log(form)
        if (response.data) {
          // alert('添加成功!')
          instance.proxy.$router.push({
            path: "hello",
          });
        }
      });
    }
    function back() {
      console.log(form)
      // instance.proxy.$router.push({ path: "/indexpage" });
    }
    return {
      form,
      back,
      insertInfo,
      listvalues,
      ks_shijian_from,
      js_shijian_from,
      ks_shijian_end,
      js_shijian_end,
      ks_shijian,
      js_shijian,
      formWithShijian
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
  height: 450px;
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
