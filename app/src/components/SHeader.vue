<template>
  <header>
    <div class="header">
      <img class="logo" src="../assets copy/public/Авоська.jpg" alt="Логотип" />
      <nav class="nav">
        <button @click="router.push('/main')" class="nav-button">Все продукты</button>
        <button @click="router.push('/all')" class="nav-button">{{ login === 'admin' ? 'Все заказы' : 'Мои заказы' }}</button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import router from '@/router';

const login = localStorage.getItem('login');
</script>

<style scoped>
.header {
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  padding: 10px 20px; 
  background-color: #f9f9f9; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
}

.logo {
  height: 50px;
  width: auto; 
}

.nav {
  display: flex;
  gap: 15px; 
}

.nav-button {
  font-size: 15px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  
  &:hover {
    background-color: #25493d; 
    transform: scale(1.05); 
    box-shadow: 0px 4px 15px rgba(0,0,0,0.2); 
  }
}

</style>