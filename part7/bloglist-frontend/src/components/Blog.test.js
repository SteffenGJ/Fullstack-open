import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("<Blog/> renders by default the title and the author", () => {
  const blog = {
    title: "New blog",
    author: "Blog author",
    url: "www.new-blog.com",
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".first-impression");
  expect(div).toHaveTextContent("New blog --- Blog author");
});

test("<Blog/> also render the url and likes when button is clicked", async () => {
  const blog = {
    title: "New blog",
    author: "Blog author",
    url: "www.new-blog.com",
    user: {
      username: "Helge",
    },
  };

  const useres = {
    username: "Helge",
  };

  const { container } = render(<Blog blog={blog} user={useres} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const div = container.querySelector(".first-impression");
  expect(div).toHaveTextContent("www.new-blog.com");
});

test("when like button is clicked twice, the event handler is called twice", async () => {
  const blog = {
    title: "New blog",
    author: "Blog author",
    url: "www.new-blog.com",
    user: {
      username: "Helge",
    },
  };

  const useres = {
    username: "Helge",
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} user={useres} eventHandler={mockHandler} />
  );

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const likebutton = container.querySelector(".like-button");
  await user.click(likebutton);
  await user.click(likebutton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
