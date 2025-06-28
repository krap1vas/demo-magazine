<template>
    <div class='classss'>
        <h1>Регистрация</h1>
        <input type="text" placeholder="Введите логин" v-model="username">
        <input type="password" placeholder="Введие пароль" v-model="password">
        <button @click="register">Зарегестироваться</button>
        <button @click="router.push('/auth')">На авторизацию</button>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

const username = ref('')
const password = ref('')

async function register() {
    const data = {
        username: username.value,
        password: password.value,
    }

    await axios.post('http://localhost:1488/register', data)
    const token = await axios.post('http://localhost:1488/login', data)
    localStorage.setItem('token', token.data.access_token)
    localStorage.setItem('username', username.value)
    router.push('/main')
}
</script>

<style scoped>
.classss{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    padding: 10px;
}
</style>
