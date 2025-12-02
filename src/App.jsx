import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/App.css"

import { AuthStorage } from "../Hooks/AuthContext";
import { LayoutStorage } from "../Hooks/LayoutContext";

import Layout from "../components/Layout/Layout";
import ProtectedRouter from "../Helper/ProtectedRouter";


import LoginPage from "../Components/Pages/Login/LoginPage";
import AtivosPage from "../Components/Pages/Ativos/AtivosPage";
import ChamadosPage from "../Components/Pages/Chamados/ChamadosPage";
import UsuariosPage from "../Components/Pages/Usuarios/UsuariosPage";

const DashboardPage = () => <div></div>;
const LicencasPage = () => <h2>Licenças</h2>;
const LocalizacoesPage = () => <h2>Localizações</h2>;
const NotFoundPage = () => <h2>404 - Página Não Encontrada</h2>;

function App() {
  return (
    <BrowserRouter>
        <LayoutStorage>
          <Routes>
            <Route path="/login/*" element={<LoginPage />} />

            <Route
              path="/"
              element={
                  <Layout />
              }
            >
              <Route path="/" element={<DashboardPage />} />
              <Route path="/ativos" element={<AtivosPage />} />
              <Route path="/chamados" element={<ChamadosPage />} />
              <Route path="/licencas" element={<LicencasPage />} />
              <Route path="/localizacoes" element={<LocalizacoesPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </LayoutStorage>
    </BrowserRouter>
  );
}

export default App;
