/**
 * 路由配置文件
 */
import { createRouter, createWebHashHistory } from "vue-router";

import home from "../views/home.vue";
import login from "../views/login.vue";
import register from "../views/register.vue";

// 二级页面
// import movie from "../views/movie.vue";
// import hall from "../views/hall.vue";
// import plan from "../views/plan.vue";
// import my from "../views/my.vue";

//创建路由对象并指定配置信息
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect:{
                name: "movie"
            }
        },
        {
            path: "/home",
            component: home,
            name: "home",
            children: [
                {
                    //一级路径加斜线，二级路径不加斜线
                    // path: "/home/movie",
                    path: "movie",
                    component: () => import("../views/movie.vue"),
                    name: "movie"
                },
                {
                    path: "hall",
                    component: () => import("../views/hall.vue"),
                    name: "hall"
                },
                {
                    path: "plan",
                    component: () => import("../views/plan.vue"),
                    name: "plan"
                },
                {
                    path: "my",
                    component: () => import("../views/my.vue"),
                    name: "my"
                }
            ]
        },
        {
            path: "/login",
            component: login,
            name: "login"
        },
        {
            path: "/register",
            component: register,
            name: "register"
        },{
            path:"/movieDetail",
            component:()=>import("../views/movieDetail.vue"),
            name:"movieDetail"
        },{
            path:"/planInfoList",
            component:()=>import("../views/planInfoList.vue"),
            name:"planInfoList"
        },{
            path:"/chooseSite",
            component:()=>import("../views/chooseSite.vue"),
            name:"chooseSite"
        },{
            path:"/search",
            component:()=>import("../views/search.vue"),
            name:"search"
        }
    ]
});

export default router;