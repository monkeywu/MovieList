<template>
    <div class="card fadeIn animated">
        <div class="left">
            <div class="left zoomIn animated">
                <div class="cover" :style="bgImg(movie.cover)"></div>
            </div>
        </div>

        <div class="right">
            <h2>{{ movie.name }}</h2>
            <h4>{{ movie.type }}</h4>
            <p v-html="movie.description"></p>
            <div class="price">{{movie.price}}$</div>
            <button :class="btnClass" @click="!check&&addCurrent({movie,$event});">{{label}}</button>
        </div>
    </div>
</template>

<style>
    .card {
        margin: 60px;
        display: inline-flex;
        width: 460px;
        height: auto;
        flex-shrink: 0;
        box-shadow: 0px 5px 25px 5px rgba(0, 0, 0, 0.25);
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 5px;
        padding: 20px;
        padding-bottom: 0;
        color: #827f8e;
        transition: 0.5s;
        cursor: pointer;
    }
    .card .left {
        flex: 1;
    }
    .card .left .cover {
        width: 180px;
        height: 240px;
        top: -50px;
        border-radius: 5px;
        position: relative;
        transition: 0.5s 0.1s;
        box-shadow: 0px 5px 25px 5px rgba(0, 0, 0, 0.25);
    }
    .card .right {
        flex: 2;
        padding: 20px;
        padding-top: 10px;
        padding-bottom: 0;
    }
    .card .right h2 {
        margin: 0;
        font-weight: bold;
        font-size: 24px;
        color: #444;
    }
    .card .right h4 {
        margin-top: 10px;
        margin-bottom: 10px;
        opacity: 0.8;
        font-weight: normal;
    }
    .card .right p {
        font-size: 13px;
        line-height: 1.3;
        text-align: justify;
        opacity: 0.8;
        min-height: 5em;
    }
    .card .right .price {
        display: inline-block;
        margin-right: 20px;
    }
    .card .right button {
        padding: 5px 10px;
        background-color: #bbb;
        color: rgba(255, 255, 255, 0.9);
        border-radius: 50px;
        cursor: pointer;
        transition: 0.5s;
    }
    .card .right button:hover {
        color: white;
        background-color: #ef654a;
    }
    .card:hover {
        transform: translateY(-10px);
    }
    .card:hover .left .cover {
        transform: translateY(-10px);
    }
    .cover {
        width: 180px;
        height: 240px;
        top: -50px;
        border-radius: 5px;
        position: relative;
        transition: 0.5s 0.1s;
        box-shadow: 0px 5px 25px 5px rgba(0, 0, 0, 0.25);
    }
    .card button.bought {
        background-color:#444;
    }
</style>

<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'
    export default {
        computed:{
            ...mapState(['movies','cart']),
            ...mapGetters(['isMovieInCart']),
            check(){
                return this.isMovieInCart(this.movie)
            },
            btnClass(){
                return {
                    add:true,
                    bought:this.check,
                }
            },
            label(){
                return (
                    this.check ?'Already In Cart': '+ Add To My Cart'
                )
            }
        },
        props:['movie'],
        methods:{
            ...mapMutations(['addCurrent']),
            bgImg(url){
            return {'background-image': 'url('+url+')',
                    'background-size': 'cover',
                    'background-position': 'center center'}
            },
        },
    }
</script>