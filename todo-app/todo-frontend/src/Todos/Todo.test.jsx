import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import { expect, test } from "vitest";

test("renders content", () => {
  const todo = {
    text: "Learn to test in containers",
    done: false,
  };

  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  render(
    <Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />
  );

  const element = screen.getByText("Learn to test in containers");
  expect(element).toBeDefined();
});
