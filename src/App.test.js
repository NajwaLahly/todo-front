import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe('App component', () => {
    it('should display title', () => {
        render(<App />)
        const title = screen.getByText('todos');
        expect(title).toBeInTheDocument();
    })
    it('should display the new todo on enter press', async () => {
        render(<App />)
        const input = screen.queryByTestId('todo-input');
        await userEvent.type(input, `todo-1{enter}`);
        const label = screen.getByText('todo-1');
        expect(label).toBeInTheDocument();
    })
})