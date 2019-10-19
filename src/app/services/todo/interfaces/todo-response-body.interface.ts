export interface Token {
  token: string;
}

export interface Todo {
  _id: string;
  complete: boolean;
  todo: string;
}

export interface CreatedTodo {
  _id: string;
}
