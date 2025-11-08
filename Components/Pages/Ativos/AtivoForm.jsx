import React from "react";
import styles from "./AtivoForm.module.css";

const AtivoForm = ({ onSubmit, onCancel, localizacoes = [] }) => {
  const [formData, setFormData] = React.useState({
    nome: "",
    modelo: "",
    serialNumber: "",
    codInventario: "",
    tipo: "",
    id_localizacao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "id_localizacao" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id_localizacao) {
      alert("Selecione uma localização!");
      return;
    }

    console.log("Form data atual", formData);

    const idLocalizacaoNumber = Number(formData.id_localizacao);

    console.log("id da localizacao aqui: ". idLocalizacaoNumber);

    if (isNaN(idLocalizacaoNumber) || idLocalizacaoNumber <= 0) {
      alert("Selecione uma localização válida!");
      return;
    }

    const ativoData = {
      nome: formData.nome,
      modelo: formData.modelo,
      serialNumber: formData.serialNumber,
      codInventario: Number(formData.codInventario),
      tipo: formData.tipo || undefined,
      id_localizacao: idLocalizacaoNumber,
    };

    console.log("Dados enviados:", ativoData);
    onSubmit(ativoData);

    setFormData({
      nome: "",
      modelo: "",
      serialNumber: "",
      codInventario: "",
      tipo: "",
      id_localizacao: "",
    });
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Cadastrar Novo Ativo</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="nome" className={styles.label}>
              Nome *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="modelo" className={styles.label}>
              Modelo *
            </label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="serialNumber" className={styles.label}>
              Serial Number *
            </label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="codInventario" className={styles.label}>
              Código Inventário *
            </label>
            <input
              type="number"
              id="codInventario"
              name="codInventario"
              value={formData.codInventario}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="tipo" className={styles.label}>
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Selecione um tipo</option>
              <option value="Computador">Computador</option>
              <option value="Notebook">Notebook</option>
              <option value="Monitor">Monitor</option>
              <option value="Impressora">Impressora</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="id_localizacao" className={styles.label}>
              Localização *
            </label>
            <select
              id="id_localizacao"
              name="id_localizacao"
              value={formData.id_localizacao}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Selecione uma localização</option>
              {localizacoes.map((localizacao) => (
                <option
                  key={localizacao.id_localizacao}
                  value={localizacao.id_localizacao}
                >
                  {localizacao.cidade} - {localizacao.estado}
                </option>
              ))}
            </select>
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
            Cadastrar Ativo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AtivoForm;
