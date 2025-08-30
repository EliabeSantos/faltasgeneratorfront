"use client";
import styled from "styled-components";

export const MainDiv = styled.div`
  position: relative;
  height: 200vh;
`;
export const Header = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 5rem;
  background-color: #231f20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  h1 {
    color: #ff9f1c;
    font-weight: bold;
    font-size: 30px;
  }
  a {
    padding: 5px;
    border: 1px solid #ff9f1c;
    font-size: 20px;
  }
  a:hover {
    cursor: pointer;
    background-color: #ff9f1c;
  }
`;

export const TutorialPasso = styled.article`
  padding: 5px;
  max-width: 1000px;
  margin: 0 auto;
  h2 {
    font-size: 30px;
  }
  p {
  }
`;
