import React from "react";
import { axiosPrivate } from "../../../src/api/axios";
import styles from "./AtivoForm.module.css";

const AtivoForm = ({
  onSubmit,
  onCancel,
  localizacoes = [],
  ativoData,
  isEditing = false,
}) => {
  const [formData, setFormData] = React.useState({
    nome: "",
    modelo: "",
    serialNumber: "",
    codInventario: "",
    tipo: "",
    id_localizacao: "",
    id_usuario: null,
    ...ativoData,
  });

  const [matriculaInput, setMatriculaInput] = React.useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = React.useState(null);
  const [buscandoUsuario, setBuscandoUsuario] = React.useState(false);
  const [erroUsuario, setErroUsuario] = React.useState("");

  React.useEffect(() => {
    if (ativoData) {
      setFormData({
        nome: ativoData.nome || "",
        modelo: ativoData.modelo || "",
        serialNumber: ativoData.serialNumber || "",
        codInventario: ativoData.codInventario || "",
        tipo: ativoData.tipo || "",
        id_localizacao: ativoData.id_localizacao || "",
        id_usuario: ativoData.id_usuario || null,
      });

      // Se já tem usuário vinculado, buscar os dados
      if (ativoData.usuario) {
        setUsuarioEncontrado(ativoData.usuario);
        setMatriculaInput(ativoData.usuario.matricula?.toString() || "");
      }
    }
  }, [ativoData]);

  const buscarUsuarioPorMatricula = async (matricula) => {
    if (!matricula || matricula.trim() === "") {
      setUsuarioEncontrado(null);
      setErroUsuario("");
      setFormData((prev) => ({ ...prev, id_usuario: null, nome: "" }));
      return;
    }

    setBuscandoUsuario(true);
    setErroUsuario("");

    try {
      const response = await axiosPrivate.get(
        `/Usuarios?matricula=${matricula}`
      );
      const usuarios = response.data.usuarios || [];

      if (usuarios.length > 0) {
        const usuario = usuarios[0];
        setUsuarioEncontrado(usuario);
        // Preenche automaticamente o nome com o nome do usuário
        const nomeCompleto = `${usuario.p_nome} ${usuario.sobrenome}`;
        setFormData((prev) => ({
          ...prev,
          id_usuario: usuario.id_usuario,
          nome: nomeCompleto,
        }));
        setErroUsuario("");
      } else {
        setUsuarioEncontrado(null);
        setFormData((prev) => ({ ...prev, id_usuario: null, nome: "" }));
        setErroUsuario("Usuário não encontrado com esta matrícula");
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setUsuarioEncontrado(null);
      setFormData((prev) => ({ ...prev, id_usuario: null, nome: "" }));
      setErroUsuario("Erro ao buscar usuário");
    } finally {
      setBuscandoUsuario(false);
    }
  };

  const handleMatriculaChange = (e) => {
    const valor = e.target.value;
    setMatriculaInput(valor);
  };

  const handleMatriculaBlur = () => {
    if (matriculaInput) {
      buscarUsuarioPorMatricula(matriculaInput);
    }
  };

  const handleLimparUsuario = () => {
    setMatriculaInput("");
    setUsuarioEncontrado(null);
    setErroUsuario("");
    setFormData((prev) => ({ ...prev, id_usuario: null, nome: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "id_localizacao" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!matriculaInput || matriculaInput.trim() === "") {
      alert("Digite a matrícula do usuário!");
      return;
    }

    if (!usuarioEncontrado) {
      alert("Usuário não encontrado! Verifique a matrícula.");
      return;
    }

    if (!formData.id_localizacao) {
      alert("Selecione uma localização!");
      return;
    }

    console.log("Form data atual", formData);

    const idLocalizacaoNumber = Number(formData.id_localizacao);

    console.log("id da localizacao aqui: ", idLocalizacaoNumber);

    if (isNaN(idLocalizacaoNumber) || idLocalizacaoNumber <= 0) {
      alert("Selecione uma localização válida!");
      return;
    }

    const ativoDataToSubmit = {
      nome: formData.nome,
      modelo: formData.modelo,
      serialNumber: formData.serialNumber,
      codInventario: Number(formData.codInventario),
      tipo: formData.tipo || undefined,
      id_localizacao: idLocalizacaoNumber,
      id_usuario: formData.id_usuario || null,
    };

    if (isEditing && ativoData && ativoData.id_ativo) {
      ativoDataToSubmit.id_ativo = ativoData.id_ativo;
    }

    console.log("Dados enviados:", ativoDataToSubmit);
    onSubmit(ativoDataToSubmit);

    if (!isEditing) {
      setFormData({
        nome: "",
        modelo: "",
        serialNumber: "",
        codInventario: "",
        tipo: "",
        id_localizacao: "",
        id_usuario: null,
      });
      setMatriculaInput("");
      setUsuarioEncontrado(null);
      setErroUsuario("");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Cadastrar Novo Ativo</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="matricula" className={styles.label}>
              Matrícula do Usuário *
            </label>
            <div className={styles.usuarioInputGroup}>
              <input
                type="number"
                id="matricula"
                name="matricula"
                value={matriculaInput}
                onChange={handleMatriculaChange}
                onBlur={handleMatriculaBlur}
                className={styles.input}
                placeholder="Digite a matrícula"
                disabled={buscandoUsuario}
                required
              />
              {buscandoUsuario && (
                <span className={styles.loading}>🔍 Buscando...</span>
              )}
              {usuarioEncontrado && (
                <button
                  type="button"
                  onClick={handleLimparUsuario}
                  className={styles.clearButton}
                  title="Limpar usuário"
                >
                  ✕
                </button>
              )}
            </div>
            {erroUsuario && (
              <span className={styles.errorText}>{erroUsuario}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nome" className={styles.label}>
              Nome do colaborador *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={styles.input}
              placeholder="Preenchido automaticamente"
              readOnly
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
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
