<template>
  <div class="home-page">
    <h1>Home Page</h1>
  </div>
</template>
  
<script>
import { message } from '@/global';
import { toast } from 'vue3-toastify';

export default {
  name: 'HomePage',
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
    
</style>