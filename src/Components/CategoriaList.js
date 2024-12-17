import React, { useState, useEffect } from 'react';
import api1 from '../api1';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = () => {
    api1.get('/categorias/')
      .then(response => {
        setCategorias(response.data);
        toast.success('Categorias carregadas com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao buscar categorias!', error);
        toast.error('Erro ao buscar categorias!');
      });
  };

  const handleDelete = (id) => {
    api1.delete(`/categorias/${id}/`)
      .then(response => {
        fetchCategorias();
        toast.success('Categoria deletada com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao deletar categoria!', error);
        toast.error('Erro ao deletar categoria!');
      });
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Categorias</h2>
      <Link to="/categorias/adicionar" className="btn btn-primary mb-3">Adicionar Categoria</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(categoria => (
            <tr key={categoria.id}>
              <td>{categoria.nome}</td>
              <td>
                <Link to={`/categorias/editar/${categoria.id}`} className="btn btn-warning btn-sm mr-2">Editar</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(categoria.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriaList;
