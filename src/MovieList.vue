<template>
    <div class="movie" @wheel.prevent="!isCartOpen&&wheel($event)">
        <div class="cards">
            <Card
            v-for="movie in movies"
            :movie="movie"
            ></Card>
        </div>
    </div>
</template>

<style scoped>
    .movie {
        flex: 1;
        overflow: hidden !important;
        position: relative;
        
    }

    .cards {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        justify-content: left;
        flex-wrap: nowrap;
        margin-left: 20vw;
        margin-right: 20vw;
        transition: 0.5s, left 0s;
        position: relative;
    }
</style>

<script>
    import Card from './Card.vue'
    import {mapState} from 'vuex'
    export default {
        data(){
            return {
                check:true
            }
        },
        components:{
            Card,
        },
        computed:{
            ...mapState(['movies','cart','isCartOpen']),
        },
        methods:{
            bgImg(url){
            return {'background-image': 'url('+url+')',
                    'background-size': 'cover',
                    'background-position': 'center center'}
            },
            wheel(evt){
                console.log(123)
                TweenMax.to(".cards",0.8,{
                    left: "+="+evt.deltaY*2+"px"
                })
            },
        },
    }
</script>