import React, { useState } from "react";
// import Button from './Button';
import Button, { SelectButton } from "./Button";
import classes from "../styles/modules/app.module.css";
import TodoModal from "./TodoModal";
import { useDispatch } from "react-redux";
import { deleteTodos, updateFilterStatus } from "../slices/todoSlice";
import { MdDelete } from "react-icons/md";
import useSelector from "../hooks/useSelector";

const AppFooter = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const handleStatus: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  const deleteTodosHandler = () => {
    dispatch(deleteTodos());
  };

  return (
    <div className={classes.appHeader}>
      <Button variant="green" onClick={() => setModalOpen(true)}>
        +
      </Button>
      <SelectButton id="status" onChange={handleStatus} value={filterStatus}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <Button variant="red" onClick={deleteTodosHandler}>
        <MdDelete />
      </Button>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AppFooter;
