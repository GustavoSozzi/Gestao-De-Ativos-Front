import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './LoginPage.module.css'; 
import InpasaLogo from '../../../assets/img/Logo_Inpasa.png'

const LoginPage = () => {
  const navigate = useNavigate();
  const [matricula, setMatricula] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = useState('')


  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setLoading(false);
    setError('');

    if(!matricula || !password){
      setError('Preencha todos os campos');
      setLoading(false);
      return ;
    }

    if(!isNaN(matricula)){
      setError('Deve conter apenas numeros');
    }

    const loginPayload = {
      matricula: matricula,
      password: password
    };

    axios
      .post("http://localhost:5234/api/Login", loginPayload)
      .then((response) => {


        const token = response.data.token;

        localStorage.setItem("token", token);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        console.log(response.data)

        navigate("/");
      })

      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginBox}>
        <img src={InpasaLogo} alt="Logo Inpasa" className={styles.loginLogo} />
        
        <h1 className={styles.loginTitle}>Gestão de Ativos de TI</h1>
        
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="matricula">Matricula</label>
            <input 
              type="text" 
              id="matricula" 
              value={matricula}
              onChange={(e) => setMatricula(e.target.value.replace(/\D/g, ''))} //apenas numeros
              placeholder="ex: 9090"
              required
              disabled={loading}
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
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          <button type="submit" disabled={loading} className={styles.loginButton}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;