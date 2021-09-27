import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const ConfirmCode = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!verificationCode) {
      alert("Opa! Informe o código de verificação");
      return false;
    }

    try {
      await Auth.confirmSignUp(email, verificationCode);
      alert(
        "Código Confirmado Realize o login e aproveite o Casa do Saber on Demand!"
      );
      router.push("/");
      return true;
    } catch (err) {
      if (err.code === "CodeMismatchException") {
        alert(
          `Código Inválido Verifique se o código enviado no seu email foi inserido corretamente.
          \nPrecisa de ajuda? Entre em contato via suporte@casadosaber.com.br`
        );
      }
      return false;
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(email);
      alert(
        `Código enviado para ${email}.\n\nCaso não tenha recebido, aguarde alguns minutos. Verifique também sua caixa de SPAM.`
      );
      return true;
    } catch (err) {
      if (err.code === "InvalidParameterException") {
        alert(
          `Não foi possível reenviar o código no momento, tente novamente em alguns instantes.`
        );
      }
      return false;
    }
  };

  return (
    <>
      <h1>Confirmar Cadastro</h1>
      <p>Insira o código de confirmação de 6 dígitos enviado no seu email.</p>
      <input
        type="email"
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
      />

      <input
        type="number"
        onChange={(e: any) => setVerificationCode(e.target.value)}
        value={verificationCode}
        placeholder="000000"
        maxLength={6}
      />

      <button type="button" onClick={handleSubmit}>
        Confirmar
      </button>

      <button type="button" onClick={handleResendCode}>
        Reenviar Código
      </button>
    </>
  );
};

export default ConfirmCode;
