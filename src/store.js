import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const URL = 'https://monkeywu.github.io/movie-data/';
const store = new Vuex.Store({
    state:{
        cart:[],
        movies:[],
        isCartOpen:false,
        currentMovie:true,
        moviecart:[]
    },
    mutations:{
        CheckCartOpen(state){
            state.isCartOpen = !state.isCartOpen
        },
        setCart(state,rs){
            state.movies = rs 
        },
        addCurrent(state,movie){
            state.currentMovie = movie.movie;
            let evt = movie.$event;
            state.moviecart.push(movie.movie)
            TweenMax.from(".buybox",0.8,{
                left: $(evt.target).offset().left,
                top: $(evt.target).offset().top,
                opacity: 1,
                ease: Power1.easeIn});
            setTimeout(()=>{
                state.cart.push(movie.movie)
                },800)
        },
        /*isMovieInCart(state,movie){
            let x = state.moviecart
            console.log(state.moviecart.findIndex((x)=>{
                return x.id === movie.id
            }))
            
        }*/
    },
    actions:{
        getAPI({commit}){
        fetch(URL)
        .then(rs => rs.json())
        .then(rs => {
            commit('setCart',rs);
        });
        },
     },
     getters:{
        totalPrice(state){
            return state.cart
              .map(movie=>movie.price)
              .reduce((total,p)=>total+p,0)
          },
        /*isMovieInCart: state => movie => (
            state.moviecart.findIndex((id) => (
                id === movie.id
            )) !== -1
        )*/
        isMovieInCart(state){
            return function(movie){
                let x = state.moviecart
                return state.moviecart.findIndex((x)=>{
                    return x.id === movie.id
                }) !== -1
            }
        }
     }
})

export default store;