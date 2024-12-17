import React, { useState, useEffect } from 'react';
import api1 from '../api1';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const CategoriaForm = ({ match, history }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id) {
      api1.get(`/categorias/${id}/`)
        .then(response => {
          setNome(response.data.nome);
        })
        .catch(error => {
          console.error('Erro ao buscar categoria!', error);
          toast.error('Erro ao buscar categoria!');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { nome };

    if (id) {
      api1.put(`/categorias/${id}/`, data)
        .then(response => {
          toast.success('Categoria atualizada com sucesso!');
          navigate('/categorias');
        })
        .catch(error => {
          console.error('Erro ao atualizar categoria!', error);
          toast.error('Erro ao atualizar categoria!');
        });
    } else {
      api1.post('/categorias/', data)
        .then(response => {
          toast.success('Categoria criada com sucesso!');
          navigate('/categorias');
        })
        .catch(error => {
          console.error('Erro ao criar categoria!', error);
          toast.error('Erro ao criar categoria!');
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Categoria' : 'Adicionar Categoria'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {id ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default CategoriaForm;
