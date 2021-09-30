import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import {
  BrandName,
  ButtonsContainer,
  Container,
  Form,
  InputForm,
  PrimaryButton,
  Subtitle,
  Title,
} from "../../styles";
import Head from "next/head";
import { GetServerSideProps } from "next";

interface ConfirmCodeProps {
  userEmail: string;
}

const ConfirmCode = ({ userEmail }: ConfirmCodeProps) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async () => {
    if (!verificationCode) {
      alert("Opa! Informe o código de verificação");
      return false;
    }

    try {
      await Auth.confirmSignUp(userEmail, verificationCode);
      alert("Código Confirmado Realize o login ");
      router.push("/");
      return true;
    } catch (err) {
      if (err.code === "CodeMismatchException") {
        alert(
          `Código Inválido Verifique se o código enviado no seu email foi inserido corretamente.`
        );
      }
      return false;
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(userEmail);
      alert(
        `Código enviado para ${userEmail}.\n\nCaso não tenha recebido, aguarde alguns minutos. Verifique também sua caixa de SPAM.`
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
      <Container>
        <Head>
          <title>Authentication with NextAuth and AWS Cognito</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Form>
          <BrandName>Pedra1</BrandName>
          <Title>Confirmar Cadastro</Title>
          <Subtitle>
            Insira o código de confirmação de 6 dígitos enviado no seu email.
          </Subtitle>
          <InputForm
            type="number"
            placeholder="000000"
            onChange={(e: any) => setVerificationCode(e.target.value)}
            value={verificationCode}
          />

          <ButtonsContainer>
            <PrimaryButton type="button" onClick={handleSubmit}>
              Confirmar
            </PrimaryButton>
            <PrimaryButton type="button" onClick={handleResendCode}>
              Reenviar Código
            </PrimaryButton>
          </ButtonsContainer>
        </Form>
      </Container>
    </>
  );
};

export default ConfirmCode;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { userEmail } = params;
  return {
    props: {
      userEmail,
    },
  };
};
