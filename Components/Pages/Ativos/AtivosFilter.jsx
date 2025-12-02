import React from 'react';
import styles from './AtivosFilter.module.css';

const AtivosFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <button 
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          <span className={styles.toggleIcon}>{isExpanded ? '▼' : '▶'}</span>
          <h3>Filtros de Busca</h3>
          {hasActiveFilters && !isExpanded && (
            <span className={styles.activeIndicator}>({Object.values(filters).filter(v => v !== '').length} ativos)</span>
          )}
        </button>
        {hasActiveFilters && (
          <button 
            className={styles.clearButton}
            onClick={onClearFilters}
            type="button"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {isExpanded && (
        <div className={styles.filterGrid}>
        <div className={styles.filterGroup}>
          <label htmlFor="nome">Nome do colaborador</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={filters.nome}
            onChange={handleInputChange}
            placeholder="Ex: Everton silva..."
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={filters.modelo}
            onChange={handleInputChange}
            placeholder="Ex: Latitude, ThinkPad..."
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={filters.tipo}
            onChange={handleInputChange}
            placeholder="Ex: Notebook, Desktop..."
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="codInventario">Código de Inventário</label>
          <input
            type="number"
            id="codInventario"
            name="codInventario"
            value={filters.codInventario}
            onChange={handleInputChange}
            placeholder="Ex: 1001"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={filters.cidade}
            onChange={handleInputChange}
            placeholder="Ex: São Paulo"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={filters.estado}
            onChange={handleInputChange}
            placeholder="Ex: SP"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="matriculaUsuario">Matrícula do Usuário</label>
          <input
            type="number"
            id="matriculaUsuario"
            name="matriculaUsuario"
            value={filters.matriculaUsuario}
            onChange={handleInputChange}
            placeholder="Ex: 12345"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="nomeUsuario">Nome do Usuário</label>
          <input
            type="text"
            id="nomeUsuario"
            name="nomeUsuario"
            value={filters.nomeUsuario}
            onChange={handleInputChange}
            placeholder="Ex: João Silva"
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default AtivosFilter;
