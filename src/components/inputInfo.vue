<template>
  <div class="indexPage">
    <div class="chaxun" :style="{ width: cxdivwidth + '%' }">
      <!-- model-value指定最初默认打开的标签页 -->
      <el-tabs
        model-value="first"
        v-model="activeName"
        @tab-click="tabClick"
        lazy="true"
      >
        <el-tab-pane label="新增信息" name="first">
          <el-form :model="form" label-width="80px">
            <el-form-item label="场馆名">
              <el-select v-model="form.cdbianhao" placeholder="请选择场馆">
                <!-- 使用v-for，必须指定key的值，不然会报错 -->
                <el-option
                  v-for="(item, index) in listvalues.courts"
                  :key="index"
                  :label="item.court_name"
                  :value="item.cdbianhao"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="项目">
              <el-select v-model="form.xmbianhao" placeholder="请选择项目">
                <el-option
                  v-for="(item, index) in listvalues.xiangmunames"
                  :key="index"
                  :label="item.xmname"
                  :value="item.xmbianhao"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="周数">
              <el-select v-model="form.zhoushu" placeholder="请选择周数">
                <el-option label="第一周" value="1" />
                <el-option label="第二周" value="2" />
                <el-option label="第三周" value="3" />
                <el-option label="第四周" value="4" />
                <el-option label="第五周" value="5" />
                <el-option label="每周" value="6" />
              </el-select>
            </el-form-item>
            <el-form-item label="星期数">
              <el-select v-model="form.zhouji" placeholder="请选择星期数">
                <el-option label="星期一" value="1" />
                <el-option label="星期二" value="2" />
                <el-option label="星期三" value="3" />
                <el-option label="星期四" value="4" />
                <el-option label="星期五" value="5" />
                <el-option label="星期六" value="6" />
                <el-option label="星期日" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="时间段">
              <el-select v-model="form.shijianduan" placeholder="请选择时间段">
                <el-option label="上午" value="1" />
                <el-option label="下午" value="2" />
                <el-option label="晚上" value="3" />
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
                  <el-popconfirm @confirm="insertInfo" title="确认要添加吗">
                    <!-- <template #reference> 会创建一个匿名插槽，其中的内容将被插入到组件的默认插槽中,也就是把下面的el-button放入到el-popconfirm的默认插槽中 -->
                    <template #reference>
                      <el-button type="primary">添加</el-button>
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
        <el-tab-pane label="修改信息" name="second">
          <!-- <button @click="show">{{ mingxi ? '显示明细' : '隐藏明细' }}</button> -->
          <el-form :model="editForm" label-width="80px" v-if="editFormShow">
            <el-form-item label="场馆名">
              <el-select v-model="editForm.cdbianhao" placeholder="请选择场馆">
                <!-- 使用v-for，必须指定key的值，不然会报错 -->
                <el-option
                  v-for="(item, index) in listvalues.courts"
                  :key="index"
                  :label="item.court_name"
                  :value="item.cdbianhao"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="项目">
              <el-select v-model="editForm.xmbianhao" placeholder="请选择项目">
                <el-option
                  v-for="(item, index) in listvalues.xiangmunames"
                  :key="index"
                  :label="item.xmname"
                  :value="item.xmbianhao"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="showall" v-if="cxButtonShow"
            >查询</el-button
          >
          <!-- 设置div进入时的动画效果，appear代表初次渲染时依然会出现动画 -->
          <!-- enter-active-class进入动画
          leave-active-class离开动画 -->
          <transition
            name="animate__animated animate__bounce"
            appear
            enter-active-class="animate__backInUp"
          >
            <div id="editMingxi" v-if="editMingxi">
              <el-table
                :data="editFormData.array"
                style="width: 100%"
                edit-config="true"
                tyo
              >
                <!-- prop：用于指定数据对象中与表格列相对应的属性名,即绑定的数据对象editFormData.array的属性值 -->
                <el-table-column>
                  <!-- #default="{ row }，el-table-column将数据显示在默认插槽，row为表格绑定的editFormData.array数组的第一个对象 -->
                  <template v-slot:default="{ row }">
                    <!-- 在row元素中增加edit属性，控制每行的可编辑状态 -->
                    <el-select v-model="row.zhoushu" :disabled="!row.edit">
                      <!-- 这里一定要使用:value="1"的方式，实现动态数据绑定，不然后台的row.zhoushu不会绑定到每一个选项中 -->
                      <el-option label="第一周" :value="1" />
                      <el-option label="第二周" :value="2" />
                      <el-option label="第三周" :value="3" />
                      <el-option label="第四周" :value="4" />
                      <el-option label="第五周" :value="5" />
                      <el-option label="每周" :value="6" />
                    </el-select>
                    <!-- <el-input v-model="row.zhoushu_zw" /> -->
                  </template>
                </el-table-column>
                <el-table-column>
                  <!-- #default="{ row }，el-table-column将数据显示在默认插槽，row为表格绑定的editFormData.array数组的第一个对象 -->
                  <template v-slot:default="{ row }">
                    <el-select v-model="row.zhouji" placeholder="请选择星期数" :disabled="!row.edit">
                      <el-option label="周一" :value="1" />
                      <el-option label="周二" :value="2" />
                      <el-option label="周三" :value="3" />
                      <el-option label="周四" :value="4" />
                      <el-option label="周五" :value="5" />
                      <el-option label="周六" :value="6" />
                      <el-option label="周日" :value="0" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="开始时间">
                  <template v-slot:default="{ row }">
                    <!-- <el-time-picker
                      v-model="row.ks_shijian"
                      size="small"
                      is-range
                      range-separator="To"
                      start-placeholder="Start time"
                      end-placeholder="End time"
                    /> -->                   
              <el-time-select
                v-model="row.ks_shijian"
                start="08:30"
                step="00:30"
                end="22:00"
                :disabled="!row.edit"
              />
                  </template>
                </el-table-column>
                <el-table-column label="结束时间">
                  <template #default="{ row }">
              <el-time-select
                v-model="row.js_shijian"
                start="08:30"
                step="00:30"
                end="22:00"
                :disabled="!row.edit"
              />
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="js_shijian"
                  label="结束时间"
                  width="120"
                /> -->
                <el-table-column fixed="right" label="操作选项">
                  <!-- 可以写成下面这样，$index代表row对象在列表中的索引值
                  <template v-slot:default="{ row,$index }"> -->
                  <template v-slot:default="{ row }">
                    <!-- 通过按钮的click方法，为edit属性赋值，控制按钮的显示或隐藏，即同一行其他单元格的可编辑状态 -->
                    <el-button link type="primary" size="small" @click="bianjimingxi(row)" v-if="!row.edit">编辑</el-button>
                    <el-popconfirm @confirm="baocunmingxi(row)" title="确认要保存吗" v-if="row.edit">
                    <template #reference>
                    <el-button link type="primary" size="small">保存</el-button>
                    </template>
                    </el-popconfirm>
                    <el-popconfirm @confirm="deletemingxi(row)" title="确认要删除吗">
                    <template #reference>
                    <el-button link type="primary" size="small">删除</el-button>
                    </template>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </transition>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {
  getCurrentInstance,
  ref,
  reactive,
  inject,
  watch,
  computed,
  toRefs,
  toRaw,
} from "vue";

// 引入第三方动画库
import "animate.css";

export default {
  name: "inputInfo",
  components: {},
  // mounted() {
  //   console.log(this.$route.params.data);
  // },
  beforeRouteEnter(to, from, next) {
    // inputInfo就是当前组件对象，next是回调函数，当next被调用时组件已经创建成功，所以可以获取axios对象
    next((inputInfo) => {
      inputInfo.axios.get("/api/inputdata").then((response) => {
        inputInfo.listvalues.courts = response.data.courts;
        inputInfo.listvalues.xiangmunames = response.data.xiangmunames;
        // console.log(inputInfo.listvalues.courts);
        // console.log(inputInfo.courtnames.xiangmunames)
      });
    }).catch((error) => {
      console.error(error);
    });
  },
  setup() {
    const instance = getCurrentInstance();
    const axios = inject("axios");
    // 不知道为什么,这里用于v-for循环的场地列表必须定义为一个对象,如果只定义为一个列表的话,下拉框就不会出现值
    const listvalues = reactive({
      courts: [],
      xiangmunames: [],
      deep: true,
    });
    const form = reactive({
      cdbianhao: "",
      xmbianhao: "",
      shijianduan: "",
      ks_shijian: "",
      js_shijian: "",
      zhoushu: "",
      zhouji: "",
    });

    // 这里必须写成对象形式，不然v-modle读不到数据
    let editFormData = reactive({
      array: [],
    });

    const editForm = reactive({
      cdbianhao: "",
      xmbianhao: "",
    });
    // 通过计算属性拼接网页输入的开始时间+结束时间
    const shijian = computed(() => {
      return `${form.ks_shijian}-${form.js_shijian}`;
    });

    // 重新创建一个新的对象formWithShijian，里面包含form对象的所有属性，并且加上了计算属性shijian
    const formWithShijian = reactive({
      // ES6展开运算符，将form对象的属性一一展开，合并上计算属性shijian后重新生成一个响应式对象formWithShijian
      ...toRefs(form),
      shijian,
    });

    const activeName = ref("first");

    const editFormShow = ref(true);

    const cxButtonShow = ref(true);

    // const requestForm = toRaw(formWithShijian)

    let ks_shijian_from = ref("08:30");
    let js_shijian_from = ref("12:00");
    let ks_shijian_end = ref("08:30");
    let js_shijian_end = ref("12:00");
    let ks_shijian = ref(true);
    let js_shijian = ref(true);
    let cxdivwidth = ref(20);
    let editMingxi = ref(false);
    let editMingxi_ksshijian = ref("");
    let editMingxidisplay = ref(true);


    // 监视form的shijianduan属性，这里watch方法的第一个参数必须写成一个函数，并且要开启深度监视
    // 原因：在Vue 3中，watch函数的第一个参数可以是一个函数，也可以是一个响应式对象或一个ref。如果第一个参数是一个响应式对象或一个ref，Vue 3会自动将其转换成一个getter函数，然后使用该函数来获取属性的值进行监视。因此，如果我们需要监视一个响应式对象或一个ref的属性，可以直接将其作为第一个参数传递给watch函数。
    // 但是，如果我们想要监视一个属性的派生值，就需要将第一个参数写成一个函数。因为在这种情况下，我们需要在函数中定义派生值的计算逻辑，然后返回计算结果。watch函数会在初始化时调用该函数，然后监视该函数的返回值。只要返回值发生变化，watch函数就会调用回调函数。
    watch(
      () => form.shijianduan,
      (newvalue) => {
        // console.log(newvalue,oldvalue)
        if (newvalue == 1) {
          form.ks_shijian = "";
          form.js_shijian = "";
          ks_shijian_from.value = "08:30";
          ks_shijian_end.value = "12:00";
          js_shijian_from.value = "11:30";
          // const [hours, minutes] = form.ks_shijian.split(':'); // 将字符串拆分成小时和分钟
          // const dateObject = new Date(); // 创建一个日期对象
          // dateObject.setHours(hours); // 设置日期对象的小时
          // dateObject.setMinutes(minutes); // 设置日期对象的分钟
          // dateObject.setMinutes(dateObject.getMinutes() + 30); // 加上 30 分钟
          // ks_shijian_end.value = dateObject.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          js_shijian_end.value = "12:00";
          ks_shijian.value = false;
          js_shijian.value = true;
        } else if (newvalue == 2) {
          form.ks_shijian = "";
          form.js_shijian = "";
          ks_shijian_from.value = "12:30";
          js_shijian_from.value = "18:00";
          ks_shijian_end.value = "12:30";
          js_shijian_end.value = "18:00";
          ks_shijian.value = false;
          js_shijian.value = true;
        } else if (newvalue == 3) {
          form.ks_shijian = "";
          form.js_shijian = "";
          ks_shijian_from.value = "18:30";
          js_shijian_from.value = "22:00";
          ks_shijian_end.value = "18:30";
          js_shijian_end.value = "22:00";
          ks_shijian.value = false;
          js_shijian.value = true;
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
        deep: true,
      }
    );

    watch(
      () => form.ks_shijian,
      (newvalue) => {
        if (newvalue <= form.js_shijian || form.js_shijian == "") {
          form.ks_shijian = newvalue;
          const [hours, minutes] = form.ks_shijian.split(":"); // 将字符串拆分成小时和分钟
          // console.log(form.ks_shijian)
          const dateObject = new Date(); // 创建一个日期对象
          dateObject.setHours(hours); // 设置日期对象的小时
          dateObject.setMinutes(minutes); // 设置日期对象的分钟
          dateObject.setMinutes(dateObject.getMinutes() + 30); // 加上 30 分钟
          ks_shijian_end.value = dateObject.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          if (newvalue == "") {
            js_shijian.value = true;
          } else {
            js_shijian.value = false;
          }
        } else {
          // ks_shijian_from.value = js_shijian_from.value
          // alert("开始时间不能晚于结束时间！")
        }
      },
      {
        deep: true,
      }
    );
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
      // toRaw() 是 Vue.js 3 中的一个函数。它是一个全局函数，可用于将响应式对象转换为普通对象
      axios.post("/api/insertinfo", toRaw(form)).then((response) => {
        console.log(form);
        if (response.data) {
          // alert('添加成功!')
          instance.proxy.$router.push({
            path: "hello",
          });
        }
      });
    }
    function back() {
      console.log(form);
      // instance.proxy.$router.push({ path: "/indexpage" });
    }

    // 创建页面上标签页的点击事件，当点击新增信息时div缩小，点击修改信息时div变大
    function tabClick(tab) {
      // 获取点击标签的name要使用tab.props.name
      // console.log(tab.props.name)
      if (tab.props.name == "first") {
        cxdivwidth.value = 20;
        editFormShow.value = true;
        editMingxi.value = false;
        cxButtonShow.value = true;
      }

      // instance.proxy.$router.push({ path: "/indexpage" });
    }

    // function show(){
    //   mingxi.value = !mingxi.value
    // }
    function showallEditArray(){
      axios.post("/api/editanddeleteinfo", toRaw(editForm)).then((response) => {
        // 使用foreach对数组进行循环
        editFormData.array = response.data;
        editFormData.array.forEach((elementit) => {
          switch (elementit.zhouji) {
            case 1:
              elementit.zhouji_zw = "周一";
              break;
            case 2:
              elementit.zhouji_zw = "周二";
              break;
            case 3:
              elementit.zhouji_zw = "周三";
              break;
            case 4:
              elementit.zhouji_zw = "周四";
              break;
            case 5:
              elementit.zhouji_zw = "周五";
              break;
            case 6:
              elementit.zhouji_zw = "周六";
              break;
            case 0:
              elementit.zhouji_zw = "周日";
              break;
          }
          switch (elementit.zhoushu) {
            case 1:
              elementit.zhoushu_zw = "第一周";
              break;
            case 2:
              elementit.zhoushu_zw = "第二周";
              break;
            case 3:
              elementit.zhoushu_zw = "第三周";
              break;
            case 4:
              elementit.zhoushu_zw = "第四周";
              break;
            case 5:
              elementit.zhoushu_zw = "第五周";
              break;
            case 6:
              elementit.zhoushu_zw = "每周";
              break;
          }
        });
        console.log(editFormData.array);
      });

    }
    function showall() {
      cxdivwidth.value = 50;
      editFormShow.value = !editFormShow.value;
      editMingxi.value = !editMingxi.value;
      cxButtonShow.value = !cxButtonShow.value;
      showallEditArray()
    }

    function bianjimingxi(row){
        row.edit = true
        // showbaocun.value = !showbaocun.value
        // bianji.value = !bianji.value    
      }

    function baocunmingxi(row){
      row.edit = false
        // showbaocun.value = !showbaocun.value
        // bianji.value = !bianji.value 
        axios.post("/api/editinfo", toRaw(row))
      }

    function deletemingxi(row){
      row.edit = false
        // showbaocun.value = !showbaocun.value
        // bianji.value = !bianji.value 
        axios.delete(`/api/deleteinfo/${row.bianhao}`).then((rensponse) =>{
          if(rensponse.data == true){
            console.log(rensponse.data)
            showallEditArray()
          }
        })
      }

    return {
      form,
      editFormData,
      back,
      insertInfo,
      showall,
      tabClick,
      bianjimingxi,
      baocunmingxi,
      deletemingxi,
      listvalues,
      ks_shijian_from,
      js_shijian_from,
      ks_shijian_end,
      js_shijian_end,
      ks_shijian,
      js_shijian,
      formWithShijian,
      cxdivwidth,
      activeName,
      editForm,
      // tabClick,
      editMingxi,
      // show,
      editFormShow,
      cxButtonShow,
      editMingxi_ksshijian,
      editMingxidisplay,
      // bianji,
      // showbaocun
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
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 20%; */
  height: 450px;
  background-color: rgba(255, 255, 255, 0.918);
  padding: 20px;
}
#editMingxi {
  /* height: 300px;
  width: 600px; */
  background-color: rgba(233, 24, 24, 0.918);
}

/* .el-input {
  width: 50%;
} */
</style>
