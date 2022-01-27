import React, { FC, useState } from "react";
import classes from "../styles/modules/modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Todo } from "../types";

const TodoModal: FC<{
  type: string;
  modalOpen: boolean;
  setModalOpen: Function;
  todo?: Todo;
}> = ({ type, modalOpen, setModalOpen, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    }
  }, [type, todo, modalOpen]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (title === "") {
      toast.error("Title shouldn't be empty");
      return;
    }

    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
          })
        );
        toast.success("Task Added Successfully");
        setModalOpen(false);
      }
      if (type === "update") {
        if (todo && (todo.title !== title || todo.status !== status)) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
          toast.success("Task Update Successfully");
          setModalOpen(false);
        } else {
          toast.error("No Changes Made");
        }
      }
      setTitle("");
    }
  };

  return (
    <>
      {modalOpen && (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div
              className={classes.closeButton}
              onClick={() => setModalOpen(false)}
            >
              <MdOutlineClose />
            </div>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={classes.formTitle}>
                {type === "add" ? "add" : "update"} Task
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">complete</option>
                </select>
              </label>
              <div className={classes.buttonContainer}>
                <Button type="submit" variant="green_1">
                  {type === "add" ? "add" : "update"} Task
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoModal;
