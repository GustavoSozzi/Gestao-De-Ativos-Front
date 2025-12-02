import React from 'react';
import { LayoutContext } from '../../../Hooks/LayoutContext';
import { axiosPrivate } from '../../../src/api/axios';
import styles from './AtivosPage.module.css';
import AtivoForm from './AtivoForm';
import AtivosList from './AtivosList';
import AtivosFilter from './AtivosFilter';

const AtivosPage = () => {
  const { setPageTitle } = React.useContext(LayoutContext);
  const [ativos, setAtivos] = React.useState([]);
  const [localizacoes, setLocalizacoes] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingAtivo, setEditingAtivo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filters, setFilters] = React.useState({
    nome: '',
    modelo: '',
    tipo: '',
    codInventario: '',
    cidade: '',
    estado: '',
    matriculaUsuario: '',
    nomeUsuario: ''
  });

  React.useEffect(() => {
    setPageTitle('Gestão de Ativos');
  }, [setPageTitle]);

  const fetchLocalizacoes = async () => {
    try {
      const response = await axiosPrivate.get('/Localizacao');
      const data = response.data;
      
      const dadosMapeados = (data.localizacoes || []).map(loc => {
        const idCorreto = loc.id_localizacao || loc.id_Localizacao || loc.Id_Localizacao;
        
        return {
          ...loc, 
          id_localizacao: idCorreto 
        };
      });

      setLocalizacoes(dadosMapeados);
    } catch (err) {
      console.error('Erro ao buscar localizações:', err);
    }
  };

  const fetchAtivos = async (filterParams = {}) => {
    try {
      setLoading(true);
      console.log('Buscando ativos...');
      
      // Construir query params apenas com valores preenchidos
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          queryParams.append(key, value);
        }
      });
      
      const queryString = queryParams.toString();
      const url = queryString ? `/Ativos?${queryString}` : '/Ativos';
      
      console.log('URL da requisição:', url);
      
      const response = await axiosPrivate.get(url);
      const data = response.data;
      
      console.log('Dados recebidos:', data);
      
      if (data && Array.isArray(data.ativos)) {
        setAtivos(data.ativos);
      } else {
        setAtivos([]);
      }
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro desconhecido ao buscar ativos');
      setAtivos([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAtivos();
    fetchLocalizacoes();
  }, []);

  // Aplicar filtros com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAtivos(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      nome: '',
      modelo: '',
      tipo: '',
      codInventario: '',
      cidade: '',
      estado: '',
      matriculaUsuario: '',
      nomeUsuario: ''
    });
  };

  const handleCreateAtivo = async (ativoData) => {
    try {
      console.log('Enviando dados:', ativoData);
      
      await axiosPrivate.post('/Ativos/register', ativoData);
      
      fetchAtivos(filters);
      setShowForm(false);
      setError(null);
      
    } catch (err) {
      console.error('Erro completo ao cadastrar ativo:', err);
      setError(err.response?.data?.message || err.message || 'Erro ao cadastrar ativo');
    }
  };

  const handleUpdateAtivo = async (ativoData) => {
    try {
      await axiosPrivate.put(`/Ativos/${ativoData.id_ativo}`, ativoData);

      alert("Atualizado com sucesso");

      fetchAtivos(filters);
      setEditingAtivo(null);
      setError(null);
    } catch(err) {
      setError(err.response?.data?.message || err.message || 'Erro ao atualizar ativo');
      console.error('Erro ao atualizar ativo:', err);
    }
  };

   const handleEditAtivo = (ativo) => {
    setEditingAtivo(ativo);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingAtivo(null);
  };


  const handleDeleteAtivo = async (id) => {
    try {
      await axiosPrivate.delete(`/Ativos/${id}`);

      fetchAtivos(filters);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro ao deletar ativo');
      console.error('Erro ao deletar ativo:', err);
    }
  };

   return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>Gerenciamento de Ativos</h2>
        <button
          className={styles.addButton}
          onClick={() => {
            setShowForm(!showForm);
            setEditingAtivo(null);
          }}
        >
          {showForm ? 'Cancelar' : 'Novo Ativo'}
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

      {showForm && !editingAtivo && (
        <AtivoForm
          onSubmit={handleCreateAtivo}
          onCancel={() => setShowForm(false)}
          localizacoes={localizacoes}
        />
      )}

      {editingAtivo && (
        <AtivoForm
          onSubmit={handleUpdateAtivo}
          onCancel={handleCancelEdit}
          localizacoes={localizacoes}
          ativoData={editingAtivo}
          isEditing={true}
        />
      )}

      <AtivosFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <AtivosList
        ativos={ativos}
        onDelete={handleDeleteAtivo}
        onEdit={handleEditAtivo}
        loading={loading}
      />
    </div>
  );
};

export default AtivosPage;