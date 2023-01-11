import { render, screen } from "@testing-library/react";
import AddLivro from "../AddLivro";
import { AuthProvider } from "../../../../../contexts/auth";
import { BrowserRouter as Router } from "react-router-dom";

test("Testando a renderização de alguns campos na tela de adicionar Livros", () => {
  render(
    <Router>
      <AuthProvider>
        <AddLivro />
      </AuthProvider>
    </Router>
  );

  expect(screen.getByLabelText(/isbn/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/data de publicação/i)).toBeInTheDocument();
  expect(
    screen.getByLabelText(/quantidade de exemplares/i)
  ).toBeInTheDocument();
});
