import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroForm from './Components/CadastroForm';
import CadastroList from './Components/CadastroList';
import CategoriaForm from './Components/CategoriaForm';
import CategoriaList from './Components/CategoriaList';
import TransacaoForm from './Components/TransacaoForm';
import TransacaoList from './Components/TransacaoList';
import Navbar from './Utils/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-5">
          <ToastContainer />
          <Routes>
            <Route path="/cadastro" element={<CadastroForm />} />
            <Route path="/lista" element={<CadastroList />} />
            <Route path="/categorias/adicionar" element={<CategoriaForm />} />
            <Route path="/categorias/editar/:id" element={<CategoriaForm />} />
            <Route path="/categorias" element={<CategoriaList />} />
            <Route path="/transacoes/adicionar" element={<TransacaoForm />} />
            <Route path="/transacoes/editar/:id" element={<TransacaoForm />} />
            <Route path="/transacoes" element={<TransacaoList />} />
            <Route path="/" element={<CadastroList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
