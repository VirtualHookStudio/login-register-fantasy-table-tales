<template>
  <div id="gridApp">
    <MenuTemplate v-if="user"/>
    <LoadingTemplate v-if="validationToken"/>
    <ContentTemplate v-else/>
  </div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "./global"
import { mapState } from 'vuex';

import ContentTemplate from './components/templates/ContentTemplate.vue'
import MenuTemplate from './components/templates/MenuTemplate.vue'

import LoadingTemplate from "./components/templates/LoadingTemplate.vue";

export default {
  name: 'App',
  components: {MenuTemplate, ContentTemplate, LoadingTemplate},
  computed: mapState(['user']),
  data: function() {
    return {
      validationToken: true
    }
  },
  methods: {
    async validateToken() {
      this.validationToken = true
      
      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null)

      if(!userData) {
        this.validationToken = false
        return this.$router.push({name: 'authpage'})
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if(res.data) {
        this.$store.commit('setUser', userData)
        if(window.innerWidth < 776){
          this.$store.commit('toggleMenu', false)
        }
      }else {
        localStorage.removeItem(userKey)
        this.$router.push({name: 'auth'})
      }

      this.validationToken = false
    }
  },
  created() {
    if(window.location.href !== 'http://localhost:8080/validateaccountpage'){
      this.validateToken()
    }
  },
}
</script>

<style>
  :root {
    --clr-primary: #49667c;
    --clr-secundary: #010026;
    --clr-gradient: linear-gradient(153deg, rgba(1,1,27,1) 0%, rgba(0,40,92,1) 54%, rgba(0,92,89,1) 100%);
  }

  * {
    font-family: Stencil Std, fantasy	;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body, html {
    background-image: url(./assets/images/backgrounds/background_1.png); 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    position: absolute;
    height: 100vh;
    width: 100%;
  }

  @media (max-width: 1900px) {
    body, html {
      background-image: url(./assets/images/backgrounds/background_2.png);
      transition: all .2s ease;
    }
  }

  @media (max-width: 1045px) {
    body, html {
      background-image: url(./assets/images/backgrounds/background_3.png);
      transition: all .2s ease;
    }
  }

  @media (max-width: 600px) {
    body, html {
      background-image: url(./assets/images/backgrounds/background_4.png);
      transition: all .2s ease;
    }
  }
  
  @media (max-width: 320px) {
    body, html {
      background-image: url(./assets/images/backgrounds/background_5.png);
      transition: all .2s ease;
    }
  }

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--clr-gradient);
    border-radius: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--clr-primary);
  }
</style>
