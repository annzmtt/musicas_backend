
import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados MySQL
const sql = mysql2.createPool({
  host: process.env.HOST_BANCO,
  user: process.env.USUARIO_BANCO,
  password: process.env.SENHA_BANCO,
  database: process.env.NOME_BANCO
});

// Teste da conexão com o banco
app.get("/banco", (req, res) => {
  sql.getConnection((erro, conexao) => {
    if (erro) {
      console.error("Erro ao conectar ao banco:", erro.message);

      return res.status(500).json({
        mensagem: "Erro ao conectar ao banco de dados",
        erro: erro.message
      });
    }

    conexao.release();

    res.json({
      mensagem: "Conexão com o banco de dados realizada com sucesso!"
    });
  });
});

// Primeira rota: listar músicas
app.get("/", (request, response) => {
  const comandoSelect = "SELECT * FROM musicas_anna";

  sql.query(comandoSelect, (error, data) => {
    if (error) {
      console.log(error);
      return response.status(500).json(error);
    }

    response.json(data);
  });
});

// Inicialização do servidor
const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`Servidor online na porta ${PORTA}`);
});

export default app;
