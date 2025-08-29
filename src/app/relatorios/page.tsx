"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FaFileArrowUp, FaFileArrowDown } from "react-icons/fa6";
import {
  ButtonsDiv,
  DownloadButton,
  InputFileReceiver,
  MainDiv,
  RelatoryContainer,
  Footer,
  InputsContainer,
  MainPageContainer,
  SidePage,
} from "./style";
interface data {
  total: number;
  enviado: number;
  invalido: number;
  fracassado: number;
  respondido: number;
}
export default function Relatorios() {
  const [sumariSheet, setSumariSheet] = useState<Array<any>>([]);
  const [updateSheet, setUpdateSheet] = useState<number>(0);
  const [schollData, setSchollData] = useState<Array<any>>([]);
  const [savedData, setSavedData] = useState<Array<any>>([]);
  const [sumaryType, setSumaryType] = useState<string>("Manhã");
  const [sumaryDate, setSumaryDate] = useState<string>("");
  const [sumariData, setSumariData] = useState<any>({});
  const [sumariSheetFiles, setSumariSheetFiles] = useState<any>();
  const [sumariCount, setSumaryCount] = useState<data>({
    total: 0,
    enviado: 0,
    invalido: 0,
    fracassado: 0,
    respondido: 0,
  });
  useEffect(() => {
    if (sumariSheetFiles != undefined) {
      ReadSumaries();
    }
    if (updateSheet) {
      MakeSumari();
    }
    console.log(schollData);
  }, [sumariSheetFiles]);

  useEffect(() => {
    if (schollData.length) {
      let enviado = 0;
      let invalido = 0;
      let fracassado = 0;
      const respondido = 0;

      for (let i = 0; i < schollData.length; i++) {
        console.log(
          "DATA",
          schollData[i],
          schollData[i].alunos.filter((x: any) => x.Status == "Enviado").length
        );
        enviado += schollData[i].alunos.filter(
          (x: any) => x.Status == "Enviado"
        ).length;
        invalido += schollData[i].alunos.filter(
          (x: any) => x.Status == "Número Whatsapp inválido"
        ).length;
        fracassado += schollData[i].alunos.filter(
          (x: any) => x.Status == ""
        ).length;
      }
      setSumaryCount({
        total: invalido + enviado + fracassado + respondido,
        invalido: invalido,
        enviado: enviado,
        fracassado: fracassado,
        respondido: respondido,
      });
      console.log(enviado, invalido);
    }
  }, [schollData]);

  useEffect(() => {
    localStorage.getItem("SavedSumaryData")
      ? setSavedData(JSON.parse(localStorage.getItem("SavedSumaryData")!))
      : null;
  }, []);
  const ReadSumaries = async () => {
    if (!sumariSheetFiles) return;
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
    const controlTurma: Array<any> = [];
    let data = {
      Total: 0,
      Enviado: 0,
      Fracassado: 0,
      "Número inválido ": 0,
      Invalido: 0,
    };
    const newArr = sumariSheet.filter((cell) => {
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
    localStorage.setItem("numeros-invalidos", JSON.stringify(control));
    setSumariSheetFiles("");
    setSumariData(data);
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
                for (let i = 0; i < input.target.files.length; i++) {
                  setTimeout(() => {
                    setSumariSheetFiles(input.target.files[i]);
                    if (i == input.target.files.length - 1) {
                      setTimeout(() => {
                        setSumariSheetFiles(undefined);
                        setUpdateSheet(updateSheet + 1);
                      }, 50 * i + 1);
                    }
                  }, 50 * i + 1);
                }
              }}
            />
          </InputFileReceiver>
          <InputsContainer>
            <label>
              <input
                onChange={(event: any) => setSumaryDate(event.target.value)}
                type="date"
              ></input>
            </label>
            <label>
              <select
                onChange={(event: any) => setSumaryType(event.target.value)}
              >
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Dia">Dia</option>
                <option value="Semana">Semana</option>
              </select>
            </label>
          </InputsContainer>
          <DownloadButton
            onClick={() => {
              console.log({
                type: sumaryType,
                date: sumaryDate,
                data: schollData,
              });
              const savedData = localStorage.getItem("SavedSumaryData")
                ? JSON.parse(localStorage.getItem("SavedSumaryData")!)
                : [];
              localStorage.setItem(
                "SavedSumaryData",
                JSON.stringify([
                  ...savedData,
                  {
                    type: sumaryType,
                    date: sumaryDate,
                    data: schollData,
                  },
                ])
              );
            }}
          >
            <p>Gerar Relatorio</p>
            <FaFileArrowDown />
          </DownloadButton>
          {}
          <div>
            <button
              onClick={() => {
                setSchollData([]);
                setSumariSheetFiles(undefined);
                setSumariSheet([]);
              }}
            >
              Limpar
            </button>
          </div>
        </ButtonsDiv>
        <MainPageContainer>
          <SidePage>
            {savedData.map((data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSchollData(data.data);
                  }}
                >
                  <p>Type: {data.type}</p>
                  <p>Data: {data.date}</p>
                </div>
              );
            })}
          </SidePage>
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
        </MainPageContainer>
        <Footer>
          {}
          <div>Total {sumariCount.total}</div>
          <div>Enviado {sumariCount.enviado}</div>
          <div>Fracassado {sumariCount.fracassado}</div>
          <div>Invalido {sumariCount.invalido}</div>
          <div>Número inválido {sumariData["Número inválido "]}</div>
          <div>Respondido {sumariData["Número inválido "]}</div>
        </Footer>
      </MainDiv>
    </>
  );
}
