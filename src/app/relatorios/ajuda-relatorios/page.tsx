"use client";

import Link from "next/link";
import { Header, MainDiv, TutorialPasso } from "./style";
import Image from "next/image";

export default function RelatoriosAjuda() {
  return (
    <MainDiv>
      <Header>
        <h1>Busca ativa paraná</h1>
        <Link href={"/relatorios"}>Voltar</Link>
      </Header>
      <TutorialPasso>
        <h2>Passo 1: Adicionar relatório de envio</h2>
        <Image
          alt="Passo 00"
          src={"/RelatorioPasso00.png"}
          width={1000}
          height={1000}
        />
        <p>
          Ao clicar no botão &quot;Relatório de envio&quot; você poderá
          selecionar o relatório de envio gerado pelo app de mensagens, o
          usuário pode selecionar vários arquivos caso deseje criar um relatório
          com mais dados de uma única vez.
        </p>
      </TutorialPasso>
      <TutorialPasso>
        <h2>Passo 2: Adicionar Respostas </h2>
        <Image
          alt="Passo 01"
          src={"/RelatorioPasso01.png"}
          width={1000}
          height={1000}
        />
        <p>
          Ao clicar no botão &quot;Respostas&quot; você poderá selecionar o
          arquivo de respostas dos pais, este arquivo no momento não é gerado
          automáticamente e deve ser criado e mantido pelo usuário caso queira
          ter um bom controle sobre o resultado de suas campanhas.
        </p>
      </TutorialPasso>
      <TutorialPasso>
        <h2>Passo 3: Criar arquivos de respostas</h2>
        <Image
          alt="Passo 02"
          src={"/RelatorioPasso02.png"}
          width={1000}
          height={1000}
        />
        <p>
          O arquivo de respostas deve ser criado utilizando Plain Text, ou seja,
          texto limpo utilizando um bloco de notas. Cada linha deve conter
          respectivamente o número do pai que realizou a resposta, o nome e
          turma do aluno que faltou (Você pode pegar essa informação direto na
          mensagem que foi enviada para o pai), e por fim uma breve explicação
          que o pai forneceu.
        </p>
      </TutorialPasso>
      <TutorialPasso>
        <h2>Adicionar atestado: Passo 1</h2>
        <Image
          alt="Atestado passo 00"
          src={"/AtestadoPasso00.png"}
          width={1000}
          height={1000}
        />
        <p>
          Ao clicar no ícone de edição um input de data irá aparecer no lugar do
          nome do aluno.
        </p>
      </TutorialPasso>
      <TutorialPasso>
        <TutorialPasso>
          <h2>Adicionar atestado: Passo 2</h2>
          <Image
            alt="Atestado passo 01"
            src={"/AtestadoPasso01.png"}
            width={1000}
            height={1000}
          />
          <p>
            Com o input ativo o usuário pode tomar 2 ações. 1: Selecionar a data
            que o atestado do aluno termina 2: Clicar no ícone de X para fechar
            o input, quando este ícone for clicado o programa irá validar se
            este aluno possui atestado cadastrado, caso encontre irá remover o
            atestado atual.
          </p>
        </TutorialPasso>
      </TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
    </MainDiv>
  );
}
