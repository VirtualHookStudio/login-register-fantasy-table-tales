<template>
  <div class="auth-page">
    <br>
    <div class="logo">
      <img src="../../assets/images/logo.png">
      <h1>Fantasy Table Tales</h1>
    </div>
    <div class="wrapper" v-bind:class="{ logActive: logActive }">
      <div class="form-box login">
        <h2>Login</h2>
        <form action="#">
          <div class="input-box">
            <span class="icon"><i class='bx bxs-envelope'></i></span>
            <input v-model="userLogin.email" type="text" maxlength="30" autocomplete="current-username" required>
            <label>Email</label>
            <p ref="emailLogin" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bxs-key'></i></span>
            <input v-model="userLogin.password" type="password" maxlength="40" autocomplete="current-password" required>
            <label>Password</label>
            <p ref="passwordLogin" class="danger"></p>
            <p ref="invalidLogin" class="danger invalid"></p>
          </div>
          <div class="remember-forgot">
            <a href="#">Forgot Password?</a>
          </div>
          <button ref="btnlogin" type="submit" class="btn-login" @click.prevent="onLogin">Login</button>
          <div class="login-register">
            <p>Don't have an account? &nbsp;&nbsp;<a href="#" class="register-link" @click.prevent="changeLogReg"> Register</a></p>
          </div>
        </form>
      </div>
      <div class="form-box register">
        <h2>Register</h2>
        <form action="#">
          <div class="input-box">
            <span class="icon"><i class='bx bx-user'></i></span>
            <input v-model="userRegister.name" type="text" maxlength="30"  autocomplete="current-username" required>
            <label>Username</label>
            <p ref="userRegister" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bxs-envelope'></i></span>
            <input v-model="userRegister.email" type="text" maxlength="40" required>
            <label>Email</label>
            <p ref="emailRegister" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bxs-phone'></i></span>
            <input v-model="userRegister.phone" @input="formatPhone" type="text" maxlength="17" autocomplete="current-phone" required>
            <label>Phone</label>
            <p ref="phoneRegister" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon" @click.prevent="activeSelect()"><i class='bx bx-world'></i></span>
            <select form-select id="userRegisterCountry" required @change.prevent="changeStates">
              <option selected>Country</option>
              <option v-for="(countries, c) in countries" :key="c" :value="countries.id">{{ countries.name }}</option>
            </select>
            <p ref="countryRegister" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bxs-key'></i></span>
            <input v-model="userRegister.password" type="password" maxlength="40"  autocomplete="current-password" required>
            <label>Password</label>
            <p ref="passwordRegister" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bxs-lock'></i></span>
            <input v-model="userRegister.confirmPassword" type="password" maxlength="40"  autocomplete="current-confirmpassword" required>
            <label>Confirm Password</label>
            <p ref="confirmPasswordRegister" class="danger"></p>
            <p ref="passwordsNotSame" class="danger invalid"></p>
          </div>
          <div class="agree-terms">
            <label><input v-model="userRegister.checkbox" type="checkbox">Agree with the <a href="#" class="register-link" @click.prevent="onShow"> Terms and Conditions</a></label>
            <p ref="termConditionRegister" class="danger"></p>
          </div>
          <button ref="btnregister" type="submit" class="btn-login" @click.prevent="onRegister">register</button>
          <div class="login-register">
            <p>Already have an account? &nbsp;&nbsp;<a href="#" class="register-link" @click.prevent="changeLogReg"> Login</a></p>
          </div>
        </form>
      </div>
    </div>
    <span ref="spanli"></span>
    <div class="modal fade modal-lg" id="modal-term-condition" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>
                  Welcome to Fantasy Table Tales! Before proceeding with registration, we kindly ask you to carefully read the following terms 
                  and conditions. By registering on our site, you agree to comply with these terms and to adhere to the guidelines set for using the platform.
                </p>
                <p>
                  Collection of Personal Information:
                  By registering on our site, you agree to provide accurate and complete information, including your name, CPF, 
                  telephone number, email address, and password. These details are essential to ensure a personalized and secure 
                  experience within our virtual environment.
                </p>
                <p>
                  Responsible Use:
                  You commit to using our platform responsibly and respectfully. It is not allowed to share offensive, discriminatory, 
                  illegal, or content that violates the rights of third parties.
                </p>
                <p>
                  Privacy and Security:
                  We value your privacy and take measures to protect your personal information. Your data will be used in accordance 
                  with our Privacy Policy. We will not share your information with third parties without your consent.
                </p>
                <p>
                  Intellectual Property:
                  You acknowledge that all content available on our platform, including text, images, graphics, and software, is protected 
                  by copyrights and intellectual property rights. You agree to respect these rights and not reproduce, distribute, or modify content without authorization.
                </p>
                <p>
                  Creation of RPG Tables:
                  Our site's primary purpose is to provide a space for creating and managing RPG tables. By using this functionality, 
                  you agree to maintain a friendly and respectful environment for all players involved.
                </p>
                <p>
                  Individual Responsibility:
                  You are responsible for keeping your access information confidential, including your password. In case of any 
                  unauthorized activity on your account, we recommend informing us immediately.
                </p>
                <p>
                  Changes to Terms:
                  We reserve the right to update or modify these terms and conditions at any time. Any changes will be communicated through our site or via email.
                </p>
                <p>
                  By registering on our site, you affirm that you have read, understood, and agreed to the terms and conditions presented 
                  here. If you do not agree with these terms, please do not proceed with registration. Thank you for being a part of our RPG table creation community!
                </p>
                <p>
                  If you have any questions or need clarification, please contact us through the support channels provided on our site.
                </p>
                <p>
                  Last updated: 08/29/2023
                </p>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from 'bootstrap';
import { toast } from 'vue3-toastify';

import { baseApiUrl, userKey, message } from '@/global';
import axios from 'axios';

export default {
  name: 'AuthPage',
  data: function() {
    return {
      logActive: true,
      countries: {},
      userLogin: {},
      userRegister: {}
    }
  },
  methods: {
    effectWave(eX, eY, btn){
      const buttonRect = this.$refs[btn].getBoundingClientRect();

      let ripples = document.createElement('span')
      ripples.style.left = (eX - buttonRect.left) + 'px'
      ripples.style.top = (eY - buttonRect.top) + 'px'
      ripples.className = 'span-light'
      this.$refs[btn].appendChild(ripples)

      setTimeout(() => {
        ripples.remove()
        }, 1000)
    },
    myModal(){
      let myModal = new Modal(document.getElementById('modal-term-condition'))
      return myModal
    },
    onShow() {
      this.myModal().show()
    },
    onHide(){
      document.getElementsByClassName('modal-backdrop')[0].remove()
      this.myModal().hide()
    },
    changeLogReg(){
      this.logActive = !this.logActive
    },
    formatPhone() {
      let value = this.userRegister.phone.replace(/\D/g, "");
      this.userRegister.phone = value.replace(/^(\d{2})(\d{5})(\d{4,6})$/, "($1) $2-$3");
    },
    onLogin(event){
      this.effectWave(event.clientX, event.clientY, 'btnlogin')
      axios.post(`${baseApiUrl}/signin`, this.userLogin)
        .then(res => {
          this.$store.commit('setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          localStorage.setItem(message, JSON.stringify('Login Success!'))
          this.$router.push({path: '/'})
        }).catch((e) => {
          var p = this.$refs
          e.response.data == 'Email required!' ? p.emailLogin.innerText = e.response.data : p.emailLogin.innerText = ''
          e.response.data == 'Password required!' ? p.passwordLogin.innerText = e.response.data : p.passwordLogin.innerText = ''
          e.response.data == 'Invalid Email or Password!' ? p.invalidLogin.innerText = e.response.data : p.invalidLogin.innerText = ''
        })
    },
    onRegister(event){
      this.effectWave(event.clientX, event.clientY, 'btnregister')
      this.userRegister.country_id = document.getElementById('userRegisterCountry').value
      axios.post(`${baseApiUrl}/signup`, this.userRegister)
        .then(() => {
          this.$router.push({path: '/validateaccountpage'})
        }).catch((e) => {
          var p = this.$refs
          if(e.response.data == 'Username required!' || e.response.data == 'Username must contain at leats 4 digits!' || e.response.data == 'Username already exist!') {
            p.userRegister.innerText = e.response.data
          }else{
            p.userRegister.innerText = ''
          }
          if(e.response.data == 'Email required!' || e.response.data == 'Email invalid!' || e.response.data == 'Email already registered!') {
            p.emailRegister.innerText = e.response.data
          }else{
            p.emailRegister.innerText = ''
          }
          if(e.response.data == 'Phone required!' || e.response.data == 'Phone invalid!' || e.response.data == 'Phone already registered!') {
            p.phoneRegister.innerText = e.response.data
          }else{
            p.phoneRegister.innerText = ''
          }
          e.response.data == 'Country required!' ? p.countryRegister.innerText = e.response.data : p.countryRegister.innerText = ''
          if(e.response.data == 'Password required!' || e.response.data == 'Password must have 8 digits!' || e.response.data == 'Password must contain at least one number and one letter!') {
            p.passwordRegister.innerText = e.response.data
          }else{
            p.passwordRegister.innerText = ''
          }
          
          e.response.data == 'Confirm Password required!' ? p.confirmPasswordRegister.innerText = e.response.data : p.confirmPasswordRegister.innerText = ''
          if(e.response.data == 'Passwords not the same!' || e.response.data == 'Error regex!'){
            p.passwordsNotSame.innerText = e.response.data
          }else{
            p.passwordsNotSame.innerText = ''
          }
          e.response.data == 'Terms and Conditions required!' ? p.termConditionRegister.innerText = e.response.data : p.termConditionRegister.innerText = ''
        })
    }
  },
  mounted() {
    this.myModal()

    axios.get(`${baseApiUrl}/getCountries`)
      .then(res => {
        this.countries = res.data
      })
      
    let me = localStorage.getItem(message)
    if(me != 'undefined'){
      toast.success(me, {
        autoClose: 3000,
        theme: 'colored',
      })
      localStorage.setItem(message, JSON.stringify())
      window.location.reload()
    }
  }
}
</script>

<style>
  .logo {
    color: var(--clr-primary);
    text-align: center;
  }

  .logo img{
    margin-top: 10px;
    width: 200px;
  }

  .logo h1 {
    position: relative;
    top: -30px;
    text-shadow: -2px -2px 0 black
  }

  .wrapper.logActive .form-box.login {
    display: block;
    transform: translateX(0px);
    transition: transform .2s ease;
  }

  .wrapper .form-box.login {
    display: none;
    transform: translateX(-400px);
    transition: transform .2s ease;
  }


  .wrapper .form-box.register {
    margin: 10px 0 0 0;
    transform: translateX(0px);
    transition: transform .2s ease;
  }

  .wrapper.logActive .form-box.register {
    position: absolute;
    display: none;
    transform: translateX(500px);
    transition: transform .2s ease;
  }

  .wrapper.logActive {
    height: 450px;
    width: 500px;
    transition: all .2s ease;
  }

  .wrapper {
    margin: 50px 0 0 0;
    height: 600px;
    width: 600px;
    background: rgba(0, 0, 0, .3);
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s ease;
  }

  .wrapper .form-box {
    width: 100%;
    padding: 40px;
  }

  .register form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 100%;
    margin: 0 auto;
  }

  .form-box h2 {
    font-size: 2em;
    color: var(--clr-primary);
    text-align: center;
  }

  .input-box {
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid var(--clr-primary);
    margin: 45px 0;
  }

  .register .input-box {
    position: relative;
    width: 48%;
    height: 50px;
    border-bottom: 2px solid var(--clr-primary);
    margin: 30px 0;
    transition: all .2s ease;
  }

  .input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: var(--clr-primary);
    font-weight: 500;
    pointer-events: none;
    transition: .5s;
  }

  .input-box input:focus~label,
  .input-box input:valid~label {
    top: -5px;
  }

  .input-box input {
    font-size: 1em;
    color: var(--clr-primary);
    font-weight: 300;
    padding: 0 35px 0 5px;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
  }

  .input-box select {
    font-size: 1em;
    color: var(--clr-primary);
    font-weight: 300;
    padding: 0 35px 0 5px;
    width: 100%;
    height: 100%;
    background: var(--clr-secundary);
    border-radius: 20px;
    border: none;
    outline: none;
    appearance: none;
  }

  .input-box .icon {
    position: absolute;
    right: 8px;
    font-size: 1.2em;
    color: var(--clr-primary);
    line-height: 57px;
  }

  .remember-forgot {
    text-align: right;
    font-size:  .9em;
    color: var(--clr-primary);
    font-weight: 500;
    margin: -15px 0 15px;
  }

  .remember-forgot a {
    color: var(--clr-primary);
    accent-color: var(--clr-primary);
    text-decoration: none;
  }

  .login-register p a:hover,
  .agree-terms a:hover {
    text-decoration: underline;
  }

  .btn-login {
    font-size: 1em;
    font-weight: 400;
    color: var(--clr-primary);
    width: 100%;
    height: 50px;
    letter-spacing: 3px;
    background: var(--clr-gradient);
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }

  .login-register {
    width: 100%;
    font-size: .9em;
    color: var(--clr-primary);
    text-align: center;
    font-weight: 300;
    margin: 25px 0 10px;
    position: relative;
    overflow: hidden;
  }

  .login-register p a {
    color: var(--clr-primary);
    text-decoration: none;
    font-weight: 400;
  }

  .agree-terms {
    width: 100%;
    font-size: .9em;
    color: var(--clr-primary);
    font-weight: 500;
    margin: 15px 0 30px;
    display: flex;
    justify-content: space-between;
  }

  .agree-terms label input {
    accent-color: var(--clr-primary);
    margin-right: 3px;
  }

  .agree-terms a {
    color: var(--clr-primary);
    text-decoration: none;
  }

  .danger {
    font-size: .9em;
    margin-top: 2px;
    color: red;
    font-weight: 200;
    transition: all .8s ease;
  }

  .invalid {
    text-align: center;
  }

  .modal-header {
    background-color: var(--clr-primary);
  }

  .modal-body {
    background-color: var(--clr-secundary);
  }

  .modal-body p{
    font-family: "Arial";
  }

  .span-light {
    left: 0;
    top: 0;
    position: absolute;
    background: #fff;
    transform: translate(-50%, -50%);
    pointer-events: none;
    border-radius: 50%;
    animation: animate 1s linear infinite;
  }

  @keyframes animate {
    0%{
      width: 0px;
      height: 0px;
      opacity: 0.5;
    }
    100%{
      width: 600px;
      height: 600px;
      opacity: 0;
    }
  }

  @media (max-width: 600px) {
    .register form {
      display: block;
    }

    .register .input-box {
      width: 100%;
    }

    .wrapper {
      height: 770px;
      width: 350px;
    }

    .wrapper.logActive {
      width: 350px;
    }

    .wrapper .form-box.login {
      width: 350px;
    }

    .wrapper .form-box.register {
      margin-top: 10px;
    }
  }
</style>