import React from 'react';
import styles from './UsuariosFilter.module.css';

const UsuariosFilter = ({ filters, onFilterChange, onClearFilters }) => {
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
          <label htmlFor="matricula">Matrícula</label>
          <input
            type="number"
            id="matricula"
            name="matricula"
            value={filters.matricula}
            onChange={handleInputChange}
            placeholder="Ex: 12345"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={filters.nome}
            onChange={handleInputChange}
            placeholder="Ex: João Silva"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="departamento">Departamento</label>
          <input
            type="text"
            id="departamento"
            name="departamento"
            value={filters.departamento}
            onChange={handleInputChange}
            placeholder="Ex: TI, RH, Financeiro..."
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="cargo">Cargo</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={filters.cargo}
            onChange={handleInputChange}
            placeholder="Ex: Analista, Gerente..."
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="role">Função</label>
          <select
            id="role"
            name="role"
            value={filters.role}
            onChange={handleInputChange}
          >
            <option value="">Todas as funções</option>
            <option value="administrator">Administrador</option>
            <option value="teamMember">Membro da Equipe</option>
          </select>
        </div>
      </div>
      )}
    </div>
  );
};

export default UsuariosFilter;
