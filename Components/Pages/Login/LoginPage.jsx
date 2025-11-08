import React from 'react';
import { AuthContext } from '../../../Hooks/AuthContext';
import styles from './LoginPage.module.css'; 
import InpasaLogo from '../../../assets/img/Logo_Inpasa.png'

const LoginPage = () => {
  const { login } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    login(username, password); 
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginBox}>
        <img src={InpasaLogo} alt="Logo Inpasa" className={styles.loginLogo} />
        
        <h1 className={styles.loginTitle}>Gestão de Ativos de TI</h1>
        
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Usuário</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ex: ti.usuario"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;