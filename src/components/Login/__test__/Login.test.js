import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./../Login";

test("The form should be initially rendered with empty fields", () => {
  render(<Login />);
  const emailInputElement = screen.getByRole("textbox", { type: "email" });
  const passwordInputElement = screen.getByRole("textbox", {
    type: "password",
  });
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
});

test("displays an error message if the email address or password is blank", () => {
  render(<Login />);
  expect(screen.getByRole("textbox", { type: "email" }).value).toBe("");
  userEvent.click(screen.getByRole("button", { type: "submit" }));
  expect(screen.getByTitle("error")).toBeInTheDocument()
});
