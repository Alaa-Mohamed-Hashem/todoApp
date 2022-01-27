import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import classes from "../styles/modules/todoItem.module.css";
import type { Todo } from "../types";
import { getClasses } from "../utils/getClasses";
import CheckButton from "./CheckButton";
import TodoModal from "./TodoModal";

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const handleEdit = () => setUpdateModalOpen(true);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "incomplete" : "complete",
      })
    );
  };

  return (
    <>
      <div className={classes.item}>
        <div className={classes.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={classes.texts}>
            <p
              className={getClasses([
                classes.todoText,
                todo.status === "complete"
                  ? classes["todoText--completed"]
                  : "",
              ])}
            >
              {todo.title}
            </p>
          </div>
        </div>

        <div className={classes.todoActions}>
          <div
            className={[classes.icon, classes["icon_edit"]].join(" ")}
            onClick={handleEdit}
          >
            <MdEdit />
          </div>
          <div
            className={[classes.icon, classes["icon_delete"]].join(" ")}
            onClick={handleDelete}
          >
            <MdDelete />
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
