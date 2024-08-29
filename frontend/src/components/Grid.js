import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ setOnEdit }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (query = "") => {
    try {
      const response = await axios.get(`http://localhost:8800/users?q=${query}`);
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
      const response = await axios.delete(`http://localhost:8800/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success(response.data);
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
    }

    setOnEdit(null);
  };



  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar usuário...(Digite nome ou cpf)"
        style={{ margin: "20px", padding: "10px", width: "calc(100% - 40px)" }}
      />
      <Table>
      <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th >CPF</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td width="30%">{item.nome}</Td>
              <Td width="30%">{item.email}</Td>
              <Td width="20%" onlyWeb>
                {item.cpf}
              </Td>
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default Grid;