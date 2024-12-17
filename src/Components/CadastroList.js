import React, { useEffect, useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import MaskedInput from "react-text-mask";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CadastroList = () => {
  const [cadastros, setCadastros] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCadastros, setFilteredCadastros] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    documento: "",
    apresentouRequisitos: false,
    telefone: "",
    temCarteirinha: false,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchCadastros();
  }, []);

  useEffect(() => {
    setFilteredCadastros(
      cadastros.filter(
        (cadastro) =>
          cadastro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cadastro.idade.toString().includes(searchTerm) ||
          cadastro.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cadastro.telefone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (cadastro.apresentouRequisitos ? "sim" : "não").includes(
            searchTerm.toLowerCase()
          ) ||
          (cadastro.temCarteirinha ? "sim" : "não").includes(
            searchTerm.toLowerCase()
          )
      )
    );
  }, [searchTerm, cadastros]);

  const fetchCadastros = () => {
    api
      .get("/")
      .then((response) => {
        setCadastros(response.data);
        setFilteredCadastros(response.data);
        // toast.success("Cadastros carregados com sucesso!");
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar os cadastros!", error);
        toast.warning("Erro ao carregar os cadastros!");
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (cadastro) => {
    setEditingId(cadastro.id);
    setFormData({
      nome: cadastro.nome,
      idade: cadastro.idade,
      documento: cadastro.documento,
      apresentouRequisitos: cadastro.apresentou_requisitos,
      telefone: cadastro.telefone,
      temCarteirinha: cadastro.tem_carteirinha,
    });
  };

  const handleDelete = (id) => {
    api
      .delete(`/${id}/`)
      .then((response) => {
        fetchCadastros();
        toast.success("Cadastro deletado com sucesso!");
      })
      .catch((error) => {
        console.error("Houve um erro ao deletar o cadastro!", error);
        toast.error("Erro ao deletar o cadastro!");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const preparedData = {
      nome: formData.nome,
      idade: formData.idade,
      documento: formData.documento,
      apresentou_requisitos: formData.apresentouRequisitos, 
      telefone: formData.telefone.replace(/\D/g, ''),
      tem_carteirinha: formData.temCarteirinha, 
    };
    api
      .put(`/${editingId}/`, preparedData)
      .then((response) => {
        setEditingId(null);
        setFormData({
          nome: "",
          idade: "",
          documento: "",
          apresentouRequisitos: false,
          telefone: "",
          temCarteirinha: false,
        });
        fetchCadastros();
        toast.success("Cadastro atualizado com sucesso!");
      })
      .catch((error) => {
        console.error("Houve um erro ao atualizar o cadastro!", error);
        toast.error("Erro ao atualizar o cadastro!");
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredCadastros.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(filteredCadastros.length / itemsPerPage);

  const handleNomeChange = (e) => {
    setFormData({
      ...formData,
      nome: e.target.value.toUpperCase(),
    });
  };

  const handleDocumentoChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    let mask = "";
    if (value.length <= 8) {
      mask = "99999999";
    } else if (value.length <= 11) {
      mask = "999.999.999-99";
    }
    setFormData({
      ...formData,
      documento: value,
      documentoMask: mask,
    });
  };
  const documentoMask = (rawValue) => {
    const value = rawValue.replace(/\D/g, "");
    if (value.length <= 8) {
      return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    } else {
      return [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ];
    }
  };

  const telefoneMask = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  return (
    <div className="container mt-5">
      <h2>Lista de Cadastros</h2>
      <ToastContainer />
      <form className="d-flex mb-3" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Documento</th>
            <th>Apresentou Requisitos</th>
            <th>Telefone</th>
            <th>Tem Carteirinha</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {cadastros.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center">Nenhum cadastro encontrado</td>
    </tr>
  ) : (
    currentPageData.map((cadastro, index) => (
      <tr key={index}>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-${index}`}>
              {cadastro.nome.toUpperCase()}
            </Tooltip>
          }
        >
          <td>{cadastro.nome.toUpperCase()}</td>
        </OverlayTrigger>
        <td>{cadastro.idade}</td>
        <td>
          <MaskedInput
            mask={documentoMask(cadastro.documento)}
            value={cadastro.documento}
            readOnly
            className="form-control-plaintext"
          />
        </td>
        <td>{cadastro.apresentou_requisitos ? "Sim" : "Não"}</td>
        <td>
          <MaskedInput
            mask={telefoneMask}
            value={cadastro.telefone}
            readOnly
            className="form-control-plaintext"
          />
        </td>
        <td>{cadastro.tem_carteirinha ? "Sim" : "Não"}</td>
        <td>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm mb-2 p-1"
              onClick={() => handleEdit(cadastro)}
            >
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm mb-2 p-1"
              onClick={() => handleDelete(cadastro.id)}
            >
              Deletar
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination btn btn-primary"}
        activeClassName={"active"}
      />
      {editingId && (
        <div className="mt-5">
          <h2>Editar Cadastro</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={formData.nome}
                onChange={handleNomeChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Idade</label>
              <input
                type="number"
                className="form-control"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Documento (RG ou CPF)</label>
              <MaskedInput
                mask={documentoMask}
                type="text"
                className="form-control"
                name="documento"
                value={formData.documento}
                onChange={handleDocumentoChange}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="apresentouRequisitos"
                checked={formData.apresentouRequisitos}
                onChange={handleChange}
              />
              <label className="form-check-label">Apresentou Requisitos</label>
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <MaskedInput
                mask={telefoneMask}
                type="text"
                className="form-control"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="temCarteirinha"
                checked={formData.temCarteirinha}
                onChange={handleChange}
              />
              <label className="form-check-label">Tem Carteirinha</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Atualizar
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => setEditingId(null)}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CadastroList;
