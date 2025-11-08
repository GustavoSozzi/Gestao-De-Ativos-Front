import React from 'react';
import { LayoutContext } from '../../../Hooks/LayoutContext';
import styles from './ChamadosPage.module.css';

const ChamadosPage = () => {
  const { setPageTitle } = React.useContext(LayoutContext);

  React.useEffect(() => {
    setPageTitle('Gestão de Chamados');
  }, [setPageTitle]);

  return (
    <div className={styles.pageContainer}>
      <h2>Chamados (RF-03: Gestão de Chamados)</h2>
      <p>
        Aqui ficará a lista de chamados de manutenção e suporte.
      </p>
    </div>
  );
};

export default ChamadosPage;