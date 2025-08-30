"use client";

import Link from "next/link";
import { Header, MainDiv, TutorialPasso } from "./style";
import Image from "next/image";

export default function Ajuda() {
  return (
    <MainDiv>
      <Header>
        <h1>Busca ativa paraná</h1>
        <Link href={"/"}>Voltar</Link>
      </Header>
      <TutorialPasso>
        <h2>Passo 1: Adicionar lista de alunos</h2>
        <Image alt="Passo 00" src={"/Passo00.png"} width={1000} height={1000} />
        <p>
          Ao clicar no botão Selecionar Flunos você poderá selecionar o arquivo
          de alunos disponibilizados no SERE.
        </p>
      </TutorialPasso>
      <TutorialPasso>
        <h2>Passo 2: Adicionar Faltas </h2>
        <Image alt="Passo 01" src={"/Passo01.png"} width={1000} height={1000} />
        <p>
          Ao clicar no botão Selecionar Faltas você poderá selecionar o arquivo
          de alunos faltantes no RCO. O programa irá automaticamente selecionar
          os alunos da planilha que tiveram falta na segunda aula, por este
          motivo é exencial que o usuário baixe a planilha do RCO pelo menos 20
          minutos após a segunda aula.
        </p>
      </TutorialPasso>
      <TutorialPasso>
        <h2>Passo 3: Gerar arquivo para mensagens</h2>
        <Image alt="Passo 02" src={"/Passo03.png"} width={1000} height={1000} />
        <p>
          Ao clicar no botao &quot;Download CSV&quot;, o programa inicia o
          download do arquivo com os números de contato que serão passados para
          programa de envio de mensagens.
        </p>
      </TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
    </MainDiv>
  );
}
