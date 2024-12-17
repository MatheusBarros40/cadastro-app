import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api.js';
import MaskedInput from 'react-text-mask';
import { toast, ToastContainer } from "react-toastify";



const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    documento: '',
    apresentouRequisitos: false,
    telefone: '',
    temCarteirinha: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preparedData = {
      nome: formData.nome,
      idade: formData.idade,
      documento: formData.documento,
      apresentou_requisitos: formData.apresentouRequisitos, 
      telefone: formData.telefone.replace(/\D/g, ''), 
      tem_carteirinha: formData.temCarteirinha, 
    };
    api.post('/', preparedData)
      .then(response => {
        alert('Cadastro realizado com sucesso!');
        setFormData({
          nome: '',
          idade: '',
          documento: '',
          apresentouRequisitos: false,
          telefone: '',
          temCarteirinha: false,
        });
        toast.success("Cadastro criado com sucesso!");
      })
      .catch(error => {
        console.error('Houve um erro ao realizar o cadastro!', error);
        toast.error("Houve um erro ao realizar o cadastro!");
      });
  };

  
  const handleNomeChange = (e) => {
    setFormData({
      ...formData,
      nome: e.target.value.toUpperCase(),
    });
  };

  const handleDocumentoChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let mask = '';
    if (value.length <= 8) {
      mask = '99999999';
    } else if (value.length <= 11) {
      mask = '999.999.999-99';
    }
    setFormData({
      ...formData,
      documento: value,
      documentoMask: mask,
    });
  };
  const documentoMask = (rawValue) => {
    const value = rawValue.replace(/\D/g, '');
    if (value.length <= 8) {
      return [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    } else {
      return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    }
  };

  const telefoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  return (
    <div className="container mt-5">
      <h2>Cadastro</h2>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroForm;
