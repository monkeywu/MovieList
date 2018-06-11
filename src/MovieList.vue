<template>
    <div class="movie" @wheel.prevent="wheel($event)">
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
        overflow: hidden;
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
        components:{
            Card,
        },
        computed:{
            ...mapState(['movies','cart']),
        },
        methods:{
            bgImg(url){
            return {'background-image': 'url('+url+')',
                    'background-size': 'cover',
                    'background-position': 'center center'}
            },
            wheel(evt){
                TweenMax.to(".cards",0.8,{
                    left: "+="+evt.deltaY*2+"px"
                })
            },
            check(){
                return this.isMovieInCart(this.movie)
            }
        },
    }
</script>