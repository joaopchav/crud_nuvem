import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const InputArea = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3;
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
