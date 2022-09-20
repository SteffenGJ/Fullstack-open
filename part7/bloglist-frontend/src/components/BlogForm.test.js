import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm/> calls the event handler with the right props", async () => {
  const eventHandler = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm handleBlogSubmit={eventHandler} />);

  const input = screen.getByPlaceholderText("enter title...");
  const button = container.querySelector(".button");
  await user.type(input, "Cool blog!");
  await user.click(button);

  console.log(eventHandler.mock.calls);

  expect(eventHandler.mock.calls).toHaveLength(1);
  expect(eventHandler.mock.calls[0][0].title).toBe("Cool blog!");
});
