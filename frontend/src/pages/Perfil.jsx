import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Perfil.css";

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPerfil() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/perfil");
        setUsuario(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  if (carregando) {
    return (
      <div className="perfil-loading">
        <p>Carregando seu perfil...</p>
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <div className="perfil-page">
      <header className="perfil-header">
        <div>
          <span className="perfil-brand">✦ Intertrack</span>
          <p>Área do usuário</p>
        </div>

        <button onClick={handleLogout}>Sair</button>
      </header>

      <main className="perfil-content">
        <div className="perfil-welcome">
          <span className="perfil-icon">👋</span>

          <div>
            <p>Bem-vindo de volta!</p>
            <h1>{usuario.name}</h1>
          </div>
        </div>

        <section className="perfil-card">
          <div className="card-title">
            <h2>Meu perfil</h2>
            <span className="status">Ativo</span>
          </div>

          <div className="perfil-info">
            <div>
              <span>Nome</span>
              <strong>{usuario.name}</strong>
            </div>

            <div>
              <span>E-mail</span>
              <strong>{usuario.email}</strong>
            </div>

            <div>
              <span>Tipo de acesso</span>
              <strong>
                {usuario.role === "admin"
                  ? "Administrador"
                  : "Usuário"}
              </strong>
            </div>

            <div>
              <span>ID do usuário</span>
              <strong>#{usuario.id}</strong>
            </div>
          </div>
        </section>

        <div className="security-card">
          <span>🔒</span>
          <div>
            <strong>Acesso protegido</strong>
            <p>
              Sua sessão está protegida por autenticação com JWT.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Perfil;