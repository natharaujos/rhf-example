import React, { useState, useContext } from "react";
import "../LoginTeste/index.css";
import { AuthContext } from "../../contexts/auth";

const LoginTeste = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      login(email, password);
    }, 1000);
  };
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="login-form-tittle">Bem Vindo!</span>
            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>
            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>
            <div className="container-login-form-btn">
              <button className="login-form-btn" type="submit">
                Login
              </button>
            </div>
            <div className="text-center">
              <span className="txt1">Não possui conta?</span>
              <a href="#" className="txt2">
                Criar conta.
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginTeste;
