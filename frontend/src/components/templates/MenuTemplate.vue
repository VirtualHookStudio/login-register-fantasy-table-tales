<template>
  <div class="sidebar" v-bind:class="{ isActive: this.$store.state.isMenuVisible }">
    <i class='bx bx-menu' id="btn-menu" ref="btn-menu" @click.prevent="onToggleMenu"></i>
    <div class="logo_content">
      <br>
      <div class="logo">
        <img alt="Vue logo" src="../../assets/images/logo.png">
      </div>
      <div v-show="this.$store.state.isMenuVisible">
        <br><br>
      </div>
      <div class="logo_name">Fantasy Table Tales</div>
    </div>
    <ul class="nav_list">
      <li>
        <RouterLink class="nav-link" to="/">
          <i class='bx bx-home' ></i>
          <span class="links_name">Home Page</span>
        </RouterLink>
        <span class="tooltip">Home Page</span>
      </li>
      <li>
        <RouterLink class="nav-link" to="/characterpage">
          <i class='bx bxs-id-card'></i>
          <span class="links_name">Characters</span>
        </RouterLink>
        <span class="tooltip">Characters</span>
      </li>
      <li>
        <RouterLink class="nav-link" to="/universepage">
          <i class='bx bxs-castle'></i>
          <span class="links_name">Universes</span>
        </RouterLink>
        <span class="tooltip">Universes</span>
      </li>
      <li>
        <RouterLink class="nav-link" to="/tablepage">
          <i class='bx bx-table' ></i>
          <span class="links_name">Tables</span>
        </RouterLink>
        <span class="tooltip">Tables</span>
      </li>
      <li>
        <a href="#">
          <i class='bx bxs-chat' ></i>
          <span class="links_name">Friendships</span>
        </a>
        <span class="tooltip">Friendships</span>
      </li>
      <li>
        <RouterLink class="nav-link" to="/configpage">
          <i class='bx bxs-cog'></i>
          <span class="links_name">Configurations</span>
        </RouterLink>
        <span class="tooltip">Configurations</span>
      </li>
      <li v-if="user.permission">
        <RouterLink class="nav-link" to="/adminpanelpage">
          <i class='bx bxs-book-reader'></i>
          <span class="links_name">Admin Panel</span>
        </RouterLink>
        <span class="tooltip">Admin Panel</span>
      </li>
    </ul>
    <div class="profile_content">
      <br>
      <div class="profile">
        <div class="profile_details">
          <img :src="profileImage" alt="">
          <div class="name_job">
            <div class="name">{{ profile.name }}</div>
            <div class="jov">{{profile.description}}</div>
          </div>  
        </div>
        <a href @click.prevent="logout"><i class='bx bx-log-out' id="log_out"></i></a>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { toast } from 'vue3-toastify';

import {baseApiUrl, userKey, message} from '@/global';
import axios from 'axios';

export default {
  name: 'MenuTemplate',
  computed: mapState(['isMenuVisible', 'user']),
  data: function() {
    return {
      isActive: true,
      profileImage: null,
      profile: {},
    }
  },
  methods: {
    loadIcon(){
      const url = `${baseApiUrl}/userprofile`
      axios.get(url).then(res => {
        this.profile = res.data
        if(this.profile.user_icon){
          this.profileImage = "data:image/png;base64," + this.profile.user_icon
        }
        else{
          this.profileImage = require('@/assets/images/user_icon_default.png')
        }
      })
    },
    onToggleMenu() {
      this.$store.commit('toggleMenu')
    },
    logout() {
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({path: '/authpage'})
    }
  },
  mounted(){
    this.loadIcon()
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
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 78px;
    background: #000c41;
    padding: 6px 14px;
    transition: all 0.5s ease;
    z-index: 99;
  }

  .isActive {
    width: 240px;
  }

  .sidebar .logo_content .logo {
    color: #fff;
    height: 50px;
    width: 100%;
    align-items: center;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transition: all .4s ease;
  }

  .isActive .logo_content .logo {
    opacity: 1;
    pointer-events: none;
    transition: all .4s ease;
  }

  .logo-content .logo i {
    font-size: 28px;
    margin-right: 5px;
    transition: all .4s ease;
  }

  .logo_name {
    font-size: 20px;
    font-weight: 400;
    color: var(--clr-primary);
    text-align: center;
  }

  .sidebar #btn-menu {
    position: absolute;
    color: #fff;
    top: 6px;
    left: 50%;
    font-size: 20px;
    height: 50px;
    width: 50px;
    text-align: center;
    line-height: 50px;
    transform: translatex(-50%);
  }

  .isActive #btn-menu {
    left: 90%;
  }

  .sidebar ul {
    margin-top: 20px;
  }

  .sidebar ul li {
    text-align: left;
    position: relative;
    height: 50px;
    width: 100%;
    margin: 0 2px;
    list-style: none;
    line-height: 50px;
  }

  .sidebar ul li .tooltip {
    position: absolute;
    left: 55px;
    top: 0;
    transform: translateY(-50%);
    border-radius: 6px;
    height: 35px;
    width: 122px;
    background: #fff;
    line-height: 35px;
    text-align: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    transition: 0s;
    opacity: 0;
    pointer-events: none;
    display: block;
  }

  .isActive ul li .tooltip {
    display: none;
  }

  .sidebar ul li:hover .tooltip {
    transition: all 0.5s ease;
    opacity: 1;
    top: 50%;
  }

  .sidebar ul li input {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 12px;
    outline: none;
    border: none;
    background: #0a0729;
    padding-left: 50px;
    font-size: 18px;
    color: #fff;
    transition: all .8s ease;
  }

  .sidebar ul li a {
    margin-left: -5px;
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0s ease;
    border-radius: 12px;
    white-space: nowrap;
  }

  .sidebar ul li a:hover {
    color: #0a0729;
    background: #000131;
  }

  .sidebar ul li i {
    margin-left: 0;
    height: 50px;
    min-width: 50px;
    border-radius: 12px;
    line-height: 50px;
    text-align: center;
  }

  .nav_list {
    padding-left: 0;
    transition: all .8s ease;
  }

  .isActive .nav_list {
    padding-left: 30px;
    transition: all .8s ease;
  }

  .sidebar .profile_content {
    position: absolute;
    color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .sidebar .profile_content .profile {
    position: relative;
    padding: 10px 10px;
    height: 60px;
    background: #1c19d4;
  }

  .profile_content .profile .profile_details{
    display: flex;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    white-space: nowrap;
  }

  .isActive .profile .profile_details{
    opacity: 1;
    pointer-events: auto;
  }

  .profile .profile_details img {
    height: 45px;
    width: 45px;
    object-fit: cover;
    border-radius: 12px;
  }

  .profile .profile_details .name_job {
    margin-left: 10px;
  }
  

  .profile .profile_details .name {
    font-size: 15px;
    font-weight: 400;
  }

  .profile .profile_details .job {
    font-size: 12px;
  }

  .links_name {
    opacity: 0;
    pointer-events: none;
    transition: all .3s ease;
  }

  .isActive .links_name {
    opacity: 1;
    pointer-events: auto;
  }

  .profile #log_out {
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translatex(-50%);
    min-width: 50px;
    line-height:50px;
    font-size: 20px;
    border-radius: 12px;
    text-align: center;
  }

  .isActive #log_out {
    color: white;
    left: 88%;
  }

  .logo_content .logo img {
    width: 90px;
  }
</style>