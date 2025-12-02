import React from "react";
import { axiosPrivate } from "../../../src/api/axios";
import styles from "./VincularLicencasModal.module.css";

const LICENCAS_DISPONIVEIS = [
  { id: 1, nome: "Business Basic", categoria: "Business" },
  { id: 2, nome: "Business Standard", categoria: "Business" },
  { id: 3, nome: "Business Premium", categoria: "Business" },
  { id: 4, nome: "Apps for Business", categoria: "Business" },
  { id: 10, nome: "Enterprise E1", categoria: "Enterprise" },
  { id: 11, nome: "Enterprise E3", categoria: "Enterprise" },
  { id: 12, nome: "Enterprise E5", categoria: "Enterprise" },
  { id: 13, nome: "Enterprise F3", categoria: "Enterprise" },
  { id: 14, nome: "Apps for Enterprise", categoria: "Enterprise" },
  { id: 20, nome: "Education A1", categoria: "Education" },
  { id: 21, nome: "Education A3", categoria: "Education" },
  { id: 22, nome: "Education A5", categoria: "Education" },
  { id: 30, nome: "Home and Business 2021", categoria: "Perpétuas" },
  { id: 31, nome: "Professional Plus 2021", categoria: "Perpétuas" },
  { id: 32, nome: "Standard 2019", categoria: "Perpétuas" },
  { id: 40, nome: "Project Plan 3", categoria: "Serviços Específicos" },
  { id: 41, nome: "Visio Plan 2", categoria: "Serviços Específicos" },
  { id: 42, nome: "Exchange Online", categoria: "Serviços Específicos" },
  { id: 43, nome: "Power BI Pro", categoria: "Serviços Específicos" },
];

const VincularLicencasModal = ({ usuario, onClose, onSuccess }) => {
  const [selectedLicencas, setSelectedLicencas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingLicencas, setLoadingLicencas] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Buscar licenças já atribuídas ao usuário
  React.useEffect(() => {
    const fetchUsuarioLicencas = async () => {
      try {
        setLoadingLicencas(true);
        const response = await axiosPrivate.get(`/Usuarios/${usuario.id_usuario}/licencas`);
        const licencasIds = response.data;
        setSelectedLicencas(licencasIds);
      } catch (err) {
        console.error("Erro ao buscar licenças do usuário:", err);
        // Se der erro, continua com array vazio
        setSelectedLicencas([]);
      } finally {
        setLoadingLicencas(false);
      }
    };

    fetchUsuarioLicencas();
  }, [usuario.id_usuario]);

  const handleToggleLicenca = (licencaId) => {
    setSelectedLicencas((prev) => {
      if (prev.includes(licencaId)) {
        return prev.filter((id) => id !== licencaId);
      } else {
        return [...prev, licencaId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedLicencas.length === 0) {
      alert("Selecione pelo menos uma licença!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axiosPrivate.post(
        `/Usuarios/${usuario.id_usuario}/licencas`,
        selectedLicencas
      );

      alert("Licenças vinculadas com sucesso!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Erro ao vincular licenças:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erro ao vincular licenças"
      );
    } finally {
      setLoading(false);
    }
  };

  const groupedLicencas = LICENCAS_DISPONIVEIS.reduce((acc, licenca) => {
    if (!acc[licenca.categoria]) {
      acc[licenca.categoria] = [];
    }
    acc[licenca.categoria].push(licenca);
    return acc;
  }, {});

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Vincular Licenças</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.usuarioInfo}>
            <p>
              <strong>Usuário:</strong> {usuario.p_nome} {usuario.sobrenome}
            </p>
            <p>
              <strong>Matrícula:</strong> {usuario.matricula}
            </p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          {loadingLicencas ? (
            <div className={styles.loadingLicencas}>
              <p>Carregando licenças do usuário...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.licencasContainer}>
              {Object.entries(groupedLicencas).map(([categoria, licencas]) => (
                <div key={categoria} className={styles.categoriaGroup}>
                  <h4 className={styles.categoriaTitle}>{categoria}</h4>
                  <div className={styles.licencasList}>
                    {licencas.map((licenca) => (
                      <label
                        key={licenca.id}
                        className={styles.licencaItem}
                      >
                        <input
                          type="checkbox"
                          checked={selectedLicencas.includes(licenca.id)}
                          onChange={() => handleToggleLicenca(licenca.id)}
                          className={styles.checkbox}
                        />
                        <span className={styles.licencaNome}>
                          {licenca.nome}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? "Vinculando..." : "Vincular Licenças"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VincularLicencasModal;
