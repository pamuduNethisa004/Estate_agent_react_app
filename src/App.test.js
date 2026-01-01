import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders estate agent title", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const heading = screen.getByText(/Estate Agent Properties/i);
  expect(heading).toBeInTheDocument();
});

test("renders search form", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const searchTitle = screen.getByText(/Search Properties/i);
  expect(searchTitle).toBeInTheDocument();
});
