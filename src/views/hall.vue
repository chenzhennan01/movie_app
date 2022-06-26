<template>
  <page-view class="flex flex-col">
    <title-bar>影厅</title-bar>
    <div class="content-box flex-1 overflow-auto">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model:loading="isLoading"
          finished-text="没有更多数据了"
          loading-text="加载中..."
          :offset="10"
          @load="loadNextPage"
          :finished="queryParams.pageIndex>=resultData.pageCount"
          class="movie-list px-[10px] box-border">
          <div v-for="item in resultData.listData" :key="item.id"
            class="movie-item border-0 border-b border-solid border-gray-300 py-[10px]">
            <div class="font-bold">{{item.hall_name}}</div>
            <div class="text-gray-500 text-[14px] my-[5px] truncate">
              {{item.address}}
            </div>
            <div class="tags">
              <van-tag plain v-for="(item,index) in item.tags.split(',')" :key="item"
                :color="index%2==0?'#FF9E21':'#01BB84'"
                class="mr-[5px]">
                {{item}}
              </van-tag>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </page-view>
</template>
<script setup>
import titleBar from "../components/title-bar.vue";
//如果你导入的是一个文件夹，那么它默认会从当前文件夹下面找index.js导入
// import API from "../utils/API/index.js";
import API from "../utils/API";
import { ref, reactive } from "vue";

const queryParams = reactive({
  pageIndex: 1,
  hall_name: "",
});

//请求回来的结果数据
const resultData = reactive({
  listData: [],
  pageCount: 0,
});
const isLoading = ref(false);
//编写函数，请求数据
const queryData = () => {
  isLoading.value = true;
  API.hallInfo
    .getListByPage(queryParams)
    .then((result) => {
      //这个时候要注意，在加载下一页的时候 ，千万不能替换原来的数据
      //而是使用原来的数据 追加上新的数据
      resultData.listData = resultData.listData.concat(result.data.listData);
      resultData.pageCount = result.data.pageCount;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

//加载下一页
const loadNextPage = () => {
  console.log("加载下一页", new Date());
  queryParams.pageIndex++;
  queryData();
};

//下拉刷新
const onRefresh = () => {
  //第一步：先把页面变成1
  queryParams.pageIndex = 1;
  //第二步：清空数据
  resultData.listData = [];
  queryData();
};
queryData();
</script>
<style scoped>
</style>