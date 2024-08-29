import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";




const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
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

  const formatDateForInput = (date) => { // Ajuste a formatação da data 
   
    return new Date(date).toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    // Verificar se todos os campos estão preenchidos
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
        // Requisição PUT para atualizar o usuário existente
        const response = await axios.put(`http://3.142.79.72 :8800/${onEdit.id}`, {
          nome: user.nome.value,
          email: user.email.value,
          cpf: user.cpf.value,
          dataNascimento: user.dataNascimento.value,
        });
        toast.success(response.data);
      } else {
        // Requisição POST para criar um novo usuário
        const response = await axios.post("http://3.142.79.72 :8800", {
          nome: user.nome.value,
          email: user.email.value,
          cpf: user.cpf.value,
          dataNascimento: user.dataNascimento.value,
        });
        toast.success(response.data);
      }

      // Limpar o formulário e atualizar a lista de usuários
      user.nome.value = "";
      user.email.value = "";
      user.cpf.value = "";
      user.dataNascimento.value = "";

      setOnEdit(null);
      window.location.reload(); // Atualiza a página para exibir o novo usuário
      //getUsers();
    } catch (error) {
      // Exibir mensagem de erro
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
