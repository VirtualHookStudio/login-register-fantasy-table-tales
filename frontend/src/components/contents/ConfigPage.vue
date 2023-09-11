<template>
  <div class="config-page p-4 text-center rounded-5 m-3"  v-bind:class="{ passDesactive: passDesactive }">
    <h1 class="mt-3">Account configuration</h1>
    <hr>
    <div class="form-box edit">
      <p class="h4">Account data: {{user.created_at}}</p>
      <form action="#" novalidate>
        <input id="user-id" type="hidden" v-model="user.id">
          <div class="box-icon">
            <p ref="iconAlert" class="danger"></p>
            <img class="img-user" :src="previewImage" alt="">
            <input type="file" ref="imageFileInput" id="user-img-location" accept = ".jpg, .png, .jpeg" @change="onImageSelected" hidden>
            <div class="btn-icon">
              <button class="btn btn-primary" @click.prevent="openFileInput">Upload Image</button>
              <button class="btn btn-danger" @click.prevent="resetPreview">Cancel Image</button>
            </div>
            <p ref="iconFail" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bx-user'></i></span>
            <input v-model="user.name" type="text" maxlength="30" autocomplete="current-username" required>
            <label>Username</label>
            <p ref="userEdit" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bxs-envelope'></i></span>
            <input v-model="user.email" type="text" maxlength="40" required>
            <label>Email</label>
            <p ref="emailEdit" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon"><i class='bx bxs-phone'></i></span>
            <input v-model="user.phone" @input="formatPhone" type="text" maxlength="17" autocomplete="current-phone" required>
            <label>Phone</label>
            <p ref="phoneEdit" class="danger"></p>
          </div>
          <div class="input-box">
            <span class="icon" @click.prevent="activeSelect()"><i class='bx bx-world'></i></span>
            <select id="userEditCountry" v-model="user.country_id" required @change.prevent="changeStates">
              <option selected>Country</option>
              <option v-for="(countries, c) in countries" :key="c" :value="countries.id">{{ countries.name }}</option>
            </select>
            <p ref="countryEdit" class="danger"></p>
          </div>
          <div class="pass-box">
            <button class="btn btn-primary" @click.prevent="onpass">Change Password</button>
          </div>
          <div class="input-box" v-bind:class="{ passDesactive: passDesactive }">
            <span class="icon"><i class='bx bxs-key'></i></span>
            <input v-model="user.password" type="password" maxlength="40" autocomplete="current-password" required>
            <label>Password</label>
            <p ref="passwordEdit" class="danger"></p>
          </div>
          <div class="input-box" v-bind:class="{ passDesactive: passDesactive }">
            <span class="icon"><i class='bx bxs-lock'></i></span>
            <input v-model="user.confirmPassword" type="password" maxlength="40" autocomplete="current-confirmpassword" required>
            <label>Confirm Password</label>
            <p ref="confirmPasswordEdit" class="danger"></p>
            <p ref="passwordsNotSame" class="danger invalid"></p>
          </div>
          <button ref="btnedit" type="submit" class="btn-login" @click.prevent="onEditPassEmail">Edit Account</button>
        </form>
    </div>
    <div class="modal modal-lg" id="modal-cropper" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="applyCrop">Choose Image</button>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <vue-cropper  ref="cropper"  alt="Source Image" :src="canvas" :zoomable="false" :background="false" :aspectRatio="1"/>
              </div>
          </div>
      </div>
    </div>
    <div class="modal fade" id="email-change-modal" tabindex="-1" aria-labelledby="dangerModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn btn-danger" @click="onEdit">Edit Account</button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            If you change your e-mail, you will be logged out and an account confirmation code will be sent to your e-mail address.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import {Modal} from 'bootstrap';
import VueCropper from 'vue-cropperjs';

import {baseApiUrl, userKey, message} from '@/global';
import axios from 'axios';

export default {
  name: 'ConfigPage',
  components: { VueCropper},
  data: function() {
    return {
      passDesactive: true,
      previewImage: null,
      canvas: null,
      changeEmail: null,
      user: {},
      countries: {},
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
    loaduser(){
      const url = `${baseApiUrl}/userprofile`
      axios.get(url).then(res => {
        this.user = res.data
        this.changeEmail = this.user.email
        this.resetPreview()
      })
    },
    resetPreview(){
      this.user.img_verify = false
      this.$refs.imageFileInput.value = ''
      if(!this.user.user_icon){
        this.previewImage = require('@/assets/images/user_icon_default.png')
      }else{
        this.previewImage = "data:image/png;base64," + this.user.user_icon
      }
    },
    myModal(nameModal){
      let myModal = new Modal(document.getElementById(nameModal))
      return myModal
    },
    onShow(nameModal) {
      this.myModal(nameModal).show()
    },
    onHide(nameModal){
      document.getElementsByClassName('modal-backdrop')[0].remove()
      this.myModal(nameModal).hide()
    },
    formatPhone() {
      let value = this.user.phone.replace(/\D/g, "");
      this.user.phone = value.replace(/^(\d{2})(\d{5})(\d{4,6})$/, "($1) $2-$3");
    },
    onpass(){
      this.passDesactive = !this.passDesactive
    },
    openFileInput(){
      this.$refs.imageFileInput.value = ''
      this.$refs.imageFileInput.click()
    },
    onImageSelected(event){
      const imgFile = event.target.files[0]
      
      try{
        if(!event && !imgFile) throw 'abc'
        if(!imgFile.name.endsWith('.jpg') && !imgFile.name.endsWith('.png') && !imgFile.name.endsWith('.jpeg')) throw 'Choose an archive JPG or PNG!'
        
        let reader = new FileReader;
        reader.onload = (e) => {
          const base64 = e.target.result.toString()
          const bytesSize = (base64.length * (3 / 4)) - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
          if(bytesSize / 1024 > 2000) throw 'Image size limit: 2MB'

          this.canvas = e.target.result
          this.$refs.cropper.replace(e.target.result)
        }
        reader.readAsDataURL(this.$refs.imageFileInput.files[0]);
        this.onShow('modal-cropper')
      }catch(msg){
        this.$refs.iconAlert.innerText = msg
        this.removeFileInput()
      }
    },
    applyCrop() {
      const cropper = this.$refs.cropper;
      if (cropper) {
        this.previewImage = cropper.getCroppedCanvas().toDataURL('image/jpeg');
        this.user.img_verify = true
      }
    },
    onEditPassEmail(event){
      this.effectWave(event.clientX, event.clientY, 'btnedit')
      if(this.changeEmail !== this.user.email){
        this.onShow('email-change-modal')
      }else{
        this.onEdit()
      }
    },
    onEdit(){
      this.user.country_id = document.getElementById('userEditCountry').value
      
      if(this.previewImage !== '/img/user_icon_default.ec1bae60.png') this.user.user_icon = this.previewImage

      axios.post(`${baseApiUrl}/signup`, this.user)
        .then((e) => {
          if(e.status === 205){
            localStorage.setItem(message, JSON.stringify('Account edit Success!'))
            this.onHide('email-change-modal')
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({path: '/validateaccountpage'})
          }else{
            this.$router.push({path: '/'})
            window.location.reload()
          }
        }).catch((e) => {
          var p = this.$refs
          if(e.response.data == 'Username required!' || e.response.data == 'Username must contain at leats 4 digits!' || e.response.data == 'Username already exist!') {
            p.userEdit.innerText = e.response.data
          }else{
            p.userEdit.innerText = ''
          }
          if(e.response.data == 'Email required!' || e.response.data == 'Email invalid!' || e.response.data == 'Email already registered!') {
            p.emailEdit.innerText = e.response.data
          }else{
            p.emailEdit.innerText = ''
          }
          if(e.response.data == 'Phone required!' || e.response.data == 'Phone invalid!' || e.response.data == 'Phone already registered!') {
            p.phoneEdit.innerText = e.response.data
          }else{
            p.phoneEdit.innerText = ''
          }
          e.response.data == 'Country required!' ? p.countryEdit.innerText = e.response.data : p.countryEdit.innerText = ''
          if(e.response.data == 'Password required!' || e.response.data == 'Password must have 8 digits!' || e.response.data == 'Password must contain at least one number and one letter!') {
            p.passwordEdit.innerText = e.response.data
          }else{
            p.passwordEdit.innerText = ''
          }
          
          e.response.data == 'Confirm Password required!' ? p.confirmPasswordEdit.innerText = e.response.data : p.confirmPasswordEdit.innerText = ''
          if(e.response.data == 'Passwords not the same!' || e.response.data == 'Error regex!'){
            p.passwordsNotSame.innerText = e.response.data
          }else{
            p.passwordsNotSame.innerText = ''
          }
        })
    },
  },
  mounted() {
    this.myModal('modal-cropper')
    this.myModal('email-change-modal')
    this.loaduser()

    axios.get(`${baseApiUrl}/getCountries`)
      .then(res => {
        this.countries = res.data
      })
  }
}
</script>

<style>
  .h4 {
    text-align: left;
  }

  .config-page {
    height: 900px;
    background: rgba(0, 0, 0, .7);
  }

  .box-icon {
    margin-bottom: 50px;
    width: 100%;
    height: 200px;
  }

  .btn-icon{
    margin-top: -15px;
  }

  .btn-icon .btn{
    font-weight: 200;
    margin: 0px 10px 0 10px;
  }

  .img-user {
    border-radius: 50%;
    width: 200px;
  }

   .form-box.edit {
    margin: 10px 10% 0 10%;
    transform: translateX(0px);
    transition: transform .2s ease;
  }

  .edit form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 100%;
    margin: 0 auto;
  }

  .edit button {
    margin: 40px 0 0 0;
  }

  .edit .input-box {
    position: relative;
    width: 48%;
    height: 50px;
    border-bottom: 2px solid var(--clr-primary);
    margin: 30px 0 10px 0;
    transition: all .2s ease;
  }

  .config-page.passDesactive {
      height: 820px;
  }

  .pass-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 0px 0 30px 0;
  }

  .input-box.passDesactive {
    display: none;
  }

  .cropper-crop-box, .cropper-view-box {
    border-radius: 50%;
  }

  .cropper-view-box {
      box-shadow: 0 0 0 1px #39f;
      outline: 0;
  }

  .cropper-face {
    background-color:inherit !important;
  }

  .cropper-dashed, .cropper-point.point-se, .cropper-point.point-sw, .cropper-point.point-nw,   .cropper-point.point-ne, .cropper-line {
    display:none !important;
  }

  .cropper-view-box {
    outline:inherit !important;
  }

  @media (max-width: 850px) {
    .h4 {
      text-align: center;
    }

    .edit form {
      display: block;
    }

    .edit .input-box {
      width: 100%;
    }

    .config-page {
      height: 1120px;
    }

    .config-page.passDesactive {
      height: 990px;
    }

    .box-icon{
      margin-bottom: 110px;
    }
  }
</style>