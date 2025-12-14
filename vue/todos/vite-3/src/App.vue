<script setup>
  //业务是 界面上动态展示标题,且支持编辑标题
  //vue focus于标题数据业务,只需修改数据，余下的dom更新 vue 替我们做了
  //setup vue3的组合式(composition) api
  //没有 setup vue2的选项式(options)api
import {ref , onMounted,onBeforeUnmount,computed} from 'vue'
  //响应式数据
  const title = ref('todos');

  const todos = ref([
    {
      id:1,
      name:'学习vue',
      done:true
    },{
      id:2,
      name:'打王者',
      done:false
    },{
      id:3,
      name:'吃饭',
      done:true
    }
  ]);

  //计算属性 也是响应式的 依赖于todos响应式数据,当依赖数据变化时,自动计算
  //形势上是函数 (计算过程),结果(计算属性)返回
  const active = computed(() => {
    return todos.value.filter(todo => !todo.done).length;
  })

  const addTodo = () => {
    if(!title.value) return;
    todos.value.push({
      id:todos.value.length + 1,
      name:title.value,
      done:false
    });
    title.value = '';
  }

  //computed 高级技巧
  const doneAll = computed({
    get(){
      return todos.value.every(todo => todo.done);
    },
    set(val){
      todos.value.forEach(todo => todo.done = val);
    }
  })
</script>

<template>
  <div>
      <!-- 数据绑定 -->
      <h2>Todos</h2>
      <!-- 双向数据绑定 v-model-->
      
        <!-- @event_name.enter 不用addEventListener 
         @ 是v-on:缩写 监听键盘事件,按下enter键时调用方法 -->
      <input type="text" v-model="title" @keydown.enter="addTodo">
      <ul v-if="todos.length">
        <!-- key 唯一属性 -->
        <li v-for="todo in todos" :key="todo.id">
           <!-- :  v-bind: 的缩写 js表达式,可以在属性中使用js表达式
           vue有一定的学习 apo对用户非常友好 
           -->
          <input type="checkbox" v-model="todo.done" >
          <span :class="{'done':todo.done}">{{ todo.name }}</span>
        </li>
      </ul>
      <div v-else>暂无任务</div>
      <div>
        全选<input type="checkbox" v-model="doneAll" >
        <!-- 数据绑定  表达式结果绑定 -->
         <!-- 改为计算属性后性能更好 
          普通表达式只要刷新就会重新计算，而只要计算属性所依赖的属性没有改变，那就不会重新计算 -->
        <!-- {{ todos.filter(todo => !todo.done).length }} -->
          {{ active }}
        /
        {{ todos.length }}
      </div>
  </div>
</template>

<style scoped>
.done{
  color:gray;
  text-decoration: line-through;
}
</style>
