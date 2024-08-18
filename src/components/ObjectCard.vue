<template>
    <div class="card">
      <img :src="object.imageUrl" :alt="object.title" class="card-img">
      <div class="card-body">
        <h5 class="card-title">{{ object.title }}</h5>
        <p class="card-text">{{ object.description }}</p>
        <router-link :to="`/edit/${object.type}/${object.id}`" class="btn btn-primary">修改</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface ObjectData {
    type: string;
    id: number; // 每个对象的唯一标识符
    title: string;
    imageUrl: string;
    description: string;
    // ...其他字段
  }
  
  export default defineComponent({
    props: {
      object: {
        type: Object as () => ObjectData,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  
  .card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-body {
    padding: 10px;
  }
  </style>