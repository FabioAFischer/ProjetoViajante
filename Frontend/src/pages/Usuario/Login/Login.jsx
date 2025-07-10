import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastGeral from '../../../components/Toast/ToastGeral';
import CadLogForm from '../../../components/Usuario/CadLogForm';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/usuario/login', { email, senha });
            localStorage.setItem('usuarioLogado', JSON.stringify(response.data));
            toast.success('Login realizado com sucesso!');
            if (onLoginSuccess) onLoginSuccess(response.data);
            setTimeout(() => navigate('/telainicial'), 2000);
        } catch {
            toast.error('Email ou senha inválidos');
        }
    };

    return (
        <div>

            <CadLogForm
                titulo="Login"
                onSubmit={handleLogin}
                campos={[
                    { label: 'Email:', type: 'email', value: email, onChange: (e) => setEmail(e.target.value), placeholder: 'Digite seu email' },
                    { label: 'Senha:', type: 'password', value: senha, onChange: (e) => setSenha(e.target.value), placeholder: 'Digite sua senha' }
                ]}
                botaoTexto="Entrar"
                linkMensagem="Não tem conta?"
                linkTexto="Cadastre-se"
                linkTo="/cadastro"
                containerClass="container-cadastro-login"
                formGroupClass="form-cadastro-login"
                buttonClass="btn-cadastro-login"
            />

            <ToastGeral />

        </div>
    );
};

export default Login;
