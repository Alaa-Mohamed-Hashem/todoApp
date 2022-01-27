import React from "react";
import TodoItem from "./TodoItem";
import useSelector from "../hooks/useSelector";
import classes from '../styles/modules/app.module.css';

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);

  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const handleFilterTodos = todoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <div>
      {handleFilterTodos && handleFilterTodos.length > 0 ? (
        handleFilterTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <div className={classes.noTodo}>no todo found</div>
      )}
    </div>
  );
};

export default AppContent;
