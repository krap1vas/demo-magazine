<template>
  <div class="magazine">
    <img width="100px" height="100px" src='../assets copy/public/молоко.jpg' />
    <p>Молоко</p>
    <p>Коровье молочко</p>
    <p>{{ totalPrice || price }} рублей</p>
    <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;">
      <button @click="number++">+</button>
        <p>{{ number }}</p>
      <button @click="decrement">-</button>
    </div>
    <button @click="buyItem">Купить</button>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, defineProps, computed } from "vue";

const props = defineProps<{
  price: number;
}>();

const number = ref(0);
const totalPrice = computed(() => props.price * number.value);

function decrement() {
    if (number.value < 1) return;
    number.value = number.value - 1;
}

async function buyItem() {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    const data = {
        name: "Хлеб",
        description: "Наисвежайший хлебушек",
        price: totalPrice.value,
        username: localStorage.getItem('username')
    };
    await axios.post("http://localhost:1488/buy", data, config);
}
</script>
<style scoped>
.magazine{
  border: solid #ddd 1px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: auto;
  padding: 20px; 
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
</style>
