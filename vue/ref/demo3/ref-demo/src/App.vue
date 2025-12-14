<script setup>
import{
  ref,
  onMounted//挂载之后
} from 'vue';//响应式API 将数据包装成响应式对象
//数据
const users = ref([]);
onMounted(()=>{
  console.log('页面显示完成');
  fetch('http://localhost:3000/users')
  .then(res => res.json()
  .then(data =>(users.value = data)))
})
// setTimeout(()=>{
//   users.value.push({
//     id: 3,
//     name: '王五',
//     email: 'wangwu@example.com'
//   })
// },3000)
</script>

<template>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>



