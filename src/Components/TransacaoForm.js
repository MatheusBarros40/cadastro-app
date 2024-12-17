import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api1 from '../api1';
import { toast } from 'react-toastify';


const TransacaoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
    if (id) {
      api1.get(`/transacoes/${id}/`)
        .then(response => {
          setTipo(response.data.tipo);
          setValor(response.data.valor);
          setCategoria(response.data.categoria);
          setDescricao(response.data.descricao);
        })
        .catch(error => {
          console.error('Erro ao buscar transação!', error);
          toast.error('Erro ao buscar transação!');
        });
    }
  }, [id]);

  const fetchCategorias = () => {
    api1.get('/categorias/')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar categorias!', error);
        toast.error('Erro ao buscar categorias!');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { tipo, valor, categoria, descricao };

    if (id) {
      api1.put(`/transacoes/${id}/`, data)
        .then(() => {
          toast.success('Transação atualizada com sucesso!');
          navigate('/transacoes');
        })
        .catch(error => {
          console.error('Erro ao atualizar transação!', error);
          toast.error('Erro ao atualizar transação!');
        });
    } else {
      api1.post('/transacoes/', data)
        .then(() => {
          toast.success('Transação criada com sucesso!');
          navigate('/transacoes');
        })
        .catch(error => {
          console.error('Erro ao criar transação!', error);
          toast.error('Erro ao criar transação!');
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Transação' : 'Adicionar Transação'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo</label>
          <select
            className="form-control"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>
        <div className="form-group">
          <label>Valor</label>
          <input
            type="number"
            className="form-control"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Categoria</label>
          <select
            className="form-control"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione a categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {id ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default TransacaoForm;
