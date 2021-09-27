import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Auth } from "aws-amplify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const router = useRouter()

  function validateUserName(userName: string) {
    return !!(
      userName &&
      userName.length >= 5 &&
      userName.match(/^[a-zA-Z\u00C0-\u00FF]+(\s{1}[a-zA-Z\u00C0-\u00FF]+)*$/)
    );
  }

  function validatePassword(pass: string) {
    return !!(
      pass &&
      pass.length >= 6 &&
      pass.match(/^(?=.*[A-Z])(?=.*[a-z]).*$/)
    );
  }

  const handleSignUp = async () => {
    setLoading(true);
    if (!name || !email || !password || !passwordConfirmation) {
      alert(
        `Para se cadastrar, é necessário informar seu nome, email e senha.
        \nPrecisa de ajuda? Entre em contato via suporte@casadosaber.com.br`
      );
      setLoading(false);
      return false;
    }
    if (password !== passwordConfirmation) {
      alert(
        `As senhas inseridas são diferentes. Verifique-as e tente novamente.
        \nPrecisa de ajuda? Entre em contato via suporte@casadosaber.com.br`
      );
      setLoading(false);
      return false;
    }
    if (!validateUserName(name)) {
      alert(
        `O nome deve ter no mínimo 5 caracteres, não conter caracter especial e não conter números.
        \nPrecisa de ajuda? Entre em contato via suporte@casadosaber.com.br`
      );
      setLoading(false);
      return false;
    }
    if (
      !validatePassword(password) ||
      !validatePassword(passwordConfirmation)
    ) {
      alert(
        `Sua senha deve ter no mínimo 6 caracteres, uma letra maiúscula e uma letra minúscula.
        \nPrecisa de ajuda? Entre em contato via suporte@casadosaber.com.br`
      );
      setLoading(false);
    } else {
      try {
        console.log(email)
        await Auth.signUp({
          username: email,
          password,
          attributes: {
            name,
            email,
          },
        });
        router.push('/confirmation-code')
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(`Erro ${err.message}`);
      }
    }
  };

  return (
    <>
      {loading ? (
        <h1>Carregando</h1>
      ) : (
        <>
          <h1>Crie sua conta</h1>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
          />

          <input
            type="email"
            placeholder="email"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="Senha"
            placeholder="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="Senha"
            placeholder="Confirmar password"
            onChange={(e: any) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
          />

          <button type="button" onClick={handleSignUp} >
            Cadastrar
          </button>
        </>
      )}
    </>
  );
};

export default SignUp;
