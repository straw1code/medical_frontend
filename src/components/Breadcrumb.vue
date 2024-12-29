<template>
    <div style="background-color: rgb(243, 243, 244);">
        <div style="font-size: 20px; font-weight: bolder;">医药公司信息管理</div>
        <br>
        <el-breadcrumb  separator="/">
            <el-breadcrumb-item :to="{ path: '/main/dashborad' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(v, i) in menuArr" :to="v.path" :key="i">{{ v.name }}</el-breadcrumb-item>">
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 面包屑数据
            menuArr: [],
        };
    },
    created() {
        this.render();
    },
    watch:{
        "$route.path"(v){
        this.render();
        }
    },
    methods: {
    render(){
        //筛选出有meta属性的路由
        let arr=this.$route.matched.filter(v=>{
            return v.meta.title
        });

        this.menuArr=arr.map(v=>{
            return {name:v.meta.title, path:v.path}
        });
    }
}

    

}
</script>

<style>

</style>