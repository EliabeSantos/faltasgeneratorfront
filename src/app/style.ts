import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const TurmaDiv = styled.div`
  display: grid;
  gap: 5px;
  width: 100%;
`;
export const AlunoDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
