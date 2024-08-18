<template>
    <div id="app">
      <h1>我的资源库</h1>
      <div v-for="type in types" :key="type">
        <h2>{{ type }}</h2>
        <div v-if="objects[type].length > 0">
          <ObjectCard v-for="object in objects[type]" :key="object.id" :object="object" />
        </div>
        <div v-else>
          没有数据
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import ObjectCard from './ObjectCard.vue';
  
  export default defineComponent({
    components: {
      ObjectCard,
    },
    setup() {
      const objects = ref({} as any); // 保存所有类型的数据
      const types = ref(['websites', 'books', 'movies']); // 数据类型列表
  
      onMounted(async () => {
        for (const type of types.value) {
          try {
            const data = await import(`../data/${type}.json`);
            objects.value[type] = data.default;
          } catch (error) {
            console.error(`读取 ${type} 数据错误:`, error);
          }
        }
      });
  
      return {
        objects,
        types,
      };
    },
  });
  </script>