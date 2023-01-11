import { render, screen } from "@testing-library/react";
import AddClient from "../AddClients";
import { AuthProvider } from "../../../../../contexts/auth";
import { BrowserRouter as Router } from "react-router-dom";

test("Testando a renderização de alguns campos na tela de adicionar Clientes", () => {
  render(
    <Router>
      <AuthProvider>
        <AddClient />
      </AuthProvider>
    </Router>
  );

  expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/endereço/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
});
