import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CadastroApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro">
                Criar Cadastro
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lista">
                Lista de Cadastros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias/adicionar">
                Criar Categoria
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">
                Lista de Categorias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transacoes/adicionar">
                Criar Transação
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transacoes">
                Lista de Transações
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
