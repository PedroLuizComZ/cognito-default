import React, { useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import {
  BrandName,
  ButtonsContainer,
  Container,
  Form,
  InputForm,
  PrimaryButton,
  SecondaryButton,
  Title,
} from "../styles";
import Link from "next/link";
import Head from "next/head";
import Loader from "../components/Loader/Index";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const router = useRouter();

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
        `Para se cadastrar, é necessário informar seu nome, email e senha.`
      );
      setLoading(false);
      return false;
    }
    if (password !== passwordConfirmation) {
      alert(
        `As senhas inseridas são diferentes. Verifique-as e tente novamente.`
      );
      setLoading(false);
      return false;
    }

    if (
      !validatePassword(password) ||
      !validatePassword(passwordConfirmation)
    ) {
      alert(
        `Sua senha deve ter no mínimo 6 caracteres, uma letra maiúscula e uma letra minúscula.`
      );
      setLoading(false);
      return false;
    }

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          email,
        },
      });
      router.push(`/confirmation-code/${email}`);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(`Erro ${err.message}`);
    }
    
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
            <Title>Crie sua conta</Title>
            <InputForm
              type="text"
              placeholder="Name"
              onChange={(e: any) => setName(e.target.value)}
              value={name}
            />
            <InputForm
              type="email"
              placeholder="E-Mail"
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
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
              <PrimaryButton type="button" onClick={handleSignUp}>
                Cadastrar
              </PrimaryButton>
              <Link href="/" passHref>
                <SecondaryButton> Cancel</SecondaryButton>
              </Link>
            </ButtonsContainer>
          </Form>
        </Container>
      )}
    </>
  );
};

export default SignUp;
