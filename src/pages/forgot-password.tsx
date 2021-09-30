import {
  BrandName,
  ButtonsContainer,
  Container,
  InputForm,
  PrimaryButton,
  Form,
  Subtitle,
  Title,
} from "../styles";

import Head from "next/head";
import { useState } from "react";
import Auth from "@aws-amplify/auth";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (!email) {
      alert(
        "Informe o email Para que possamos enviar o código de confirmação e prosseguirmos com a redefinição da sua senha, é necessário informar o email."
      );
      return false;
    }

    try {
      await Auth.forgotPassword(email);
      alert(
        `Código enviado para ${email}.\n\nCaso não tenha recebido, aguarde alguns minutos. Verifique também sua caixa de SPAM.`
      );
      router.push(`/new-password/${email}`);
    } catch (err) {
      alert(`Erro ${err.message}`);
    }
  }

  function handleCancelBtn() {
    router.push("/");
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
          <Title>Forgot Password?</Title>
          <Subtitle>
            Enviaremos um código de confirmação para a criação da nova senha em
            seu email. Caso não receba a mensagem em alguns minutos, verifique
            sua caixa de spam.
          </Subtitle>

          <InputForm
            type="email"
            placeholder="Email ..."
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          />

          <ButtonsContainer>
            <PrimaryButton type="button" onClick={handleSubmit}>
              Send Code
            </PrimaryButton>
            <PrimaryButton type="button" onClick={handleCancelBtn}>
              Cancel
            </PrimaryButton>
          </ButtonsContainer>
        </Form>
      </Container>
    </>
  );
}
