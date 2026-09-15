import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");
    setCarregando(true);

    try {
      await api.post("/usuarios", {
        name,
        email,
        password,
      });

      setSucesso("Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      if (error.response?.status === 400) {
        setErro(
          error.response.data.message || "Não foi possível realizar o cadastro."
        );
      } else {
        setErro("Não foi possível conectar ao servidor.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <div className="cadastro-logo">
          <span>✦</span>
        </div>

        <h1>Criar conta</h1>

        <p className="cadastro-subtitle">
          Cadastre-se para acessar o sistema
        </p>

        <form onSubmit={handleCadastro}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {erro && <p className="cadastro-error">{erro}</p>}

          {sucesso && <p className="cadastro-success">{sucesso}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="cadastro-login">
          Já possui uma conta?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;