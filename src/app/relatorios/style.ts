import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  background-color: #231f20;
  padding-top: 90px;
  min-height: 100vh;

  * {
    color: white;
  }

  position: relative;
  @media (max-width: 700px) {
    padding-top: 130px;
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
  grid-template-columns: repeat(10, 1fr);
  p {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr) !important;
    > p {
      display: none;
    }
  }
`;
export const FilterCellContainer = styled.div`
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-right: 5px;
`;
export const FilterCell = styled.label`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  > input {
    max-width: 40px;
    min-width: 40px;
    margin-right: 3px;
    height: 30px;
    margin-left: auto;
  }
  @media (max-width: 700px) {
    > input {
      max-width: 30px;
      min-width: 30px;
      margin-right: 3px;
      height: 20px;
      margin-left: auto;
    }
  }
  grid-column: span 1;
  border: 2px solid #ff9f1c;
`;
export const NameSearch = styled.label`
  font-size: 14px;
  grid-column: span 6;
  display: flex;
  border: 2px solid #ff9f1c;
  flex-direction: column;
  > input {
    width: 100%;
    margin-left: auto;
    margin-right: 3px;
  }
  @media (max-width: 700px) {
    grid-column: span 3;
  }
`;

export const DownloadButton = styled.button`
  width: auto;
  padding: 10px;
  text-align: center;
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(134, 205, 130);
  color: white;
  p {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    grid-column: span 1;
    svg {
      font-size: 24px;
    }
    > p {
      display: none;
    }
  }
`;
export const RelatorioDataContainer = styled.div`
  width: auto;
  padding: 10px;
  text-align: center;
  grid-column: span 6;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ff9f1c;
  color: white;
  p {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    grid-column: span 1;
    svg {
      font-size: 24px;
    }
    > p {
      display: none;
    }
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
  @media (max-width: 700px) {
    grid-column: span 1;
    svg {
      font-size: 24px;
    }
    > p {
      display: none;
    }
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
  height: 4rem;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  > div {
    display: flex;
    align-items: center;
  }
`;
