<template>
  <div class="mainapp" @wheel.prevent="fadeOutGuide">
    <div v-if="showGuide" class="guide">
        <i class="fa fa-arrow-circle-up"></i>
        <span>{{direction}}</span>
        <i class="fa fa-arrow-circle-down"></i>
    </div>
    
    <Login></Login>
    <div class="title">Vue Theater</div>
    <MovieList></MovieList>
    <div class="fixed-control" @click="CheckCartOpen">
      <p><i class="fa fa-shopping-cart"></i><span>{{cart.length}}</span></p>
    </div>
    <MovieInCart></MovieInCart>
    <div class="buybox" v-if="currentMovie" :style="bgImg(currentMovie.cover)"></div>
  </div>
</template>

<script>
import {mapActions,mapMutations,mapState} from 'vuex'
import Login from './login.vue'
import MovieList from './MovieList.vue'
import MovieInCart from './MovieInCart.vue'
export default {
  computed:{
    ...mapState(['currentMovie','cart']),
    direction(){
      console.log(window.innerWidth)
      if(window.innerWidth > 600){
        return 'WHEEL TOP or DOWN to VIEW'
      } else {
        return 'WHEEL LEFT or RIGHT to VIEW'
      }
    }
  },
  components:{
    MovieList,
    MovieInCart,
    Login,
  },
  data(){
    return {
      showGuide : true
    }
  },
  methods:{
    ...mapActions(['getAPI']),
    ...mapMutations(['CheckCartOpen']),
    bgImg(url){
      return {'background-image': 'url('+url+')',
              'background-size': 'cover',
              'background-position': 'center center'}
            },
    fadeOutGuide(){
      this.showGuide = false;
    }
  },
  created(){
    this.getAPI();
  },
  watch: {
    cart(){
      TweenMax.from(".fa-shopping-cart",0.3,{
        scale: 0.5
      })
    }
  },
  mounted(){
      let swipeActive = new Hammer(document.querySelector(".mainapp"));
      let that = this;
      swipeActive.on("pan", function (e) {
              that.showGuide = false;
      })
  }
}
</script>

<style>
  * {
    vertical-align: middle;
    outline: none;
  }

  html, body {
    height: 100%;
    margin: 0;
    font-family: "Roboto", sans-serif;
  }

  .title {
    color:white;
    opacity: .5;
  }

  .mainapp {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(150deg, #222 0%, #111 100%);
    display: flex;
  }
  .mainapp.isCartOpen .cards {
    transform: scale(0.8);
  }
  .mainapp.isCartOpen .fixed-control {
    opacity: 0.9;
  }

  .apptitle {
    position: fixed;
    left: 30px;
    top: 30px;
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
  .buybox {
    width: 50px;
    height: 80px;
    position: fixed;
    right: 30px;
    top: 30px;
    opacity: 0;
  }
  .fixed-control {
    position: fixed;
    right: 30px;
    top: 20px;
    color: white;
    z-index: 1000;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.5s;
  }
  .fixed-control:hover {
    opacity: 1;
  }
  .fixed-control i {
    margin-right: 10px;
    font-size: 30px;
  }  
  .guide {
    width: 100%;
    position: fixed;
    transform:translateY(-50%);
    top:50%;
    font-size: 50px;
    color: rgb(100, 169, 115);
    text-align: center;
    z-index: 3000;
    animation: show 2s infinite;
  }

  @keyframes show {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
