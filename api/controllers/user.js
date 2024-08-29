import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM clientes";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO clientes(`nome`, `cpf`, `dataNascimento`, `email`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.dataNascimento,
    req.body.email,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE clientes SET `nome` = ?, `cpf` = ?, `dataNascimento` = ?, `email` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.cpf,
    req.body.dataNascimento,
    req.body.email,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM clientes WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};

export const searchUsers = (req, res) => {
  const searchTerm = `%${req.query.q}%`;
  const q = "SELECT * FROM clientes WHERE nome LIKE ? OR cpf LIKE ?";

  db.query(q, [searchTerm, searchTerm], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};