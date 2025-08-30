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
      <TutorialPasso>
        <h2>Passo 4: Copiar mensagem</h2>
        <Image alt="Passo 02" src={"/Passo04.png"} width={1000} height={1000} />
        <p>
          Ao clicar no botao &quot;Copiar Texto&quot;, o programa irá
          automaticamente copiar a mensagem de aviso para os pais que você deve
          colocar no app de mensagens.
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
      <TutorialPasso>
        <TutorialPasso>
          <h2>Adicionar atestado: Passo 3</h2>
          <Image
            alt="Atestado passo 02"
            src={"/AtestadoPasso01.png"}
            width={1000}
            height={1000}
          />
          <p>
            Com a data selecionada o usuário pode selecionar Concluir ou
            Cancelar:
            <br /> Cancelar irá cancelar a adição desse atestado à lista e não
            irá remover o atestado atual do aluno caso ele já possua um.
            <br />
            Concluir irá adicionar o atestado à lista oque irá retirar o número
            do aluno selecionado da lista de envio de mensagens e irá marcar o
            aluno em AZUL na lista para fácil visualização.
          </p>
        </TutorialPasso>
      </TutorialPasso>
      <TutorialPasso>
        <TutorialPasso>
          <h2>Adicionar atestado: Passo 4</h2>
          <Image
            alt="Atestado passo 03"
            src={"/AtestadoPasso03.png"}
            width={1000}
            height={1000}
          />
          <p>
            Com o atestado adicionado a lista o aluno será listado em AZUL como
            exibido na imagem e seu nome não será passado para a lista de envio
            de mensagens.
          </p>
        </TutorialPasso>
      </TutorialPasso>
      <TutorialPasso></TutorialPasso>
      <TutorialPasso></TutorialPasso>
    </MainDiv>
  );
}
