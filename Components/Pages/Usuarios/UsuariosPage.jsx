import React from 'react';
import { LayoutContext } from '../../../Hooks/LayoutContext';
import { axiosPrivate } from '../../../src/api/axios';
import styles from './UsuariosPage.module.css';
import UsuariosList from './UsuariosList';
import UsuariosFilter from './UsuariosFilter';
import UsuarioForm from './UsuarioForm';
import VincularLicencasModal from './VincularLicencasModal';

const UsuariosPage = () => {
  const { setPageTitle } = React.useContext(LayoutContext);
  const [usuarios, setUsuarios] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingUsuario, setEditingUsuario] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showLicencasModal, setShowLicencasModal] = React.useState(false);
  const [selectedUsuario, setSelectedUsuario] = React.useState(null);
  const [filters, setFilters] = React.useState({
    matricula: '',
    nome: '',
    departamento: '',
    cargo: '',
    role: ''
  });

  React.useEffect(() => {
    setPageTitle('Gestão de Usuários');
  }, [setPageTitle]);

  const fetchUsuarios = async (filterParams = {}) => {
    try {
      setLoading(true);
      console.log('Buscando usuários...');
      
      // Construir query params apenas com valores preenchidos
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          queryParams.append(key, value);
        }
      });
      
      const queryString = queryParams.toString();
      const url = queryString ? `/Usuarios?${queryString}` : '/Usuarios';
      
      console.log('URL da requisição:', url);
      
      const response = await axiosPrivate.get(url);
      const data = response.data;
      
      console.log('Dados recebidos:', data);
      
      if (data && Array.isArray(data.usuarios)) {
        setUsuarios(data.usuarios);
      } else {
        setUsuarios([]);
      }
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro desconhecido ao buscar usuários');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsuarios();
  }, []);

  // Aplicar filtros com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsuarios(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      matricula: '',
      nome: '',
      departamento: '',
      cargo: '',
      role: ''
    });
  };

  const handleCreateUsuario = async (usuarioData) => {
    try {
      console.log('Enviando dados:', usuarioData);
      
      await axiosPrivate.post('/Usuarios/register', usuarioData);
      
      fetchUsuarios(filters);
      setShowForm(false);
      setError(null);
      alert('Usuário cadastrado com sucesso!');
      
    } catch (err) {
      console.error('Erro completo ao cadastrar usuário:', err);
      setError(err.response?.data?.message || err.message || 'Erro ao cadastrar usuário');
    }
  };

  const handleUpdateUsuario = async (usuarioData) => {
    try {
      await axiosPrivate.put(`/Usuarios/${usuarioData.id_usuario}`, usuarioData);

      alert("Usuário atualizado com sucesso");

      fetchUsuarios(filters);
      setEditingUsuario(null);
      setError(null);
    } catch(err) {
      setError(err.response?.data?.message || err.message || 'Erro ao atualizar usuário');
      console.error('Erro ao atualizar usuário:', err);
    }
  };

  const handleEditUsuario = (usuario) => {
    setEditingUsuario(usuario);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingUsuario(null);
  };

  const handleDeleteUsuario = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      await axiosPrivate.delete(`/Usuarios/${id}`);

      fetchUsuarios(filters);
      setError(null);
      alert('Usuário excluído com sucesso!');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro ao deletar usuário');
      console.error('Erro ao deletar usuário:', err);
    }
  };

  const handleVincularLicencas = (usuario) => {
    setSelectedUsuario(usuario);
    setShowLicencasModal(true);
  };

  const handleCloseLicencasModal = () => {
    setShowLicencasModal(false);
    setSelectedUsuario(null);
  };

  const handleLicencasSuccess = () => {
    fetchUsuarios(filters);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2>Gerenciamento de Usuários</h2>
        <button
          className={styles.addButton}
          onClick={() => {
            setShowForm(!showForm);
            setEditingUsuario(null);
          }}
        >
          {showForm ? 'Cancelar' : 'Novo Usuário'}
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

      {showForm && !editingUsuario && (
        <UsuarioForm
          onSubmit={handleCreateUsuario}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingUsuario && (
        <UsuarioForm
          onSubmit={handleUpdateUsuario}
          onCancel={handleCancelEdit}
          usuarioData={editingUsuario}
          isEditing={true}
        />
      )}

      <UsuariosFilter
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <UsuariosList
        usuarios={usuarios}
        onDelete={handleDeleteUsuario}
        onEdit={handleEditUsuario}
        onVincularLicencas={handleVincularLicencas}
        loading={loading}
      />

      {showLicencasModal && selectedUsuario && (
        <VincularLicencasModal
          usuario={selectedUsuario}
          onClose={handleCloseLicencasModal}
          onSuccess={handleLicencasSuccess}
        />
      )}
    </div>
  );
};

export default UsuariosPage;
