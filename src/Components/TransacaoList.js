import React, { useState, useEffect } from "react";
import api1 from "../api1";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TransacaoList = () => {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    fetchTransacoes();
  }, []);

  const fetchTransacoes = () => {
    api1
      .get("/transacoes/")
      .then((response) => {
        setTransacoes(response.data);
        toast.success("Transações carregadas com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao buscar transações!", error);
        toast.error("Erro ao buscar transações!");
      });
  };

  const handleDelete = (id) => {
    api1
      .delete(`/transacoes/${id}/`)
      .then((response) => {
        fetchTransacoes();
        toast.success("Transação deletada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao deletar transação!", error);
        toast.error("Erro ao deletar transação!");
      });
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Transações</h2>
      <Link to="/transacoes/adicionar" className="btn btn-primary mb-3">
        Adicionar Transação
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao, index) => (
            <tr key={transacao.id}>
              <td>{transacao.tipo}</td>
              <td>
                R${" "}
                {parseFloat(transacao.valor).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td>
                {transacao.categoria && transacao.categoria.nome
                  ? transacao.categoria.nome
                  : "Sem Categoria"}
              </td>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-${index}`}>
                    {transacao.descricao.toUpperCase()}
                  </Tooltip>
                }
              >
                <td>{capitalizeFirstLetter(transacao.descricao)}</td>
              </OverlayTrigger>
              <td>{new Date(transacao.data).toLocaleString("pt-BR")}</td>
              <td>
                <Link
                  to={`/transacoes/editar/${transacao.id}`}
                  className="btn btn-warning btn-sm mr-2"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(transacao.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransacaoList;
