import React, { useState } from "react";

import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BrandName,
  ButtonsContainer,
  Container,
  InputForm,
  PrimaryButton,
  Form,
  Subtitle,
  Title,
  SecondaryButton,
  TextClickable,
} from "../styles";
import Head from "next/head";
import Loader from "../components/Loader/Index";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Informe seu email e senha");
      return false;
    }

    setLoading(true);

    await Auth.signIn(email, password)
      .then(async (user) => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          console.log({ userEmail: user });
          return false;
        }

        const response = await Auth.currentSession();
        localStorage.setItem("JWTToken", response.getIdToken().getJwtToken());
        router.push("logged-area");
      })
      .catch((error) => {
        if (error.code === "UserNotConfirmedException") {
          alert("Confirmação de email pendente");
        } else {
          alert("Ocorreu um erro");
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Head>
            <title>Authentication with NextAuth and AWS Cognito</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Form>
            <BrandName>Pedra1</BrandName>
            <Title>Login With Next and Cognito</Title>
            <Subtitle>Welcome back! Please login to your account.</Subtitle>
            <InputForm
              type="email"
              placeholder="Email ..."
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
            />
            <InputForm
              type="password"
              placeholder="Senha ..."
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
            />
            <Link href="/forgot-password" passHref>
              <TextClickable>Forgot Password?</TextClickable>
            </Link>
            <ButtonsContainer>
              <PrimaryButton type="button" onClick={handleLogin}>
                Entrar
              </PrimaryButton>
              <Link href="/signup" passHref>
                <SecondaryButton> Sign Up</SecondaryButton>
              </Link>
            </ButtonsContainer>
          </Form>
        </Container>
      )}
    </>
  );
}
