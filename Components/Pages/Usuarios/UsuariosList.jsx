import React from "react";
import styles from "./UsuariosList.module.css";

const UsuariosList = ({ usuarios, onDelete, onEdit, onVincularLicencas, loading }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Carregando usuários...</p>
      </div>
    );
  }

  if (!usuarios || usuarios.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nenhum usuário cadastrado.</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listTitle}>Usuários Cadastrados ({usuarios.length})</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Matrícula</th>
              <th>Nome Completo</th>
              <th>Departamento</th>
              <th>Cargo</th>
              <th>Role</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id_usuario || usuario.matricula}
                className={styles.tableRow}
              >
                <td>{usuario.id_usuario || "-"}</td>
                <td className={styles.matricula}>{usuario.matricula || "-"}</td>
                <td className={styles.nome}>
                  {usuario.p_nome && usuario.sobrenome 
                    ? `${usuario.p_nome} ${usuario.sobrenome}` 
                    : "-"}
                </td>
                <td>{usuario.departamento || "-"}</td>
                <td>{usuario.cargo || "-"}</td>
                <td>
                  <span className={
                    usuario.role === 'ADMIN' 
                      ? styles.roleAdmin 
                      : styles.roleTeamMember
                  }>
                    {usuario.role || "TEAM_MEMBER"}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    {usuario.id_usuario && (
                      <button
                        onClick={() => onVincularLicencas(usuario)}
                        className={styles.licencaButton}
                        title="Vincular licenças"
                      >
                        🔑
                      </button>
                    )}

                    {usuario.id_usuario && (
                      <button
                        onClick={() => onEdit(usuario)}
                        className={styles.editButton}
                        title="Editar usuário"
                      >
                        ✏️
                      </button>
                    )}

                    {usuario.id_usuario && (
                      <button
                        onClick={() => onDelete(usuario.id_usuario)}
                        className={styles.deleteButton}
                        title="Excluir usuário"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosList;
