<script setup lang="ts">
import PictureCard from './components/PictureCard.vue';
// composition api 组合式api
import {ref} from 'vue';
// 定义响应式数据
const word = ref('请上传图片');
const audio = ref('');
const submit = (imageData: string) => {
  console.log(imageData);
  update(imageData);
}
const update = async (imageData: string) => {
  console.log(imageData);
}
</script>

<template>
  <div class="container">
    <div class="header">
      <PictureCard 
      :word="word" 
      :audio="audio" 
      @update-image="submit" 
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-size: .85rem;
  background: linear-gradient(180deg,rgb(235,189,161) 0%,
  rgb(71,49,32) 100%);
}
</style>
