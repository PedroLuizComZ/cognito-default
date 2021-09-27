import React, { useState } from "react";

import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

interface currentSessionReturn {
  idToken?: {
    jwtToken: string
  }
} 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      alert(err);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Informe seu email e senha");
      return false;
    }

    // TODO: Validar email. Lembrando que emails como fulano+teste123@sambatech.com.br devem ser válidos.

    try {
      setLoading(true);
      const singInRequest = await Auth.signIn(email, password).then(
        async (user) => {
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            console.log({ userEmail: user });
            return false;
          }
          const response = await Auth.currentSession();
          console.log("Abacaxi");
          console.log(response.getIdToken().getJwtToken());
          setLoading(false);
          router.push("logged-area");
          return true;
        }
      );
    } catch (err) {
      setLoading(false);

      if (err.code === "UserNotConfirmedException") {
        alert("Confirmação de email pendente");
        return false;
      }

      alert(
        `${err.message}\n\nAinda precisa de ajuda? Entre em contato via suporte@casadosaber.com.br`
      );
      setLoading(false);
      return false;
    }
    return true;
  };

  return (
    <>
      {loading ? (
        <h1>Carregando</h1>
      ) : (
        <div>
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

          <button type="button" onClick={handleLogin}>
            Entrar
          </button>
          <p>Ainda não tem conta?</p>
          <Link href="/signup">
            <a>Cadastre-se</a>
          </Link>
        </div>
      )}
    </>
  );
}

Login.propTypes = {
  login: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.number,
  }),
};
