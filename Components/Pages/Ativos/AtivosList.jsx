import React from "react";
import styles from "./AtivosList.module.css";

const AtivosList = ({ ativos, onDelete, onEdit, loading }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Carregando ativos...</p>
      </div>
    );
  }

  if (!ativos || ativos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nenhum ativo cadastrado.</p>
      </div>
    );
  }

  const getLocalizacaoFormatada = (ativo) => {
    if (ativo.localizacao) {
      return `${ativo.localizacao.cidade} - ${ativo.localizacao.estado}`;
    }
    return "-";
  };

  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listTitle}>Ativos Cadastrados</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Modelo</th>
              <th>Serial Number</th>
              <th>Cód. Inventário</th>
              <th>Tipo</th>
              <th>Localização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ativos.map((ativo) => (
              <tr
                key={ativo.id_ativo || ativo.serialNumber}
                className={styles.tableRow}
              >
                <td>{ativo.id_ativo || "-"}</td>
                <td>{ativo.nome || "-"}</td>
                <td>{ativo.modelo || "-"}</td>
                <td>{ativo.serialNumber || "-"}</td>
                <td>{ativo.codInventario || "-"}</td>
                <td>{ativo.tipo || "-"}</td>
                <td>{getLocalizacaoFormatada(ativo)}</td>
                <td>
                  <div className={styles.actions}>
                    {ativo.id_ativo && (
                      <button
                        onClick={() => onEdit(ativo)}
                        className={styles.editButton}
                        title="Editar ativo"
                      >
                        ✏️
                      </button>
                    )}

                    {ativo.id_ativo && (
                      <button
                        onClick={() => onDelete(ativo.id_ativo)}
                        className={styles.deleteButton}
                        title="Excluir ativo"
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

export default AtivosList;
