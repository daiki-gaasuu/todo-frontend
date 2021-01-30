<template>
  <div class="todo">
    <h1>TODO APP</h1>
    <div class="create">
      <div class="title">
        <label>title:</label>
        <input v-model="state.title" />
        <button @click="createTodo">Create</button>
      </div>
    </div>
    <div v-for="todo in state.todos" :key="todo.uuid">
      <input class="title margin-r1" v-model="todo.title" />
      <!-- <select class="title margin-r1" v-model="todo.status">
        <option value="todo">TODO</option>
        <option value="wip">WIP</option>
        <option value="done">DONE</option>
      </select> -->
      <button class="update margin-r1" @click="updateTodo(todo)">Update</button>
      <button class="delete margin-r1" @click="deleteTodo(todo)">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { TodosApi } from "../service/api-service";
import { Todo } from "../api/api";
// import axios from "axios";

// const baseURL = "http://localhost:3000/v1/tasks";

export default defineComponent({
  name: "Todo",

  setup() {
    const state = reactive<{ title: string; todos: Todo[] }>({
      title: "",
      todos: []
    });

    // const createTodo = async () => {
    //   await axios.post(baseURL, { title: state.title });
    // };

    const getTodos = async () => {
      await TodosApi.instance.getTasks().then(res => {
        if (res && res.data.data) {
          state.todos = res.data.data;
        }
      });
    };

    getTodos();

    const createTodo = async () => {
      await TodosApi.instance.postTodo({ title: state.title });
      getTodos();
    };

    const updateTodo = async (todo: Todo) => {
      await TodosApi.instance.updateTodoByUuid(todo.uuid, {
        title: todo.title
      });
      getTodos();
    };

    const deleteTodo = async (todo: Todo) => {
      await TodosApi.instance.deleteTodoByUuid(todo.uuid);
      getTodos();
    };

    return {
      state,
      createTodo,
      updateTodo,
      deleteTodo
    };
  }
});
</script>
