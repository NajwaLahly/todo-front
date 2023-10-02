import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import Todo from "./Todo";

const mockedTodo = {
  id: 1,
  value: "todo-1",
  completed: false,
};
describe("Todo component", () => {
it("should render a todo label", () => {
  render(<Todo todo={{ id: 1, value: "todo-1" }} />);

  const labelElement = screen.getByLabelText("todo-1");

  expect(labelElement).toBeInTheDocument();
});

describe("action handlers", () =>{test("renders a todo destroy button", () => {
  render(<Todo todo={{ id: 1, value: "todo-1", completed: false }} />);

  const buttonElement = screen.getByRole("button", { name: "" });

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass("destroy");
});

it("should render a todo checkbox", () => {
   const todo={ id: 1, value: "todo-1", completed: false }
   const {rerender} = render(<Todo todo={todo} />);

  const checkBoxElement = screen.getByRole("checkbox", { id: "toggle" });

  expect(checkBoxElement).toBeInTheDocument();
  expect(checkBoxElement).toHaveClass("toggle");
  expect(checkBoxElement).not.toBeChecked();

  rerender(<Todo todo={{...todo, completed: true}} />)
  expect(checkBoxElement).toBeChecked();

});

it("should check if handleCheck was invoked after click", async () => {
  const mockedHandleChange = jest.fn();

  render(<Todo todo={mockedTodo} handleCheck={mockedHandleChange} />);
  const toggleInput = screen.getByRole("checkbox", { id: "toggle" });

  await userEvent.click(toggleInput);

  expect(mockedHandleChange).toHaveBeenCalledWith(mockedTodo.id);
});

it("should check if edit mode shows input", async () => {
  const mockedHandleEdit = jest.fn();
  const mockedHandleCheck = jest.fn();
  const mockedHandleDestroy = jest.fn();
  render(
    <Todo
      todo={{ id: 1, value: "todo-1", completed: false }}
      handleEdit={mockedHandleEdit}
      handleCheck={mockedHandleCheck}
      handleDestroy={mockedHandleDestroy}
    />
  );

  const todoLabel = screen.getByText("todo-1");
await userEvent.dblClick(todoLabel);
  const inputElement = await screen.findByTestId("todo-edit");
  expect(inputElement).toBeInTheDocument();

  //   const liElement = screen.getByRole("listitem", { name: "" }); // '' for any name
  //   expect(liElement).toBeInTheDocument();
  //   expect(liElement).toHaveClass("editing");
});})
})