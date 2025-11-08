import React from 'react';
import { LayoutContext } from '../../../Hooks/LayoutContext';
import styles from './AtivosPage.module.css';
import AtivoForm from './AtivoForm';
import AtivosList from './AtivosList';

const AtivosPage = () => {
  const { setPageTitle } = React.useContext(LayoutContext);
  const [ativos, setAtivos] = React.useState([]);
  const [localizacoes, setLocalizacoes] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingAtivo, setEditingAtivo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setPageTitle('Gestão de Ativos');
  }, [setPageTitle]);

  const API_BASE_URL = 'http://localhost:5234/api';

  const fetchLocalizacoes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Localizacao`);
      if (response.ok) {
        const data = await response.json();
        
        const dadosMapeados = (data.localizacoes || []).map(loc => {
          
          const idCorreto = loc.id_localizacao || loc.id_Localizacao || loc.Id_Localizacao;
          
          return {
            ...loc, 
            id_localizacao: idCorreto 
          };
        });

        setLocalizacoes(dadosMapeados);

      }
    } catch (err) {
      console.error('Erro ao buscar localizações:', err);
    }
  };

  const fetchAtivos = async () => {
    try {
      setLoading(true);
      console.log('Buscando ativos...');
      
      const response = await fetch(`${API_BASE_URL}/Ativos`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      if (data && Array.isArray(data.ativos)) {
        setAtivos(data.ativos);
      } else {
        setAtivos([]);
      }
      
    } catch (err) {
      console.error('Erro ao buscar ativos:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar ativos');
      setAtivos([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAtivos();
    fetchLocalizacoes();
  }, []);

  const handleCreateAtivo = async (ativoData) => {
    try {
      console.log('Enviando dados:', ativoData);
      
      const response = await fetch(`${API_BASE_URL}/Ativos/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ativoData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao cadastrar ativo: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      
      fetchAtivos();
      setShowForm(false);
      setError(null);
      
    } catch (err) {
      console.error('Erro completo ao cadastrar ativo:', err);
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar ativo');
    }
  };

    const handleUpdateAtivo = async (ativoData) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/Ativos/${ativoData.id_ativo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ativoData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar ativo: ${response.status} - ${errorText}`);
      }

      alert("Atualizado com sucesso");

      setAtivos(prev => prev.map(ativo => 
        ativo.id_ativo === ativoData.id_ativo 
          ? { ...ativo, ...ativoData }
          : ativo
      ));
      
      setEditingAtivo(null);
      setError(null);
    } catch(err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar ativo');
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
      const response = await fetch(`${API_BASE_URL}/Ativos/${id}`, {
        method: 'DELETE',
      });


      if (!response.ok) { throw new Error('Erro ao deletar ativo');}

      setAtivos(prev => prev.filter(ativo => ativo.id_ativo !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar ativo');
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