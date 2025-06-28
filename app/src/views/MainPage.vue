<template>
  <div>
    <SHeader />
    <h1>Наши товары:</h1>
    <div class="goods">
      <AppleGood :price="100" class="good"/>
      <BananaBred :price="150" class="good"/>
      <MilkGood :price="25" class="good"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppleGood  from "@/components/AppleGood.vue";
import BananaBred from "@/components/BananaBred.vue";
import SHeader from '@/components/SHeader.vue';
import MilkGood from "@/components/MilkGood.vue";

</script>

<style scoped>
.goods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; 
  margin: 20px 0; 
}

</style>
