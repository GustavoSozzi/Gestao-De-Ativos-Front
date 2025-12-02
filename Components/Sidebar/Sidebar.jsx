import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css'; 
import InpasaLogo from '../../assets/img/Logo_Inpasa.png'

import { 
  FiHardDrive, 
  FiMessageSquare, 
  FiFileText, 
  FiMapPin, 
  FiUsers 
} from 'react-icons/fi';


const menuItems = [
  { name: 'Ativos', path: '/ativos', icon: <FiHardDrive /> },
  { name: 'Chamados', path: '/chamados', icon: <FiMessageSquare /> },
  { name: 'Usuários', path: '/usuarios', icon: <FiUsers /> }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className={styles.sidebarContainer}>
      <div className={styles.logoWrapper}>
        <img src={InpasaLogo} alt="Logo Inpasa" className={styles.logoImg} />
      </div>
      
      <ul className={styles.menuList}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          

          const linkClasses = [
            styles.menuLink,
            isActive ? styles.active : ''
          ].join(' '); 

          return (
            <li className={styles.menuItem} key={item.name}>
              <Link to={item.path} className={linkClasses}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;