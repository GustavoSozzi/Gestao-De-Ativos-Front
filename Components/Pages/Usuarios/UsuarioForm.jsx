import React from "react";
import styles from "./UsuarioForm.module.css";

const UsuarioForm = ({
  onSubmit,
  onCancel,
  usuarioData,
  isEditing = false,
}) => {
  const [formData, setFormData] = React.useState({
    p_nome: "",
    sobrenome: "",
    matricula: "",
    departamento: "",
    cargo: "",
    password: "",
    ...usuarioData,
  });

  React.useEffect(() => {
    if (usuarioData) {
      setFormData({
        matricula: usuarioData.matricula || "",
        p_nome: usuarioData.p_nome || "",
        sobrenome: usuarioData.sobrenome || "",
        departamento: usuarioData.departamento || "",
        cargo: usuarioData.cargo || "",
        password: usuarioData.password || "",
      });
    }
  }, [usuarioData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.matricula || !formData.p_nome || !formData.sobrenome) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (!isEditing && !formData.password) {
      alert("A senha é obrigatória para novos usuários!");
      return;
    }

    const usuarioDataToSubmit = {
      p_nome: formData.p_nome,
      sobrenome: formData.sobrenome,
      matricula: Number(formData.matricula),
      departamento: formData.departamento || undefined,
      cargo: formData.cargo || undefined,
      password: formData.password || undefined,
    };

    if (formData.password) {
      usuarioDataToSubmit.password = formData.password;
    }

    if (isEditing && usuarioData && usuarioData.id_usuario) {
      usuarioDataToSubmit.id_usuario = usuarioData.id_usuario;
    }

    console.log("Dados enviados:", usuarioDataToSubmit);
    onSubmit(usuarioDataToSubmit);

    if (!isEditing) {
      setFormData({
        p_nome: "",
        sobrenome: "",
        matricula: "",
        departamento: "",
        cargo: "",
        password: "",
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>
        {isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}
      </h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="p_nome" className={styles.label}>
              Nome
            </label>
            <input
              type="text"
              id="p_nome"
              name="p_nome"
              value={formData.p_nome}
              onChange={handleChange}
              className={styles.input}
              placeholder="Digite o primeiro nome"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sobrenome" className={styles.label}>
              Sobrenome
            </label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              className={styles.input}
              placeholder="Digite o sobrenome"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="matricula" className={styles.label}>
              Matrícula *
            </label>
            <input
              type="number"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              className={styles.input}
              placeholder="Digite a matrícula"
              disabled={isEditing}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="departamento" className={styles.label}>
              Departamento
            </label>
            <input
              type="text"
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: TI, RH, Financeiro"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="cargo" className={styles.label}>
              Cargo
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ex: Analista, Gerente"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password {!isEditing && "*"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder={
                isEditing
                  ? "Deixe em branco para manter a senha atual"
                  : "Digite a senha"
              }
              required={!isEditing}
            />
            {isEditing && (
              <small className={styles.helpText}>
                Deixe em branco para manter a senha atual
              </small>
            )}
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
            {isEditing ? "Atualizar Usuário" : "Cadastrar Usuário"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioForm;
