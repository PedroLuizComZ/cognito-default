import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 720px;
  padding: 0 12px;
  margin: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const BrandName = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;

  color: #3751fe;
`;

export const Title = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 49px;

  color: #3751fe;
`;

export const Subtitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;

  color: rgba(0, 0, 0, 0.6);
`;

export const InputForm = styled.input`
  border: 0;
  padding: 6px 2px;
  font-size: 16px;
  border-bottom: solid 1px #3751fe;
  margin: 10px 0px;
  color: #3751fe;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
`;

export const PrimaryButton = styled.button`
  background: #3751fe;
  box-shadow: 0px 4px 3px rgb(0 0 0 / 25%);
  color: #ffffff;
  border: 0;
  font-size: 15px;
  padding: 12px 18px;
  margin-right: 30px;
  font-weight: bold;
  cursor: pointer;
`;

export const SecondaryButton = styled.a`
  background: #ffffff;
  box-shadow: 0px 4px 3px rgb(0 0 0 / 25%);
  color: #3751fe;
  border: solid 1px #3751fe;
  font-size: 15px;
  font-weight: bold;
  padding: 12px 18px;
  cursor: pointer;
  text-decoration: none;
`;

export const TextClickable = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  margin-top: 14px;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
`;
