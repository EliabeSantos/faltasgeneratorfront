import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  background-color: #231f20;
  padding-top: 40px;
  min-height: 100vh;

  * {
    color: white;
  }

  position: relative;
  @media (max-width: 900px) {
    padding-top: 115px;
  }
  @media (max-width: 500px) {
    padding-top: 145px;
  }
`;

export const ButtonsDiv = styled.div`
  background-color: #231f20;
  min-height: fit-content;
  position: fixed;
  top: 0;
  padding: 5px;
  gap: 5px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  height: 25px;
  p {
    margin-right: 10px;
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr) !important;
    > p {
      font-size: 12px;
    }
  }
`;

export const DownloadButton = styled.button`
  width: auto;
  padding: 10px;
  text-align: center;
  grid-column: span 2;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(134, 205, 130);
  color: white;
  p {
    margin-right: 10px;
  }
  @media (max-width: 900px) {
    svg {
      font-size: 24px;
    }
    > p {
      font-size: 12px;
    }
  }
  @media (max-width: 500px) {
    grid-column: span 4;
  }
`;
export const MainPageContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  min-height: 85vh;
  gap: 5px;
`;
export const SidePage = styled.aside`
  width: 100%;
  display: flex;

  > div {
    border: 1px solid #ff9f1c;
    margin-bottom: 3px;
    position: relative;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > svg {
      position: absolute;
      right: 5px;
      top: calc(5px);
      font-size: 22px;
      :hover {
        color: red;
        cursor: pointer;
      }
    }
  }
  .card:hover {
    cursor: pointer;
    background-color: #ff9f1c;
  }
`;
export const InputsContainer = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ff9f1c;
  color: white;
  select option {
    background-color: black !important;
  }
  p {
    margin-right: 10px;
  }
  @media (max-width: 900px) {
    svg {
      font-size: 24px;
    }
    > p {
      font-size: 12px;
    }
  }
  @media (max-width: 500px) {
    grid-column: span 4;
  }
`;
export const CopyText = styled.button`
  width: auto;
  padding: 10px;
  text-align: center;
  grid-column: span 2;
  background-color: rgb(134, 205, 130);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    grid-column: span 1;
    > p {
      display: none;
    }
    svg {
      font-size: 24px;
    }
  }
`;

export const InputFileReceiver = styled.label`
  width: auto;
  border: 2px solid #666b6a;
  text-align: center;
  align-items: center;
  justify-content: center;
  grid-column: span 2;
  display: flex;
  > input {
    display: none;
  }
  @media (max-width: 900px) {
    grid-column: span 2;
    svg {
      font-size: 24px;
    }
    > p {
      font-size: 12px;
    }
  }
  @media (max-width: 900px) {
    grid-column: span 2;
  }
`;
export const Container = styled.div`
  display: grid;
  @media (max-width: 2000px) {
    grid-template-columns: repeat(4, 1fr) !important;
  }
  @media (max-width: 1420px) {
    grid-template-columns: repeat(3, 1fr) !important;
  }
  @media (max-width: 1040px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr) !important;
  }

  gap: 5px;
`;

export const RelatoryContainer = styled.div`
  display: grid;
  grid-column: span 8;
  grid-template-columns: repeat(10, 1fr);
  height: fit-content;
  > div {
    border: 1px solid #ff9f1c;
  }
  @media (max-width: 2000px) {
    grid-template-columns: repeat(7, 1fr) !important;
  }
  @media (max-width: 1420px) {
    grid-template-columns: repeat(6, 1fr) !important;
  }
  @media (max-width: 1040px) {
    grid-template-columns: repeat(5, 1fr) !important;
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  gap: 5px;
`;
export const TurmaDiv = styled.div`
  padding: 15px;
  > h1 {
    font-size: 20px;
    text-align: center;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid gray;
  max-height: 100%;
  gap: 3px;
`;
export const AlunoDiv = styled.label`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  border: 2px solid #ff9f1c;
  max-height: 46px;
  padding: 3px;
  > input {
    max-width: 25px;
    min-width: 25px;
    margin-left: auto;
    margin-right: 3px;
  }
  > div {
    display: flex;
    align-items: center;
    max-height: 40px;
    min-height: 40px;
  }
  :nth-child(2) {
    grid-column: span 8;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
    max-width: 100%;
  }
`;
export const Footer = styled.div`
  position: fixed;

  bottom: 0;
  height: 10rem;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  .cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 500px) {
      font-size: 12px;
    }
  }
  .list {
    grid-column: span 5;
    position: relative;
    max-width: 100vw;
    overflow: auto;
    display: flex;
  }
`;
export const NavContainer = styled.div`
  width: 100%;
  grid-column: span 10;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
  > button {
    grid-column: span 1;
    border: 2px solid #ff9f1c;
  }
  > div {
    grid-column: span 8;
    display: flex;
    flex-direction: row-reverse;
    gap: 5px;
    > a {
      grid-column: span 1;
      border: 2px solid #ff9f1c;
      height: 100%;
      padding: 0 5px;
    }
    a:hover {
      background-color: #ff9f1c;
    }
  }
  @media (max-width: 1980px) {
    grid-template-columns: repeat(8, 1fr) !important;
    grid-column: span 8;
    > div {
      grid-column: span 8;
    }
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-column: span 4;
    > div {
      grid-column: span 2;
    }
  }
`;
