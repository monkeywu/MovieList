<template>
<div class="control" :class="{show: isCartOpen}">
    <div class="panel animated fadeIn"><i class="fa fa-shopping-cart" style="font-size: 40px;"></i>
      <div class="close" @click="CheckCartOpen()">
        close
        <div class="bottom"></div>
      </div>
      <h2>My Movie Cart</h2>
      <ul class="aa" @wheel.prevent="wheel($event)">
        <li v-for="(movie,mid) in cart">
          <div class="thumbnail" :style="bgImg(movie.cover)"></div>
          <h3>{{movie.name}}
            <div class="price">{{movie.price}}$</div>
            <div class="remove" @click="cart.splice(mid,1);moviecart.splice(mid,1)">-</div>
          </h3>
        </li>
        <li v-if="!cart.length"> 
          <h3>Your cart is empty! :(</h3>
        </li>
      </ul>
      <hr/>
      <h2>{{totalPrice}}$</h2>
    </div>
</div>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex'
    export default {
        computed:{
            ...mapState(['cart','isCartOpen','moviecart']),
            ...mapGetters({totalPrice:'totalPrice'})
        },
        methods:{
          Hammerwheel(evt){
                TweenMax.to(".panel",0.8,{
                    top: "+="+evt.deltaY+"px"
                })
          },
          wheel(evt){
            TweenMax.to(".panel",0.8,{
                    top: "+="+evt.deltaY*1.2+"px"
                })
          },
          bgImg(url){
            return {'background-image': 'url('+url+')',
                    'background-size': 'cover',
                    'background-position': 'center center'}
            },
          ...mapMutations(['CheckCartOpen']),  
        },
        mounted(){
            let swipeActive = new Hammer(document.querySelector(".aa"));
            let that = this;
            swipeActive.on("pan", function (e) {
                    that.Hammerwheel(e)
            })
        }
    }
</script>

<style>
  .control {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(10deg, #111 0%, #111 50%, transparent 100%);
    color: #eee;
    padding: 5vmin;
    box-sizing: border-box;
    transition: 0.5s;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0px 5px 25px 5px rgba(0, 0, 0, 0.25);
  }
  .control .panel {
    width: 70%;
    position: relative;
  }
  .control ul {
    padding: 0;
    list-style: none;
  }
  .control ul li {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    transition: 0.5s;
    cursor: pointer;
  }
  .control ul li:hover {
    transform: translateY(-10px);
    background-color: rgba(255, 255, 255, 0.1);
  }
  .control ul li h3 {
    font-size: 17px;
    font-weight: normal;
    display: inline-block;
    opacity: 0.8;
    width: calc( 100% - 100px);
  }
  .control ul li .thumbnail {
    width: 50px;
    height: 70px;
    display: inline-block;
    margin-right: 20px;
  }
  .control.show {
    opacity: 1;
    pointer-events: initial;
  }
  .control .price {
    float: right;
  }
  .control .remove {
    display: inline-block;
    padding: 4px 15px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.3);
    opacity: 0.5;
    font-size: 14px;
    margin-left: 10px;
    transition: 0.5s;
  }
  .control .remove:hover {
    background-color: #ef5353;
    color: black;
    opacity: 1;
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-weight: bold;
    cursor: pointer;
    font-size: 20px;
    opacity: .8;
    transition: opacity 0.5s;
  }

  .close:hover {
    opacity: 1;
  }

  .close:hover .bottom {
    width:100%;
    opacity: 1;
  }

  .bottom {
    position: absolute;
    height: 2px;
    width: 0;
    background-color:white;
    opacity: .8;
    transition: .5s;
  }
</style>
