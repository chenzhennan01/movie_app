<template>
    <page-view class="flex flex-col">
        <form action="/">
            <van-search
                v-model="value" background="#F7504D" shape="round" show-action @search="onSearch" 
                placeholder="请输入关键字">
                <template #left>
                    <img src="../assets/img/left-arrow.svg" class="mr-[10px]" @click="$router.back()" />
                </template>
                <template #action>
                    <div @click="onClickButton" class="text-[14px] text-white">搜索</div>
                </template>
            </van-search>
        </form>

        <div class="content-box flex-1 overflow-auto bg-gray-100">
            <!-- 默认情况是没有数据的 -->
            <van-empty description="暂无数据" v-if="searchData.listData.length == 0"></van-empty>
            <van-list 
                v-model:loading="isLoading" 
                loading-text="正在加载电影数据"
                @load="loadNextPage" 
                :finished="queryParams.pageIndex >= searchData.pageCount">
                <div class="box">
                    <div class="bg-white w-[110px] h-[140px] pb-[20px] p-[5px] relative"
                        v-for="item in searchData.listData" :key="item.id" @click="toMovieDetail(item.id)">
                        <img class="w-full h-full" :src="baseURL + item.movie_pc" />
                        <p class=" text-warningColor text-[12px] p-[5px] absolute bottom-[20px] left-[8px] font-bold">
                            观众评分: {{ item.movie_score }}</p>
                        <p class="text-[12px] left-[8px] font-bold">
                            {{ item.movie_name }}</p>
                    </div>
                </div>
            </van-list>
        </div>
    </page-view>
</template>
<script setup>
import { Search, Toast } from 'vant';
import { reactive, ref, inject } from 'vue';
import API from '../utils/API';
import { useRouter } from "vue-router";

const baseURL = inject("baseURL");

//输入的值
const value = ref('');

const router = useRouter();

const queryParams = reactive({
    pageIndex: 1,
    keyword: "",
});
const isLoading = ref(false);
const searchData = reactive({
    listData: [],
    pageCount: 0
});

const queryData = () => {
    isLoading.value = true;
    //点击收缩时将页码变为1，不然拉到下面时再点击搜索会有bug
    queryParams.pageIndex=1;
    API.movieInfo.search(queryParams).then(result => {
        //console.log(result.data.listData)
        if (result.data.listData.length == 0) {
            Toast('暂无数据');
        } else {
            //searchData.listData = searchData.listData.concat(result.data.listData);
            searchData.listData = result.data.listData;
            searchData.pageCount = result.data.pageCount;
        }
    }).finally(() => {
            //数据请求完了，就把加载状态取消
            isLoading.value = false;
        });
}

const onClickButton = () => {
    queryParams.keyword = value.value;
    if (queryParams.keyword == '') {
        Toast('请输入内容');
    } else {
        queryData();
    }
};

const onSearch = () => {
    queryParams.keyword = value.value;
    if (queryParams.keyword == '') {
        Toast('请输入内容');
    } else {
        queryData();
    }
};

const loadNextPage = () => {
    //第一步把页码加1
    queryParams.pageIndex++;
    //第二步：只有向下拉的时候使用concat包裹数据
        isLoading.value = true;
        API.movieInfo.search(queryParams).then(result => {
        searchData.listData = searchData.listData.concat(result.data.listData);
        searchData.pageCount = result.data.pageCount;  
    }).finally(() => {
            //数据请求完了，就把加载状态取消
            isLoading.value = false;
        });
}

const toMovieDetail = (id) => {
    router.push({
        name: 'movieDetail',
        query: {
            id: id
        }
    });
};
</script>
<style scoped>
.box {
    padding: 5px;
    text-align: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px 3px;

}
:deep(.van-search__action:active){
    background-color: transparent;
}
</style>