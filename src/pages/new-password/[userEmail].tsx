import {
  BrandName,
  ButtonsContainer,
  Container,
  InputForm,
  PrimaryButton,
  Form,
  Subtitle,
  Title,
} from "../../styles";

import Head from "next/head";
import { useState } from "react";
import Auth from "@aws-amplify/auth";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface newPasswordProps {
  userEmail: string;
}

export default function NewPassword({ userEmail }: newPasswordProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (!verificationCode || !password) {
      alert(
        `Informe o código de verificação e a nova senha Para redefinir sua senha, é necessário informar o código de verificação enviado no email e a nova senha.`
      );
      return false;
    }

    if (password !== passwordConfirmation) {
      alert(`Senha Diferentes`);
      return false;
    }

    try {
      await Auth.forgotPasswordSubmit(userEmail, verificationCode, password);
      alert("Senha redefinida com sucesso!");
      router.push("/");

      return true;
    } catch (err) {
      alert(`Erro ${err.message}`);
    }
  }

  async function resendCode() {
    try {
      await Auth.forgotPassword(userEmail);
      alert(
        `Enviamos um novo código! Código enviado para ${userEmail}.\n\nCaso não tenha recebido, aguarde alguns minutos. Verifique também sua caixa de SPAM.`
      );
    } catch (err) {
      alert(`Erro ao reenviar código ${err.message}`);
    }
  }

  return (
    <>
      <Container>
        <Head>
          <title>Authentication with NextAuth and AWS Cognito</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Form>
          <BrandName>Pedra1</BrandName>
          <Title>Password Reset</Title>
          <Subtitle>
            Enter the 6-digit confirmation code sent in your email and the new
            Password.
          </Subtitle>

          <InputForm
            type="number"
            placeholder="000000"
            onChange={(e: any) => setVerificationCode(e.target.value)}
            value={verificationCode}
          />

          <InputForm
            type="password"
            placeholder="Password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
          <InputForm
            type="password"
            placeholder="Confirm Password"
            onChange={(e: any) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
          />

          <ButtonsContainer>
            <PrimaryButton type="button" onClick={handleSubmit}>
              Redefine password
            </PrimaryButton>
            <PrimaryButton type="button" onClick={resendCode}>
              Resend code
            </PrimaryButton>
          </ButtonsContainer>
        </Form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { userEmail } = params;
  return {
    props: {
      userEmail,
    },
  };
};
