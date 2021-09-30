import styled from "styled-components";

export const LoaderPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoaderComponent = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  transform: rotate(45deg);

  div {
    position: absolute;
    width: calc(150px / 2.5);
    height: calc(150px / 2.5);
    border: 4px solid #3751fe;
  }

  div:nth-child(1) {
    top: 0;
    left: 0;
    animation: spinner3A 7000ms linear infinite;

    @keyframes spinner3A {
      0%,
      8.33%,
      16.66%,
      100% {
        transform: translate(0%, 0%);
      }

      24.99%,
      33.32%,
      41.65% {
        transform: translate(100%, 0%);
      }

      49.98%,
      58.31%,
      66.64% {
        transform: translate(100%, 100%);
      }

      74.97%,
      83.30%,
      91.63% {
        transform: translate(0%, 100%);
      }
    }
  }

  div:nth-child(2) {
    --clr-spinner: #eedd99;
    top: 0;
    left: calc(150px / 2.5);
    animation: spinner3B 7000ms linear infinite;

    @keyframes spinner3B {
      0%,
      8.33%,
      91.63%,
      100% {
        transform: translate(0%, 0%);
      }

      16.66%,
      24.99%,
      33.32% {
        transform: translate(0%, 100%);
      }

      41.65%,
      49.98%,
      58.31% {
        transform: translate(-100%, 100%);
      }

      66.64%,
      74.97%,
      83.30% {
        transform: translate(-100%, 0%);
      }
    }
  }

  div:nth-child(3) {
    --clr-spinner: #eedd99;
    top: calc(150px / 2.5);
    left: calc(150px / 2.5);
    animation: spinner3C 7000ms linear infinite;

    @keyframes spinner3C {
      0%,
      83.30%,
      91.63%,
      100% {
        transform: translate(0, 0);
      }

      8.33%,
      16.66%,
      24.99% {
        transform: translate(-100%, 0);
      }

      33.32%,
      41.65%,
      49.98% {
        transform: translate(-100%, -100%);
      }

      58.31%,
      66.64%,
      74.97% {
        transform: translate(0, -100%);
      }
    }
  }
`;
