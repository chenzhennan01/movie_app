<template>
  <page-view class="flex flex-col">
    <titleBar :show-back="true">选坐购票</titleBar>
    <div class="content-box flex-1 overflow-auto">
      <van-skeleton :loading="isLoading" animate :row="8">
        <!-- 电影的基本信息-->
        <ul class="leading-6 px-[5px]">
          <li class="font-bold">
            {{ currentPlanInfo.movieInfo.movie_name }}
            <span class="text-[14px] text-warningColor">￥{{ currentPlanInfo.price }}</span>
          </li>
          <li class="text-gray-500 text-[12px]">
            时间：{{ formatDateTime(currentPlanInfo.plan_time, "YYYY-MM-DD HH:mm:ss") }}
          </li>
        </ul>
        <!-- 座位的效果图-->
        <ul class="flex flex-row justify-around text-[12px] py-[10px] border-0 border-b border-solid border-gray-300">
          <li class="flex items-center">
            <div class="w-[30px] h-[26px] mr-2">
              <img src="../assets/img/00.png" class="w-full h-full" alt="">
            </div>
            可选
          </li>
          <li class="flex items-center">
            <div class="w-[30px] h-[26px] mr-2">
              <img src="../assets/img/01.png" class="w-full h-full" alt="">
            </div>
            已售
          </li>
          <li class="flex items-center">
            <div class="w-[30px] h-[26px] mr-2">
              <img src="../assets/img/02.png" class="w-full h-full" alt="">
            </div>
            已选
          </li>
        </ul>
        <div class="w-[200px] h-[10px] bg-gray-300 rounded-b-[10px] mx-auto"></div>
        <!--渲染座位信息-->
        <ul class="mt-[20px] overflow-auto py-[10px]">
          <li class="flex py-[2px] items-center" v-for="(item1,index1) in siteList" :key="index1">
            <div class="text-gray-400 text-[12px] px-[5px] font-bold">{{ index1 + 1 }}</div>
            <div
                @click="siteClick(index1,index2)"
                class="w-[30px] h-[26px] mr-1 flex-shrink-0"
                v-for="(item2,index2) in item1" :key="index2">
              <img src="../assets/img/00.png" alt="" v-if="item2==0">
              <img src="../assets/img/01.png" alt="" v-else-if="item2==1">
              <img src="../assets/img/02.png" alt="" v-else-if="item2==2">
            </div>
          </li>
        </ul>
        <!-- 按钮-->
        <button type="button" class="btn-buy disabled:opacity-30" :disabled="currentChoose.length<=0">
          ￥{{ currentChoose.length * currentPlanInfo.price }}
          选坐购票
        </button>
        <ul class="flex mt-[10px] flex-wrap">
          <li v-for="item in currentChoose" :key="item"
              class=" m-[5px] p-[10px] w-[70px] h-[20px] text-[12px] bg-gray-100 flex justify-center items-center">
            {{ item }}
          </li>
        </ul>
      </van-skeleton>

    </div>
  </page-view>
</template>

<script setup>
import titleBar from "../components/title-bar.vue";
import {ref, reactive, watch} from "vue";
import {Toast} from "vant";
import {useRoute} from "vue-router";
import API from "../utils/API/index.js";
import {formatDateTime} from "../utils/API/dateTimeUtils.js";

//拿到当前路由的对象
const route = useRoute();

const siteList = ref([]);
//0代表的可选,-1代表空的位置，1代表已售，2已选

const siteClick = (index1, index2) => {
  //index1是一维的索引，index2是二维的索引
  if (siteList.value[index1][index2] == 0) {
    siteList.value[index1][index2] = 2;
  } else if (siteList.value[index1][index2] == 2) {
    siteList.value[index1][index2] = 0;
  } else if (siteList[index1][index2] == 1) {
    Toast("当前位置已售，不可选");
  }
}

const currentPlanInfo = ref(null);
const isLoading = ref(true);
//编写一个函数，用于查询当前排片的信息
const queryData = () => {
  isLoading.value = true;
  API.planInfo.findById(route.query.id)
      .then(result => {
        currentPlanInfo.value = result.data;
        //把坐位信息的字符串转换成对象
        siteList.value = JSON.parse(result.data.choose_site)
      })
      .finally(() => {
        isLoading.value = false;
      })
}
queryData();

const currentChoose = ref([]);
//监听siteList变化
watch(() => siteList, (newVal, oldVal) => {
  let temp = [];
  newVal.value.forEach((item1, index1) => {
    item1.forEach((item2, index2) => {
      if (item2 == 2) {
        temp.push(`第${index1 + 1}排第${index2 + 1}座`);
      }
    })
  })
  currentChoose.value = temp;
}, {
  deep: true
})


</script>

<style scoped lang="scss">
.btn-buy {
  @apply border-none bg-primaryColor text-white text-[12px] w-[80%] h-[32px] block m-auto rounded-full mt-3 ;
}
</style>