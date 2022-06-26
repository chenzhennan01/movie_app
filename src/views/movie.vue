<template>
    <!-- //导入全局组件 -->
    <page-view class="movie-page bg-[#f5f5f5]">
        <!-- 标题栏 -->
        <title-bar>
            华夏影院
            <!-- #right插入到一个name为right的具名插槽 -->
            <template #right>
                <img src="../assets/img/menu.svg" @click="show = true" alt="" />
            </template>
        </title-bar>
        <!-- 分类盒子 -->
        <ul class="type-tag bg-white">
            <li v-for="(item, index) in typeTagList" :key="index" :class="{ active: typeTagIndex == index }"
                @click="typeTagIndex = index">{{ item }}</li>
            <li class="right-search-icon" >
                <img src="../assets/img/search.svg" @click="$router.push({name:'search'})"/>
            </li>
        </ul>
        <!-- 剩下的空间全部给下面的盒子 -->
        <div class="content-box">
            <div class="px-[10px] box-border bg-white pb-[15px]">
                <p class=" text-gray-700 text-[12px] py-[5px]">最受好评的电影</p>
                <div class="praise-list flex overflow-auto">
                    <!-- 每一项的电影信息 -->
                    <div class="w-[90px] praise-item flex-shrink-0" v-for="item in praiseMovieList" :key="item.id"
                    @click="toMovieDetail(item.id)">
                        <div class="h-[110px] relative">
                            <img class=" w-full h-full" :src="baseURL + item.movie_pc" alt="">
                            <p class="text-yellow-500 text-[12px] absolute bottom-[2px] left-[8px] font-bold">
                                观众评分{{ item.movie_score }}</p>
                        </div>
                        <p class="text-[12px] font-bold truncate py-[5px] ">{{ item.movie_name }}</p>
                    </div>
                </div>
            </div>
            <hot-movie-list></hot-movie-list>
        </div>
        <van-action-sheet v-model:show="show"
                          :actions="actions"
                          cancel-text="取消"
                          close-on-click-action
                          @select="onSelect"/>
    </page-view>
</template>

<script setup>
import titleBar from "../components/title-bar.vue";
import { ref, reactive, inject } from "vue";
import API from "../utils/API/index.js";
import hotMovieList from "../components/hotMovieList.vue"
import { useRouter } from "vue-router";
//定义一个数组
const typeTagList = reactive(["热映", "待映", "经典电影"]);
const typeTagIndex = ref(0);

//定义一个变量，用于保存最受欢迎的电影
const praiseMovieList = ref([]);

//注入全局参数
const baseURL = inject("baseURL");

//获取路由管理对象
const router = useRouter();
//是否显示登录
const show = ref(false);

const actions = [{ name: '登录账号'}];

API.movieInfo.getPraiseMovie().then((result) => {
    if (result.status == "success") {
        //服务器返回数据成功
        praiseMovieList.value = result.data;
    
    } else {
        //服务器返回数据失败
        console.log("获取数据失败");
    }

});

const toMovieDetail = (id)=>{
    router.push({
        name:'movieDetail',
        query:{
            id:id
        }
    });
};         
const onSelect = (item) => {
      if(item.name=="登录账号"){
        router.push({
            name:'login'
        });
      }
    };
</script>

<style scoped lang="scss">
 @import "../assets/scss/comm.scss";

 .type-tag {
     height: 45px;
     border-bottom: 1px solid lightgrey;
     display: flex;
     list-style-type: none;

     li {
         padding: 0 10px;
         display: flex;
         flex-direction: column;
         // 主轴居中
         justify-content: center;
         align-items: center;
         font-weight: bold;
         color: #666666;
         font-size: 14px;
         position: relative;

         &.active {
             font-size: 17px;
             color: #333333;

             &::after {
                 content: "";
                 height: 2px;
                 background-color: $primaryColor;
                 width: 20px;
                 position: absolute;
                 bottom: 2px;
             }
         }
     }

     position: relative;

     .right-search-icon {
         position: absolute;
         right: 5px;
         height: 100%;

         img {
             width: 30px;
             height: 30px;
         }
     }
 }

 .movie-page {
     display: flex;
     flex-direction: column;
 }

 .content-box {
     flex: 1;
     overflow: auto;

     .praise-list {
         &::-webkit-scrollbar {
             display: none;
         }
     }

     .praise-item:not(:first-child) {
         margin-left: 5px;
     }
 }
</style>