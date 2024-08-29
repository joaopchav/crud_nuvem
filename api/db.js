// Desc: Arquivo de conexão com o banco de dados
import mysql from "mysql"

export const db = mysql.createConnection({
    host: 'cadastrocliente.cb0ymasqss6o.us-east-2.rds.amazonaws.com',
    port: "3306",
    user: 'admin',
    password: 'admin2024',
    database: 'cliente'
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Banco conectado com sucesso!');
});