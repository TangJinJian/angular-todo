export interface Token {
  readonly token: string;
}

export interface Todo {
  readonly _id: string;
  readonly complete: boolean;
  readonly todo: string;
}

export interface CreatedTodo {
  readonly _id: string;
}
