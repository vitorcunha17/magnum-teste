import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await api.post('/register', { email, password });

      if (response.status !== 200) {
        throw new Error('Falha ao registrar');
      }

      const data = await response;
      console.log(data);
      alert('Registro bem-sucedido!');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Senha:</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Confirmar Senha:</label>
        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <button type='submit'>Registrar</button>
      <button type='button' onClick={() => navigate('/login')}>Voltar</button>
    </form>
  );
}

export default RegisterPage;