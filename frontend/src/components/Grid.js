import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Container = styled.div`
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

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #b3d9ff;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #0056b3;
  color: white;
`;

const Th = styled.th`
  padding: 12px 15px;
  text-align: start;
  font-size: 16px;
`;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  font-size: 14px;
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #0056b3;
  font-size: 18px;
  transition: color 0.3s;

  &:hover {
    color: #003d80;
  }
`;

const Grid = ({ setOnEdit }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (query = "") => {
    try {
      const response = await axios.get(`http://3.142.79.72:8800/users?q=${query}`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Erro ao buscar usuários.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchUsers(e.target.value);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://3.142.79.72:8800/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success(response.data);
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
    }

    setOnEdit(null);
  };

  return (
    <Container>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar usuário...(Digite nome ou cpf)"
      />
      <Table>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>CPF</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td>{item.nome}</Td>
              <Td>{item.email}</Td>
              <Td>{item.cpf}</Td>
              <Td alignCenter>
                <IconButton onClick={() => handleEdit(item)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <FaTrash />
                </IconButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Grid;
