<template>
  <page-view class="flex flex-col">
    <titleBar :show-back="true">电影详细信息</titleBar>
    <div class="content-box flex-1 overflow-auto">
      <van-skeleton :loading="isLoading" animate :row="7">
        <div class="movie-info-box box-border p-[10px] flex flex-row relative overflow-hidden h-[150px]">
          <img :src="baseURL+currentMovieInfo.movie_pc"
            class="w-full h-full object-cover blur-lg absolute -z-10" alt="">
          <div class="left w-[100px] h-full ">
            <img :src="baseURL+currentMovieInfo.movie_pc" class="w-full h-full" alt="">
          </div>
          <ul class="flex flex-col justify-between flex-1 ml-[10px] text-white text-[12px]">
            <li class="text-[20px]">{{currentMovieInfo.movie_name}}</li>
            <li><span class="text-[16px] text-warningColor">{{currentMovieInfo.movie_score}}</span> 分</li>
            <li>{{currentMovieInfo.tags}}</li>
            <li>{{currentMovieInfo.duration}}分钟</li>
            <li>{{currentMovieInfo.publicTime}}上映</li>
          </ul>
        </div>
        <div @click="toPlanInfoList" class="mx-[10px] my-[15px] rounded-[5px] cursor-pointer active:bg-successColor bg-primaryColor text-white h-[35px] flex justify-center items-center">特惠购票</div>
        <p class="movie-desc">
          {{currentMovieInfo.movie_desc}}
        </p>
      </van-skeleton>
    </div>
  </page-view>
</template>
<script setup>
import titleBar from "../components/title-bar.vue";
import { ref, inject } from "vue";
// 在vue里面，有一个东西很容易弄混
// 路由管理对象: router专门负责页面的跳转
// 路由单体对象：route专门负责页面的数据
// 现在你的路由地址上面有一个参数，怎么获取呢？这个时候应该是通过路由单体对象
import { useRoute,useRouter } from "vue-router";
import API from "../utils/API/index.js";


const route = useRoute();
const router = useRouter();
const baseURL = inject("baseURL");

//定义一个变量，用于表示是否正在加载
const isLoading = ref(true);

//定义一个变量，用于保存从服务器请求回来的数据
const currentMovieInfo = ref(null);
const findById = () => {
  isLoading.value = true;
  //通过下面的代码 ，我们就可以拿到id
  API.movieInfo
    .findById(route.query.id)
    .then((result) => {
      currentMovieInfo.value = result.data;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
findById();
//去电影的排片列表
const toPlanInfoList = () => {
  router.push({
    name: "planInfoList",
    query: {
      id: route.query.id
      }
    });
};
</script>
<style scoped lang="scss">
.movie-desc {
  @apply text-[12px] px-[10px] leading-6 indent-[2em];
  // 多行溢出省略
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>