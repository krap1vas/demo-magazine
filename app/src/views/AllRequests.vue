<template>
    <SHeader/>
    <div v-if="table">
        <h1>{{ username === 'admin' ? 'Все заказы' : 'Мои заказы' }} </h1>
        <table>
            <th>iD заявки</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Пользователь</th>
            <th>Статус</th>
            <tr v-for="(item, index) in table" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.username }}</td>
                <td v-if="item.status === null">
                    <p>Статус: Ожидает</p>
                    <button v-if="username === 'admin'" @click="changeStatus('Рассмотрено', item.id)">Рассмотрено</button>
                    <button v-if="username === 'admin'" @click="changeStatus('Отменено', item.id)">Отменено</button>
                </td>
                <td v-if="item.status === 'Рассмотрено'">
                    <p>Статус: Рассмотрено</p>
                    <button v-if="username === 'admin'" @click="changeStatus(null, item.id)">Ожидает</button>
                    <button v-if="username === 'admin'" @click="changeStatus('Отменено', item.id)">Отменено</button>
                </td>
                <td v-if="item.status === 'Отменено'">
                    <p>Статус: Отменено</p>
                    <button v-if="username === 'admin'" @click="changeStatus(null, item.id)">Ожидает</button>
                    <button v-if="username === 'admin'" @click="changeStatus('Рассмотрено', item.id)">Рассмотрено</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import SHeader from '@/components/SHeader.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface TableData {
    id: number;
    name: string;
    price: number;
    status: string;
}

const table = ref<TableData>([])
const username = localStorage.getItem('username')

onMounted(()=>{
    getData()
})

async function getData() {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    const data = {
        username: localStorage.getItem('username')
    }

    const response = await axios.post('http://localhost:1488/requests', data, config)
    table.value = response.data
}

async function changeStatus(id: number, status: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }

    await axios.post('http://localhost:1488/change_status', {id: id, status: status}, config)
    getData()
}
</script>
<style scoped>
td{
    padding: 5px;
    border: solid black 1px;
}
th{
    padding: 5px;
    border: solid black 1px;
}
table{
    border: solid #2c3e50 2px;
    margin: 10px auto; 
    padding: 10px;
    max-width: 600px;
    width: 100%;
    box-sizing: border-box; 
    border-collapse: collapse;
    
}
</style>
