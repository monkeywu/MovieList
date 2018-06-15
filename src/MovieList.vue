<template>
    <div class="movie" @wheel.prevent="wheel($event)"> <!--  -->
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
                TweenMax.to(".cards",0.8,{
                    left: "+="+evt.deltaY*2+"px"
                })
            },
            Hammerwheel(evt){
                TweenMax.to(".cards",0.8,{
                    left: "+="+evt.deltaX*2+"px"
                })
            }
        },
        mounted(){
            let swipeActive = new Hammer(document.querySelector(".movie"));
            let that = this;
            swipeActive.on("pan", function (e) {
                    that.Hammerwheel(e)
            })
        }
    }
</script>