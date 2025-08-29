"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FaFileArrowUp, FaFileArrowDown, FaCopy } from "react-icons/fa6";
import {
  ButtonsDiv,
  DownloadButton,
  InputFileReceiver,
  MainDiv,
  RelatoryContainer,
  Footer,
  RelatorioDataContainer,
} from "./style";
export default function Relatorios() {
  const [sumariSheet, setSumariSheet] = useState<Array<any>>([]);
  const [updateSheet, setUpdateSheet] = useState<number>(0);
  const [schollData, setSchollData] = useState<Array<any>>([]);
  const [sumariData, setSumariData] = useState<any>({});
  const [sumariSheetFiles, setSumariSheetFiles] = useState<any>();

  useEffect(() => {
    if (sumariSheetFiles != undefined) {
      ReadSumaries();
    }
    if (updateSheet) {
      MakeSumari();
    }
  }, [sumariSheetFiles]);

  const ReadSumaries = async () => {
    if (!sumariSheetFiles) return;
    console.log("READ SUMARIES");
    const reader = new FileReader();
    reader.readAsArrayBuffer(sumariSheetFiles);
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetToJson: any = XLSX.utils.sheet_to_json(worksheet);
      setSumariSheet([...sumariSheet, ...sheetToJson]);
    };
  };

  const MakeSumari = () => {
    const NumerosInvalidos = JSON.parse(
      localStorage.getItem("numeros-invalidos")!
    );
    let control: any = NumerosInvalidos ? [...NumerosInvalidos] : [];
    let controlTurma: Array<any> = [];
    let data = {
      Total: 0,
      Enviado: 0,
      Fracassado: 0,
      "Número inválido ": 0,
      Invalido: 0,
    };
    const newArr = sumariSheet.filter((cell, index) => {
      if (cell["Status"] == "Número Whatsapp inválido") {
        if (!NumerosInvalidos?.find((x: any) => x == cell["Enviar para "]))
          control = [...control, cell["Enviar para "]];
      }
      if (cell["Enviar para "] == "Relatório de Envio") return;
      if (cell["Enviar para "] == "Total") {
        data = { ...data, Total: data.Total + cell.Status };
        return;
      }
      if (cell["Enviar para "] == "Enviado") {
        data = { ...data, Enviado: data.Enviado + cell.Status };
        return;
      }
      if (cell["Enviar para "] == "Fracassado") {
        data = { ...data, Fracassado: data.Fracassado + cell.Status };
        return;
      }
      if (cell["Enviar para "] == "Número inválido ") {
        data = {
          ...data,
          "Número inválido ": data["Número inválido "] + cell.Status,
        };
        return;
      }
      if (cell["Enviar para "] == "Inválido") {
        data = {
          ...data,
          Invalido: data.Invalido + cell.Status,
        };
        return;
      }
      // if (!AlunosFaltantes.find((x: any) => x == cell["Enviar para "]))
      //   localStorage.setItem(
      //     "numeros invalidos",
      //     JSON.stringify(
      //       NumerosInvalidos
      //         ? [...NumerosInvalidos, cell["Enviar para "]]
      //         : [cell["Enviar para "]]
      //     )
      //   );
      const currentTurma =
        cell.Mensagem.split("").slice(63, 73)[7] == " "
          ? cell.Mensagem.split("").slice(63, 70).join("")
          : cell.Mensagem.split("").slice(63, 77).join("").includes("TEC")
          ? cell.Mensagem.split("").slice(63, 77).join("")
          : cell.Mensagem.split("").slice(63, 73).join("");
      if (!controlTurma.find((x: any) => x.turma == currentTurma))
        controlTurma.push({ turma: currentTurma, alunos: [cell] });
      else {
        const currentAluno = controlTurma.findIndex(
          (x) => x.turma == currentTurma
        );
        controlTurma[currentAluno] = {
          turma: currentTurma,
          alunos: [...controlTurma[currentAluno].alunos, cell],
        };
      }
      setSchollData(controlTurma);
      return cell;
    });
    console.log("CONTROL", control);
    localStorage.setItem("numeros-invalidos", JSON.stringify(control));
    setSumariSheetFiles("");
    setSumariData(data);
    console.log(controlTurma.sort());
    console.log(data, [...newArr]);
  };

  return (
    <>
      <MainDiv>
        <ButtonsDiv>
          <InputFileReceiver>
            <p>Selecione o arquivo</p>
            <FaFileArrowUp id="IconSelectFile"></FaFileArrowUp>
            <input
              type="file"
              id="input"
              multiple
              onChange={(input: any) => {
                console.log("input.target.files", input.target.files);
                for (let i = 0; i < input.target.files.length; i++) {
                  setTimeout(() => {
                    setSumariSheetFiles(input.target.files[i]);
                    if (i == input.target.files.length - 1) {
                      setTimeout(() => {
                        setSumariSheetFiles(undefined);
                        setUpdateSheet(updateSheet + 1);
                      }, 50 * i);
                    }
                  }, 50 * i);
                }
              }}
            />
          </InputFileReceiver>
          <RelatorioDataContainer>
            <label>
              <input type="date"></input>
            </label>
            <label>
              <select>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Dia</option>
                <option>Semana</option>
              </select>
            </label>
          </RelatorioDataContainer>
          <DownloadButton onClick={() => {}}>
            <p>Gerar Relatorio</p>
            <FaFileArrowDown />
          </DownloadButton>
        </ButtonsDiv>
        <RelatoryContainer>
          {schollData
            ? schollData?.map((cell, index) => {
                const invalido = cell.alunos.filter(
                  (x: any) => x.Status == "Número Whatsapp inválido"
                );
                const enviado = cell.alunos.filter(
                  (x: any) => x.Status == "Enviado"
                );
                return (
                  <div key={index}>
                    <div>{cell.turma}</div>
                    <div>Total: {cell.alunos.length}</div>
                    <div>Inválido: {invalido.length}</div>
                    <div>Enviado: {enviado.length}</div>
                  </div>
                );
              })
            : null}
        </RelatoryContainer>
        <Footer>
          <div>Total {sumariData.Total}</div>
          <div>Enviado {sumariData.Enviado}</div>
          <div>Fracassado {sumariData.Fracassado}</div>
          <div>Invalido {sumariData.Invalido}</div>
          <div>Número inválido {sumariData["Número inválido "]}</div>
          <div>Respondido {sumariData["Número inválido "]}</div>
        </Footer>
      </MainDiv>
    </>
  );
}
