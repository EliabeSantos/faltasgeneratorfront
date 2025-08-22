import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  background-color: #231f20;
  padding-top: 50px;
  min-height: 100vh;

  * {
    color: white;
  }
  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  position: relative;
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
  grid-template-columns: repeat(4, 1fr);
`;

export const DownloadButton = styled.button`
  width: auto;
  padding: 10px;
  text-align: center;
  background-color: rgb(134, 205, 130);
  color: white;
`;

export const InputFileReceiver = styled.label`
  width: auto;
  border: 2px solid #666b6a;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  > input {
    display: none;
  }
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
    max-width: 30px;
    min-width: 30px;
    margin-left: auto;
    margin-right: 3px;
  }
  > div {
    max-height: 40px;
    min-height: 40px;
  }
  :nth-child(2) {
    grid-column: span 8;
    text-align: center;
    font-size: 14px;
  }
`;
