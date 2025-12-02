import React from "react";
import { axiosPrivate } from "../../../src/api/axios";
import styles from "./ChamadoForm.module.css";

const ChamadoForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    titulo: "",
    descricao: "",
    solucao: "",
    status_Chamado: 0, // Aberto por padrão
    id_Ativo: null,
  });

  const [serialNumberInput, setSerialNumberInput] = React.useState("");
  const [ativoEncontrado, setAtivoEncontrado] = React.useState(null);
  const [buscandoAtivo, setBuscandoAtivo] = React.useState(false);
  const [erroAtivo, setErroAtivo] = React.useState("");

  const buscarAtivoPorSerialNumber = async (serialNumber) => {
    if (!serialNumber || serialNumber.trim() === "") {
      setAtivoEncontrado(null);
      setErroAtivo("");
      setFormData((prev) => ({ ...prev, id_Ativo: null }));
      return;
    }

    setBuscandoAtivo(true);
    setErroAtivo("");

    try {
      const response = await axiosPrivate.get(`/Ativos`);
      const ativos = response.data.ativos || [];

      const ativo = ativos.find(
        (a) => a.serialNumber?.toLowerCase() === serialNumber.toLowerCase()
      );

      if (ativo) {
        setAtivoEncontrado(ativo);
        setFormData((prev) => ({
          ...prev,
          id_Ativo: ativo.id_ativo,
        }));
        setErroAtivo("");
      } else {
        setAtivoEncontrado(null);
        setFormData((prev) => ({ ...prev, id_Ativo: null }));
        setErroAtivo("Ativo não encontrado com este Serial Number");
      }
    } catch (err) {
      console.error("Erro ao buscar ativo:", err);
      setAtivoEncontrado(null);
      setFormData((prev) => ({ ...prev, id_Ativo: null }));
      setErroAtivo("Erro ao buscar ativo");
    } finally {
      setBuscandoAtivo(false);
    }
  };

  const handleSerialNumberChange = (e) => {
    const valor = e.target.value;
    setSerialNumberInput(valor);
  };

  const handleSerialNumberBlur = () => {
    if (serialNumberInput) {
      buscarAtivoPorSerialNumber(serialNumberInput);
    }
  };

  const handleLimparAtivo = () => {
    setSerialNumberInput("");
    setAtivoEncontrado(null);
    setErroAtivo("");
    setFormData((prev) => ({ ...prev, id_Ativo: null }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "status_Chamado" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serialNumberInput || serialNumberInput.trim() === "") {
      alert("Digite o Serial Number do ativo!");
      return;
    }

    if (!ativoEncontrado) {
      alert("Ativo não encontrado! Verifique o Serial Number.");
      return;
    }

    // Criar data no formato local (sem conversão UTC)
    const now = new Date();
    const dataLocal = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString();
    
    const chamadoDataToSubmit = {
      data_Abertura: dataLocal,
      titulo: formData.titulo,
      descricao: formData.descricao,
      solucao: formData.solucao || "",
      status_Chamado: formData.status_Chamado,
      id_Ativo: formData.id_Ativo,
    };

    console.log("Dados do chamado enviados:", chamadoDataToSubmit);
    onSubmit(chamadoDataToSubmit);

    // Limpar formulário
    setFormData({
      titulo: "",
      descricao: "",
      solucao: "",
      status_Chamado: 0,
      id_Ativo: null,
    });
    setSerialNumberInput("");
    setAtivoEncontrado(null);
    setErroAtivo("");
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Cadastrar Novo Chamado</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="serialNumber" className={styles.label}>
              Serial Number do Ativo *
            </label>
            <div className={styles.ativoInputGroup}>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={serialNumberInput}
                onChange={handleSerialNumberChange}
                onBlur={handleSerialNumberBlur}
                className={styles.input}
                placeholder="Digite o Serial Number"
                disabled={buscandoAtivo}
                required
              />
              {buscandoAtivo && (
                <span className={styles.loading}>🔍 Buscando...</span>
              )}
              {ativoEncontrado && (
                <button
                  type="button"
                  onClick={handleLimparAtivo}
                  className={styles.clearButton}
                  title="Limpar ativo"
                >
                  ✕
                </button>
              )}
            </div>
            {erroAtivo && (
              <span className={styles.errorText}>{erroAtivo}</span>
            )}
            {ativoEncontrado && (
              <div className={styles.ativoInfo}>
                <strong>Ativo encontrado:</strong> {ativoEncontrado.nome} -{" "}
                {ativoEncontrado.modelo}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="titulo" className={styles.label}>
              Título *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: Problema no teclado"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="descricao" className={styles.label}>
              Descrição *
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Descreva o problema detalhadamente"
              rows="4"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="status_Chamado" className={styles.label}>
              Status *
            </label>
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
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="solucao" className={styles.label}>
              Solução
            </label>
            <textarea
              id="solucao"
              name="solucao"
              value={formData.solucao}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Descreva a solução (opcional)"
              rows="3"
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            Cadastrar Chamado
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChamadoForm;
