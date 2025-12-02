import React from "react";
import { axiosPrivate } from "../../../src/api/axios";
import styles from "./ChamadoModal.module.css";

const ChamadoModal = ({ chamado, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    titulo: chamado.titulo || "",
    descricao: chamado.descricao || "",
    solucao: chamado.solucao || "",
    status_Chamado: chamado.status_Chamado || 0,
  });
  const [loading, setLoading] = React.useState(false);

  const getStatusLabel = (status) => {
    const statusMap = {
      0: "Aberto",
      1: "Em Andamento",
      2: "Fechado",
    };
    return statusMap[status] || "Desconhecido";
  };

  const getStatusClass = (status) => {
    const statusClassMap = {
      0: styles.statusAberto,
      1: styles.statusEmAndamento,
      2: styles.statusFechado,
    };
    return statusClassMap[status] || "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status_Chamado" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const chamadoId = chamado.Id_Chamado || chamado.id_Chamado;
      
      console.log("Chamado completo:", chamado);
      console.log("ID do chamado:", chamadoId);
      
      const updateData = {
        data_Abertura: chamado.data_Abertura || chamado.Data_Abertura,
        titulo: formData.titulo,
        descricao: formData.descricao,
        solucao: formData.solucao || "",
        status_Chamado: formData.status_Chamado,
        id_Ativo: chamado.id_Ativo || chamado.Id_Ativo,
      };

      console.log("Dados de atualização:", updateData);

      await axiosPrivate.put(`/Chamados/${chamadoId}`, updateData);

      alert("Chamado atualizado com sucesso!");
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      console.error("Erro ao atualizar chamado:", err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Erro ao atualizar chamado"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      titulo: chamado.titulo || "",
      descricao: chamado.descricao || "",
      solucao: chamado.solucao || "",
      status_Chamado: chamado.status_Chamado || 0,
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Detalhes do Chamado</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {!isEditing ? (
          <div className={styles.modalBody}>
            <div className={styles.infoGroup}>
              <label>Status:</label>
              <span
                className={`${styles.statusBadge} ${getStatusClass(
                  chamado.status_Chamado
                )}`}
              >
                {getStatusLabel(chamado.status_Chamado)}
              </span>
            </div>

            <div className={styles.infoGroup}>
              <label>Título:</label>
              <p>{chamado.titulo}</p>
            </div>

            <div className={styles.infoGroup}>
              <label>Descrição:</label>
              <p>{chamado.descricao}</p>
            </div>

            {chamado.solucao && (
              <div className={styles.infoGroup}>
                <label>Solução:</label>
                <p>{chamado.solucao}</p>
              </div>
            )}

            <div className={styles.infoGroup}>
              <label>Data de Abertura:</label>
              <p>
                {new Date(chamado.data_Abertura).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {chamado.ativo && (
              <div className={styles.ativoInfo}>
                <h3>Ativo Vinculado</h3>
                <div className={styles.ativoDetails}>
                  <p>
                    <strong>Serial Number:</strong> {chamado.ativo.serialNumber}
                  </p>
                  <p>
                    <strong>Nome:</strong> {chamado.ativo.nome}
                  </p>
                  <p>
                    <strong>Modelo:</strong> {chamado.ativo.modelo}
                  </p>
                </div>
              </div>
            )}

            <div className={styles.modalActions}>
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Editar Chamado
              </button>
              <button className={styles.cancelButton} onClick={onClose}>
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="titulo">Título *</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descricao">Descrição *</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className={styles.textarea}
                rows="4"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status_Chamado">Status *</label>
              <select
                id="status_Chamado"
                name="status_Chamado"
                value={formData.status_Chamado}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value={0}>Aberto</option>
                <option value={1}>Em Andamento</option>
                <option value={2}>Fechado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="solucao">Solução</label>
              <textarea
                id="solucao"
                name="solucao"
                value={formData.solucao}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
              />
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChamadoModal;
