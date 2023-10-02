import TodoList from "./TodoList";
import { render, screen } from "@testing-library/react";

describe("TodoList component", () => {
  it("should render list to todos", () => {
    const todos = [
      { id: 1, value: "todo-1", completed: "false" },
      { id: 2, value: "todo-2", completed: "true" },
    ];
    render(
      <TodoList
        todos={todos}
        handleCheck={() => {}}
        handleEdit={() => {}}
        handleDestroy={() => {}}
      />
    );
    const todoItem1 = screen.getByText('todo-1');
    const todoItem2 = screen.getByText('todo-2');
    
    expect(todoItem1).toBeInTheDocument();
    expect(todoItem2).toBeInTheDocument();
  });
});
