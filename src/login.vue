<template>
    <div class="main">
        <div v-if="!hasLogin" class="log" @click="login">LogIn</div>
        <div v-else class="log" @click="logout">LogOut</div>
        <div v-if="hasLogin" class="username">Hello! {{username}}</div>
        <div class="member fadeIn animated" v-if="showMember">
            <div class="acc">
                <div>TYPE YOUR ACCOUNT :)</div>
                <input type="text" placeholder="TYPE YOUR ACCOUNT HERE!" v-model="acc" @click="clear">
                <div class="warn" v-if="warn">THIS NAME HAS BEEN REGISTERED!</div>
                <div class="warn" v-if="wrongAcc">WRONG ACCOUNT!</div>
            </div>

            <div class="pass">
                <div>TYPE YOUR PASSWORD :)</div>
                <input type="password" placeholder="TYPE YOUR PASSWORD HERE!" v-model="pass" @click="clear;">
                <div class="passwarn" v-if="passwarn">EMPTY PASSWORD!</div>
                <div class="passwarn" v-if="wrongPass">WRONG PASSWORD</div>
            </div>

            <div class="register" @click="register">
                SIGN UP!
            </div>

            <div class="signIn" @click="signIn">
                SIGN IN!
            </div>

            <div class="cancel" @click="close();clear()">
                CANCEL
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.log {
    position: fixed;
    left: 15%;
    top: 0%;
    color: #fff;
    z-index: 1000;
    cursor: pointer;
    opacity: .5;
    transition: .5s;
}

.log:hover {
    opacity: 1;
}

.username {
    position: fixed;
    left: 25%;
    top: 0%;
    color: #fff;
    z-index: 1000;
    opacity: .5;
    transition: .5s;
}

.username:hover {
    opacity: 1;
}

.member {
    width:50%;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #f2f2f2;;
    opacity: .9;
    z-index: 2000;
    border-radius: 20px;
}

.member {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
}

.acc,.pass {
    margin-top: 50px;
}

input {
    width: 70%;
    height: 30px;
    background-color: #f2f2f2;
    opacity: .9;
    border: none;
}

input::-webkit-input-placeholder {
    text-align: center;
}

.register,.signIn,.cancel {
    margin-top: 30px;
    border: 2px solid black;
    width: 40%;
    margin: 30px auto 0;
    border-radius: 10px;
    cursor: pointer;
    transition: .5s
}

.register:hover,.signIn:hover,.cancel:hover {
    background-color:black;
    color:white;
}

.warn,.passwarn {
    font-size: 16px;
    color:red;
    text-align: center;
}

</style>

<script>
    export default {
        data(){
            return {
                showMember:false,
                acc:'',
                pass:'',
                warn:false,
                passwarn:false,
                hasLogin:false,
                wrongAcc:false,
                wrongPass:false,
                arr:[],
                username:'',
                
            }
        },
        methods:{
            clear(){
                this.warn = false;
                this.passwarn =false;
                this.wrongAcc = false;
                this.wrongPass = false;
                this.acc = '';
                this.pass = '';
            },
            login(){
                this.showMember = true
            },
            logout(){
                this.hasLogin = false
            },
            close(){
                this.showMember = false
            },
            register(){
                let checkAcc = this.arr.filter((x)=>{
                    return x.acc === this.acc
                })
                let acc = this.acc;
                let pass = this.pass;
                let that =this;
                if(this.pass === ''){
                    this.passwarn = true;
                    return false;
                } else {
                    this.passwarn = false;
                }
                console.log(checkAcc)
                if(checkAcc.length !== 0){
                    this.warn = true
                } else {
                    firebase.database().ref('member').push({'acc':acc,'pass':pass})
                    that.showMember = false;
                    that.hasLogin = true;
                    that.username = acc;
                    that.acc = '';
                    that.pass = '';
                }
            },
            signIn(){
                //檢查密碼是否沒輸入
                if(this.pass === ''){
                    this.passwarn = true;
                    return false
                }
                
                let checkAccPass = this.arr.filter((arr)=>{
                    return (arr.pass === this.pass &&arr.acc ===this.acc)
                })


                let checkAcc = this.arr.filter((arr)=>{
                    return (arr.acc === this.acc)
                })
                console.log(checkAcc)
                let checkPass; 
                
                if(checkAcc.length !== 0){
                    checkPass = this.arr.filter((arr)=>{
                        return (arr.acc === this.acc && arr.pass !== this.pass)
                    }) 
                } else {
                    this.wrongAcc = true;
                    return false
                }

                if(checkPass.length !==0){
                    this.wrongPass = true;
                    return false;
                } 
                
                if(checkAccPass.length!==0){
                    this.acc = '';
                    this.pass = '';
                    this.username = checkAccPass[0].acc;
                    this.showMember = false;
                    this.hasLogin = true;
                }
            },
        },
        mounted(){
                let check;
                let that = this;
                firebase.database().ref('member').once('value',function(snapshot){
                    for(check in snapshot.val()){
                        that.arr.push(snapshot.val()[check])
                    }
                })
            },
    }
</script>