import React from 'react';
import { axiosPrivate } from '../../../src/api/axios';
import styles from './QuickSeed.module.css';

const QuickSeed = ({ onComplete }) => {
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState('');
  const [logs, setLogs] = React.useState([]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
  };

  const localizacoes = [
    { cidade: 'São Paulo', estado: 'SP' },
    { cidade: 'Rio de Janeiro', estado: 'RJ' },
    { cidade: 'Belo Horizonte', estado: 'MG' },
    { cidade: 'Curitiba', estado: 'PR' },
    { cidade: 'Porto Alegre', estado: 'RS' },
    { cidade: 'Brasília', estado: 'DF' },
    { cidade: 'Salvador', estado: 'BA' },
    { cidade: 'Fortaleza', estado: 'CE' }
  ];

  const ativos = [
    // Notebooks
    { nome: 'Notebook Dell', modelo: 'Latitude 5420', serialNumber: 'DLL-2023-001', codInventario: 1001, tipo: 'Notebook', id_localizacao: 1 },
    { nome: 'Notebook HP', modelo: 'EliteBook 840', serialNumber: 'HP-2023-002', codInventario: 1002, tipo: 'Notebook', id_localizacao: 1 },
    { nome: 'Notebook Lenovo', modelo: 'ThinkPad X1', serialNumber: 'LNV-2023-003', codInventario: 1003, tipo: 'Notebook', id_localizacao: 2 },
    { nome: 'Notebook Dell', modelo: 'Inspiron 15', serialNumber: 'DLL-2023-004', codInventario: 1004, tipo: 'Notebook', id_localizacao: 2 },
    { nome: 'Notebook Acer', modelo: 'Aspire 5', serialNumber: 'ACR-2023-005', codInventario: 1005, tipo: 'Notebook', id_localizacao: 3 },
    { nome: 'Notebook Asus', modelo: 'VivoBook 15', serialNumber: 'ASS-2023-006', codInventario: 1006, tipo: 'Notebook', id_localizacao: 3 },
    { nome: 'Notebook Samsung', modelo: 'Book E30', serialNumber: 'SMS-2023-007', codInventario: 1007, tipo: 'Notebook', id_localizacao: 4 },
    { nome: 'Notebook Dell', modelo: 'Vostro 3510', serialNumber: 'DLL-2023-008', codInventario: 1008, tipo: 'Notebook', id_localizacao: 4 },
    
    // Desktops
    { nome: 'Desktop Dell', modelo: 'OptiPlex 7090', serialNumber: 'DLL-DSK-001', codInventario: 2001, tipo: 'Desktop', id_localizacao: 5 },
    { nome: 'Desktop HP', modelo: 'ProDesk 600', serialNumber: 'HP-DSK-002', codInventario: 2002, tipo: 'Desktop', id_localizacao: 5 },
    { nome: 'Desktop Lenovo', modelo: 'ThinkCentre M90', serialNumber: 'LNV-DSK-003', codInventario: 2003, tipo: 'Desktop', id_localizacao: 6 },
    { nome: 'Desktop Dell', modelo: 'Precision 3650', serialNumber: 'DLL-DSK-004', codInventario: 2004, tipo: 'Desktop', id_localizacao: 6 },
    
    // Monitores
    { nome: 'Monitor LG', modelo: '24MK430H', serialNumber: 'LG-MON-001', codInventario: 3001, tipo: 'Monitor', id_localizacao: 1 },
    { nome: 'Monitor Samsung', modelo: 'T350', serialNumber: 'SMS-MON-002', codInventario: 3002, tipo: 'Monitor', id_localizacao: 1 },
    { nome: 'Monitor Dell', modelo: 'P2422H', serialNumber: 'DLL-MON-003', codInventario: 3003, tipo: 'Monitor', id_localizacao: 2 },
    { nome: 'Monitor AOC', modelo: '24B2XH', serialNumber: 'AOC-MON-004', codInventario: 3004, tipo: 'Monitor', id_localizacao: 2 },
    { nome: 'Monitor LG', modelo: '27UL500', serialNumber: 'LG-MON-005', codInventario: 3005, tipo: 'Monitor', id_localizacao: 3 },
    { nome: 'Monitor Samsung', modelo: 'Odyssey G5', serialNumber: 'SMS-MON-006', codInventario: 3006, tipo: 'Monitor', id_localizacao: 7 },
    
    // Impressoras
    { nome: 'Impressora HP', modelo: 'LaserJet Pro M404', serialNumber: 'HP-PRT-001', codInventario: 4001, tipo: 'Impressora', id_localizacao: 1 },
    { nome: 'Impressora Epson', modelo: 'EcoTank L3250', serialNumber: 'EPS-PRT-002', codInventario: 4002, tipo: 'Impressora', id_localizacao: 2 },
    { nome: 'Impressora Brother', modelo: 'DCP-L2540DW', serialNumber: 'BRT-PRT-003', codInventario: 4003, tipo: 'Impressora', id_localizacao: 3 },
    { nome: 'Impressora HP', modelo: 'OfficeJet Pro 9010', serialNumber: 'HP-PRT-004', codInventario: 4004, tipo: 'Impressora', id_localizacao: 4 },
    { nome: 'Impressora Canon', modelo: 'PIXMA G6010', serialNumber: 'CAN-PRT-005', codInventario: 4005, tipo: 'Impressora', id_localizacao: 8 },
    
    // Smartphones
    { nome: 'iPhone', modelo: '13 Pro', serialNumber: 'APL-PHN-001', codInventario: 5001, tipo: 'Smartphone', id_localizacao: 1 },
    { nome: 'Samsung Galaxy', modelo: 'S22', serialNumber: 'SMS-PHN-002', codInventario: 5002, tipo: 'Smartphone', id_localizacao: 2 },
    { nome: 'Motorola', modelo: 'Edge 30', serialNumber: 'MOT-PHN-003', codInventario: 5003, tipo: 'Smartphone', id_localizacao: 3 },
    
    // Tablets
    { nome: 'iPad', modelo: 'Air 5', serialNumber: 'APL-TAB-001', codInventario: 6001, tipo: 'Tablet', id_localizacao: 1 },
    { nome: 'Samsung Galaxy Tab', modelo: 'S8', serialNumber: 'SMS-TAB-002', codInventario: 6002, tipo: 'Tablet', id_localizacao: 2 },
    
    // Servidores
    { nome: 'Servidor Dell', modelo: 'PowerEdge R740', serialNumber: 'DLL-SRV-001', codInventario: 7001, tipo: 'Servidor', id_localizacao: 1 },
    { nome: 'Servidor HP', modelo: 'ProLiant DL380', serialNumber: 'HP-SRV-002', codInventario: 7002, tipo: 'Servidor', id_localizacao: 1 }
  ];

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSeed = async () => {
    setLoading(true);
    setLogs([]);
    let sucessos = 0;
    let erros = 0;

    try {
      // Inserir localizações
      setProgress('Inserindo localizações...');
      addLog('📍 Iniciando inserção de localizações', 'info');
      
      for (const loc of localizacoes) {
        try {
          await axiosPrivate.post('/Localizacao/register', loc);
          addLog(`✓ ${loc.cidade} - ${loc.estado}`, 'success');
          await delay(300);
        } catch (err) {
          addLog(`⚠ ${loc.cidade} - ${loc.estado} (pode já existir)`, 'warning');
        }
      }

      await delay(1000);

      // Inserir ativos
      setProgress('Inserindo ativos...');
      addLog('💻 Iniciando inserção de ativos', 'info');
      
      for (let i = 0; i < ativos.length; i++) {
        const ativo = ativos[i];
        try {
          await axiosPrivate.post('/Ativos/register', ativo);
          addLog(`✓ ${ativo.nome} ${ativo.modelo}`, 'success');
          sucessos++;
          setProgress(`Inserindo ativos... ${i + 1}/${ativos.length}`);
          await delay(400);
        } catch (err) {
          addLog(`✗ ${ativo.nome} ${ativo.modelo} - ${err.response?.data?.message || err.message}`, 'error');
          erros++;
        }
      }

      setProgress('Concluído!');
      addLog(`\n✅ Seed concluído! Sucessos: ${sucessos}, Erros: ${erros}`, 'success');
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);

    } catch (err) {
      addLog(`❌ Erro durante o seed: ${err.message}`, 'error');
      setProgress('Erro!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>🌱 Importação Rápida de Dados</h3>
        <p>Este componente irá inserir dados de exemplo no banco de dados</p>
      </div>

      <div className={styles.info}>
        <h4>O que será inserido:</h4>
        <ul>
          <li>8 Localizações (cidades brasileiras)</li>
          <li>35 Ativos variados:
            <ul>
              <li>8 Notebooks</li>
              <li>4 Desktops</li>
              <li>6 Monitores</li>
              <li>5 Impressoras</li>
              <li>3 Smartphones</li>
              <li>2 Tablets</li>
              <li>2 Servidores</li>
            </ul>
          </li>
        </ul>
      </div>

      {progress && (
        <div className={styles.progress}>
          <strong>{progress}</strong>
        </div>
      )}

      <div className={styles.logs}>
        {logs.map((log, index) => (
          <div key={index} className={`${styles.log} ${styles[log.type]}`}>
            <span className={styles.time}>{log.time}</span>
            <span className={styles.message}>{log.message}</span>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          onClick={handleSeed}
          disabled={loading}
          className={styles.seedButton}
        >
          {loading ? '⏳ Inserindo dados...' : '🚀 Iniciar Importação'}
        </button>
      </div>
    </div>
  );
};

export default QuickSeed;
