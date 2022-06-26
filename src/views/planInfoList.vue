<template>
  <page-view class="flex flex-col">
    <title-bar :show-back="true">电影排片</title-bar>
    <div class="content-box flex-1 overflow-auto">
      <!--轮播图的盒子 -->
      <div class="swiper-box h-[150px] bg-gradient-to-tr from-gray-500 to-gray-900 py-[5px]">
        <swiper
          :slides-per-view="3"
          :space-between="10"
          :centered-slides="true"
          class="w-full h-full">
          <swiper-slide v-for="item in 10" :key="item">
            <img src="../assets/img/01.jpg" class="w-full h-full" alt="">
          </swiper-slide>
        </swiper>
      </div>
      <!-- 中间的电影名称 -->
      <ul class="flex flex-col items-center py-[10px] leading-6">
        <li class=" font-bold flex items-center">
          你好，标哥
          <div class=" text-warningColor ml-[5px]">8.0<span class="text-[12px]">分</span>
          </div>
        </li>
        <li class="text-[12px] text-gray-400 tracking-wide">
          147分钟|动作|标哥哥,帅哥,小杨哥
        </li>
      </ul>
      <!-- 当前电影的排片列表 -->
      <ul class="px-[10px]">
        <li v-for="item in planInfoList" :key="item.id"
          class="flex p-[5px] h-[50px] items-center border-0 border-b border-dashed border-gray-400">
          <div class="w-[80px] text-[14px]">
            {{formatDateTime(item.plan_time,"YYYY-MM-DD HH:mm:ss")}}
          </div>
          <div class="w-[120px] text-[12px] text-gray-700">
            {{item.hallInfo.tags}}
          </div>
          <div class="flex-1 text-primaryColor">￥{{item.price}}</div>
          <div class="w-[60px]">
            <button type="button" class="btn-buy" @click="toChooseSite(item.id)">购票</button>
          </div>
        </li>

      </ul>
    </div>
  </page-view>
</template>
<script setup>
import titleBar from "../components/title-bar.vue";
import { useRoute,useRouter } from "vue-router";
import API from "../utils/API/index.js";
import { ref } from "vue";
import { formatDateTime } from "../utils/API/dateTimeUtils.js";

// 导入swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const route = useRoute();
const router = useRouter();

// route.query.id
const planInfoList = ref([]);
const queryData = () => {
  API.planInfo.getListByMid(route.query.id).then((result) => {
    console.log(result);
    planInfoList.value = result.data;
  });
};
queryData();

const toChooseSite = (id) => {
  router.push({
    name:"chooseSite",
    query:{
      id:id
    }
  })
};
</script>
<style scoped lang="scss">
.btn-buy {
  @apply text-[12px] text-primaryColor border-primaryColor border-solid border w-[50px] h-[28px] rounded-[14px] bg-white;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.8);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}
</style>