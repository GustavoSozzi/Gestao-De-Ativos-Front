import React from 'react';
import { LayoutContext } from '../../../Hooks/LayoutContext';
import { axiosPrivate } from '../../../src/api/axios';
import styles from './ChamadosPage.module.css';
import ChamadoForm from './ChamadoForm';
import ChamadoModal from './ChamadoModal';

const ChamadosPage = () => {
  const { setPageTitle } = React.useContext(LayoutContext);
  const [chamados, setChamados] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedChamado, setSelectedChamado] = React.useState(null);

  React.useEffect(() => {
    setPageTitle('Gestão de Chamados');
  }, [setPageTitle]);

  const fetchChamados = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/Chamados');
      const data = response.data;
      
      if (data && Array.isArray(data.chamados)) {
        setChamados(data.chamados);
      } else {
        setChamados([]);
      }
    } catch (err) {
      if (err.response?.status === 204) {
        setChamados([]);
      } else {
        setError(err.response?.data?.message || err.message || 'Erro ao buscar chamados');
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchChamados();
  }, []);

  const handleCreateChamado = async (chamadoData) => {
    try {
      await axiosPrivate.post('/Chamados/register', chamadoData);
      
      fetchChamados();
      setShowForm(false);
      setError(null);
      alert('Chamado cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro ao cadastrar chamado:', err);
      setError(err.response?.data?.message || err.message || 'Erro ao cadastrar chamado');
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      0: 'Aberto',
      1: 'Em Andamento',
      2: 'Fechado'
    };
    return statusMap[status] || 'Desconhecido';
  };

  const getStatusClass = (status) => {
    const statusClassMap = {
      0: styles.statusAberto,
      1: styles.statusEmAndamento,
      2: styles.statusFechado
    };
    return statusClassMap[status] || '';
  };

  const handleChamadoClick = (chamado) => {
    setSelectedChamado(chamado);
  };

  const handleCloseModal = () => {
    setSelectedChamado(null);
  };

  const handleUpdateChamado = () => {
    fetchChamados();
    setSelectedChamado(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>Gestão de Chamados</h2>
        <button
          className={styles.addButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Novo Chamado'}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)} className={styles.closeError}>
            ×
          </button>
        </div>
      )}

      {showForm && (
        <ChamadoForm
          onSubmit={handleCreateChamado}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className={styles.chamadosContainer}>
        {loading ? (
          <p>Carregando chamados...</p>
        ) : chamados.length === 0 ? (
          <p className={styles.emptyMessage}>Nenhum chamado cadastrado.</p>
        ) : (
          <div className={styles.chamadosList}>
            {chamados.map((chamado) => (
              <div 
                key={chamado.Id_Chamado || chamado.id_Chamado} 
                className={styles.chamadoCard}
                onClick={() => handleChamadoClick(chamado)}
              >
                <div className={styles.chamadoHeader}>
                  <h3>{chamado.titulo}</h3>
                  <span className={`${styles.statusBadge} ${getStatusClass(chamado.status_Chamado)}`}>
                    {getStatusLabel(chamado.status_Chamado)}
                  </span>
                </div>
                <p className={styles.descricao}>{chamado.descricao}</p>
                {chamado.solucao && (
                  <div className={styles.solucao}>
                    <strong>Solução:</strong> {chamado.solucao}
                  </div>
                )}
                <div className={styles.chamadoFooter}>
                  <span className={styles.data}>
                    Aberto em: {new Date(chamado.data_Abertura).toLocaleDateString('pt-BR')}
                  </span>
                  {chamado.ativo && (
                    <span className={styles.ativo}>
                      Ativo: {chamado.ativo.serialNumber}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedChamado && (
        <ChamadoModal
          chamado={selectedChamado}
          onClose={handleCloseModal}
          onUpdate={handleUpdateChamado}
        />
      )}
    </div>
  );
};

export default ChamadosPage;