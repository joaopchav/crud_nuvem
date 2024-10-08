import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altura total da viewport */
  width: 100vw;  /* Largura total da viewport */
  padding: 20px;
  background-color: #e6f7ff; /* Fundo azul claro */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow-y: auto;
`;

const InputArea = styled.div`
  margin-bottom: 20px;
  width: 100%; /* Largura total do contêiner do formulário */
  max-width: 600px; /* Largura máxima para manter a legibilidade */
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #b3d9ff; /* Borda azul clara */
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff; /* Fundo branco para os campos de entrada */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #0056b3; /* Azul escuro */
`;

const Button = styled.button`
  padding: 14px 24px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #0056b3; /* Azul escuro */
  color: white;
  font-size: 16px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #003d80; /* Azul mais escuro no hover */
  }
`;


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome || '';
      user.email.value = onEdit.email || '';
      user.cpf.value = onEdit.cpf || '';
      user.dataNascimento.value = onEdit.dataNascimento ? formatDateForInput(onEdit.dataNascimento) : '';
    }
  }, [onEdit]);

  const formatDateForInput = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.cpf.value ||
      !user.dataNascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      if (onEdit) {
        const response = await axios.put(`http://3.142.79.72:8800/${onEdit.id}`, {
          nome: user.nome.value,
          email: user.email.value,
          cpf: user.cpf.value,
          dataNascimento: user.dataNascimento.value,
        });
        toast.success(response.data);
      } else {
        const response = await axios.post("http://3.142.79.72:8800", {
          nome: user.nome.value,
          email: user.email.value,
          cpf: user.cpf.value,
          dataNascimento: user.dataNascimento.value,
        });
        toast.success(response.data);
      }

      user.nome.value = "";
      user.email.value = "";
      user.cpf.value = "";
      user.dataNascimento.value = "";

      setOnEdit(null);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data || 'Erro ao enviar dados');
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cpf" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="dataNascimento" type="date" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
