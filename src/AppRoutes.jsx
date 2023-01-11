import { Route, Routes, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./contexts/auth";
import Home from "../src/pages/Default/components/Home/Home";
import DefaultPage from "./pages/Default/DefaultPage";
import LoginTeste from "./pages/LoginTeste/";
import ListLivro from "./pages/Default/components/Livro/ListLivro";
import AddLivro from "./pages/Default/components/Livro/AddLivro";
import EditLivro from "./pages/Default/components/Livro/EditLivro";
import ViewLivro from "./pages/Default/components/Livro/ViewLivro";
import ListClient from "./pages/Default/components/Client/ListClient";
import EditClient from "./pages/Default/components/Client/EditClient";
import AddClients from "./pages/Default/components/Client/AddClients";
import ListEmprestimos from "./pages/Default/components/Emprestimo/ListEmprestimos";
import "./App.css";
import ErrorBoundary from "./pages/Boundary/ErrorBoundary";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return (
        <div className="container">
          <div className="loading"></div>
        </div>
      );
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginTeste />}></Route>
        <Route
          exact
          path="/"
          element={
            <Private>
              <DefaultPage />
            </Private>
          }
        ></Route>
        <Route
          exact
          path="/home"
          element={
            <Private>
              <Home />
            </Private>
          }
        ></Route>
        <Route
          exact
          path="/livros"
          element={
            <Private>
              <ListLivro />
            </Private>
          }
        ></Route>
        <Route
          exact
          path="/livros/add"
          element={
            <ErrorBoundary>
              <Private>
                <AddLivro />
              </Private>
            </ErrorBoundary>
          }
        ></Route>
        <Route
          exact
          path="/livros/edit/:id"
          element={
            <Private>
              <EditLivro />
            </Private>
          }
        ></Route>
        <Route
          path="/livros/view/:id"
          element={
            <Private>
              <ViewLivro />
            </Private>
          }
        ></Route>
        <Route
          exact
          path="/clientes"
          element={
            <Private>
              <ListClient />
            </Private>
          }
        ></Route>
        <Route
          exact
          path="/clientes/edit/:id"
          element={
            <Private>
              <EditClient />
            </Private>
          }
        ></Route>
        <Route
          exact
          path="/clientes/add"
          element={
            <Private>
              <AddClients />
            </Private>
          }
        ></Route>
        <Route
          path="/emprestimos"
          element={
            <Private>
              <ListEmprestimos />
            </Private>
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
