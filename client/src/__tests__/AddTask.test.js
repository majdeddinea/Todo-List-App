import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTask from "../components/AddTask";

describe("AddTask Component", () => {
  it("renders correctly", () => {
    render(<AddTask addTask={() => {}} />);
    expect(
      screen.getByPlaceholderText("Enter a task . . .")
    ).toBeInTheDocument();
  });

  it("allows users to input a task", () => {
    render(<AddTask addTask={() => {}} />);
    const input = screen.getByPlaceholderText("Enter a task . . .");
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(input.value).toBe("New Task");
  });
});
