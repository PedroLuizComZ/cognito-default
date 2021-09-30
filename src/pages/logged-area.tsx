import { Auth } from "aws-amplify";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  BrandName,
  ButtonsContainer,
  Container,
  Form,
  SecondaryButton,
  Subtitle,
  Title,
} from "../styles";

function Protected() {
  async function logout() {
    try {
      await Auth.signOut();
      router.push('/')
    } catch (err) {
      alert(err);
    }
  }

  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>Authentication with NextAuth and AWS Cognito</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form>
        <BrandName>Pedra1</BrandName>
        <Title>Logged Area</Title>
        <Subtitle>Private Area</Subtitle>

        <ButtonsContainer>
          <SecondaryButton onClick={logout}> Sign Up</SecondaryButton>
        </ButtonsContainer>
      </Form>
    </Container>
  );
}

export default Protected;
