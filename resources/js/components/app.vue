<template>
 <v-app id="inspire">

    <app-bar></app-bar>
    <alert-cp></alert-cp>

    <v-content>
      <router-view></router-view>
    </v-content>

    <footer-bar></footer-bar>

  </v-app>
</template>

<script>
const appBar = () => import(/* webpackChunkName: "app-bar" */"./layout/app-bar.vue");
const footerBar = () => import(/* webpackChunkName: "footer" */"./layout/footer-bar.vue");
const alertCp = () => import(/* webpackChunkName: "alert" */"./layout/alert-cp.vue");
    export default {
        data(){
            return{
            
            }
        },
        components:{
            appBar,
            alertCp,
            footerBar
        }
    }
</script>


<style>
    .v-card__title{
        color: primary;
    }
</style>