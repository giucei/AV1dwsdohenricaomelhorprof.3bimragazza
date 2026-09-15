import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      );

      navigate("/perfil");
    } catch (error) {
      if (error.response?.status === 401) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Não foi possível conectar ao servidor.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span>✦</span>
        </div>

        <h1>Bem-vindo!</h1>
        <p className="login-subtitle">
          Entre na sua conta para continuar
        </p>

        <form onSubmit={handleLogin}>
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {erro && <p className="login-error">{erro}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
                </form>

        <p className="login-cadastro">
          Ainda não possui uma conta?{" "}
          <button type="button" onClick={() => navigate("/cadastro")}>
            Cadastre-se
          </button>
        </p>

        <p className="login-footer">
          Sistema acadêmico • Acesso seguro
        </p>
      </div>
    </div>
  );
}

export default Login;