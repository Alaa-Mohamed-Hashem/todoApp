import { createSlice } from "@reduxjs/toolkit";
import type { Todo, TodoState } from "../types";

const getInitialTodo = (): Todo[] => {
  const localTodoList = localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

const initialValue: TodoState = {
  filterStatus: "all",
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addTodo: (state: TodoState, action) => {
      state.todoList.push(action.payload);

      const todoList = localStorage.getItem("todoList");

      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
      }
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");

      if (todoList) {
        let todoListArr = JSON.parse(todoList);
        todoListArr = todoListArr.filter(
          (todo: Todo) => todo.id !== action.payload
        );

        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        let todoListArr = JSON.parse(todoList);
        const editElement = todoListArr.map((item: Todo) => {
          return item.id === action.payload.id
            ? {
                ...item,
                title: action.payload.title,
                status: action.payload.status,
              }
            : item;
        });
        todoListArr = editElement;
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    deleteTodos: (state) => {
      state.todoList = [];
      localStorage.setItem("todoList", JSON.stringify([]));
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  updateFilterStatus,
  deleteTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
