type Status = "incomplete" | "complete";

export interface Todo {
  id: number;
  title: string;
  status: Status;
}

export interface TodoState {
  filterStatus: string;
  todoList: Todo[];
}

export interface RootState {
  todo: TodoState;
}


