<template>
    <div class="edit-page">
      <h1>编辑 {{ object.title }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">标题:</label>
          <input type="text" id="title" v-model="object.title" class="form-control">
        </div>
        <div class="form-group">
          <label for="imageUrl">图片 URL:</label>
          <input type="text" id="imageUrl" v-model="object.imageUrl" class="form-control">
        </div>
        <div class="form-group">
          <label for="description">描述:</label>
          <textarea id="description" v-model="object.description" class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">保存</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useGitHub } from '../api/github';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const object = ref({} as any); // 使用 ref 来保存要编辑的对象
      const { updateFile } = useGitHub();
  
      onMounted(async () => {
        try {
          const type = route.params.type as string;
          const id = parseInt(route.params.id as string);
          const data = await import(`../data/${type}.json`);
          object.value = data.default.find(item => item.id === id); // 找到要编辑的对象
        } catch (error) {
          console.error('读取数据错误:', error);
        }
      });
  
      const handleSubmit = async () => {
        try {
          const type = route.params.type as string;
          const id = parseInt(route.params.id as string);
          await updateFile(type, id, object.value); // 将修改后的数据保存到 GitHub 仓库
          router.push('/');
        } catch (error) {
          console.error('保存数据错误:', error);
        }
      };
  
      return {
        object,
        handleSubmit,
      };
    },
  });
  </script>