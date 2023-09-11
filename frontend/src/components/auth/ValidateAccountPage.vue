<template>
  <div class="validate-account-page">
    <br>
    <div class="logo">
      <img src="../../assets/images/logo.png">
      <h1>Fantasy Table Tales</h1>
    </div>
    <div class="validate-box">
      <form action="#">
        <div class="key-box">
          <label>A message with the code has been sent to your email.</label>
          <h3>Key Validation:</h3>
          <input v-model="keyValidate" type="text" required>
          <p ref="invalidKey" class="danger"></p>
        </div>
        <button type="submit" class="btn-validate" @click="onValidateAccount">Validate Account</button>
      </form>
    </div>
  </div>
</template>
    
<script>
import { baseApiUrl, message } from '@/global';
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
  name: 'ValidateAccountPage',
  data: function() {
    return {
        keyValidate: null,
    }
  },
  methods: {
    onValidateAccount() {
      axios.post(`${baseApiUrl}/validateAccount`, {keyValidate: this.keyValidate})
        .then(() => {
          localStorage.setItem(message, JSON.stringify('Account validate Success!'))
          this.$router.push({path: '/authpage'})
        }).catch((e) => {
          var p = this.$refs
          e.response.data == 'Invalid Key!' ? p.invalidKey.innerText = e.response.data : p.invalidKey.innerText = ''
        })
    }
  },
  mounted(){
    let me = localStorage.getItem(message)
    if(me != 'undefined'){
      toast.success(me, {
        autoClose: 3000,
        theme: 'colored',
      })
      localStorage.setItem(message, JSON.stringify())
    }
  }
}
</script>
  
<style>
  .logo-content .logo i {
    font-size: 28px;
    margin-right: 5px;
  }

  .logo-content .logo .logo_name {
    font-size: 20px;
    font-weight: 400;
  }

  .validate-box {
    margin: 50px 0 0 0;
    height: 340px;
    width: 500px;
    padding: 0 30px 0 30px;
    background: rgba(0, 0, 0, .3);
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    text-align: center;
    align-items: center;
    transition: all .2s ease;
  }

  .key-box {
    position: relative;
    top: 60px;
    width: 100%;
    height: 70px;
  }

  .key-box label {
    position: relative;
    bottom: 25px;
    font-size: 1em;
    color: #49667c;
    font-weight: 500;
    pointer-events: none;
    transition: .5s;
  }

  .key-box h3{
    color: #49667c;
  }

  .key-box input {
    font-size: 3em;
    text-align: center;
    color: #49667c;
    font-weight: 300;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    border-radius: 20px;
    border: none;
    outline: none;
  }

  .danger{
    font-size: .9em;
    margin-top: 2px;
    color: red;
    font-weight: 200;
    transition: all .8s ease;
  }

  .btn-validate {
    margin-top: 180px;
    font-size: 1em;
    font-weight: 500;
    color: #010026;
    width: 70%;
    height: 45px;
    background: #49667c;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all .2s ease;
  }

  @media (max-width: 520px) {
    .validate-box {
      margin: 50px 0 0 0;
      height: 420px;
      width: 300px;
      transition: all .2s ease;
    }

    .btn-validate {
      margin-top: 260px;
      transition: all .2s ease;
    }
  }
</style>