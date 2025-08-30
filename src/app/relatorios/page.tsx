"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FaFileArrowUp, FaFileArrowDown } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
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
  const [responseFiles, setResponseFiles] = useState<any>();
  const [filteredResponses, setFilteredResponses] = useState<Array<any>>([]);
  const [sumariCount, setSumaryCount] = useState<data>({
    total: 0,
    enviado: 0,
    invalido: 0,
    fracassado: 0,
    respondido: 0,
  });
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const dateTimeFormat1 = new Intl.DateTimeFormat("pt-br", options);
  useEffect(() => {
    if (sumariSheetFiles != undefined) {
      ReadSumaries();
    }
    if (updateSheet) {
      MakeSumari();
    }
  }, [sumariSheetFiles]);

  useEffect(() => {
    if (schollData.length) {
      let enviado = 0;
      let invalido = 0;
      let fracassado = 0;
      let respondido = 0;

      for (let i = 0; i < schollData.length; i++) {
        enviado += schollData[i].alunos.filter(
          (x: any) => x.Status == "Enviado"
        ).length;
        invalido += schollData[i].alunos.filter(
          (x: any) => x.Status == "Número Whatsapp inválido"
        ).length;
        fracassado += schollData[i].alunos.filter(
          (x: any) => x.Status == ""
        ).length;
        console.log(
          schollData[i]?.justificativas,
          schollData[i]?.justificativas?.length + respondido
        );
        respondido += schollData[i]?.justificativas
          ? schollData[i]?.justificativas?.length
          : 0;
      }
      setSumaryCount({
        total: invalido + enviado + fracassado,
        invalido: invalido,
        enviado: enviado,
        fracassado: fracassado,
        respondido: respondido,
      });
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
      const newCell = {
        ...cell,
        Mensagem: currentTurma.includes("TEC")
          ? cell.Mensagem.split(" ").slice(11, 13).join(" ")
          : cell.Mensagem.split(" ").slice(10, 12).join(" "),
      };
      if (!controlTurma.find((x: any) => x.turma == currentTurma))
        controlTurma.push({ turma: currentTurma, alunos: [newCell] });
      else {
        const currentAluno = controlTurma.findIndex(
          (x) => x.turma == currentTurma
        );
        controlTurma[currentAluno] = {
          turma: currentTurma,
          alunos: [...controlTurma[currentAluno].alunos, newCell],
          justificativas: [],
        };
      }
      setSchollData(controlTurma);
      return cell;
    });
    localStorage.setItem("numeros-invalidos", JSON.stringify(control));
    setSumariSheetFiles("");
    setSumariData(data);
  };

  const ReadResponses = async () => {
    const rawText = await responseFiles.text();
    const data = schollData;
    for (let i = 0; i < schollData.length; i++) {
      const filtered = rawText
        .split("\n")
        .filter((x: any) => x?.includes(schollData[i].turma));
      filtered.length
        ? (data[i] = { ...data[i], justificativas: filtered })
        : null;
    }
    setSchollData([...data]);
    setFilteredResponses([...filteredResponses, ...rawText.split("\n")]);
    setSumaryCount({
      ...sumariCount,
      respondido: sumariCount.respondido + rawText.split("\n").length,
    });
    setResponseFiles("");
  };
  useEffect(() => {
    if (responseFiles) ReadResponses();
  }, [responseFiles]);
  return (
    <>
      <MainDiv>
        <ButtonsDiv>
          <InputFileReceiver>
            <p>Relatório de envio</p>
            <FaFileArrowUp id="IconSelectFile"></FaFileArrowUp>
            <input
              type="file"
              id="input"
              multiple
              onChange={(input: any) => {
                setSumariData([]);
                setSumariSheet([]);
                setSchollData([]);
                setSumaryCount({
                  total: 0,
                  enviado: 0,
                  invalido: 0,
                  fracassado: 0,
                  respondido: 0,
                });
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
          <InputFileReceiver>
            <p>Respostas</p>
            <FaFileArrowUp id="IconSelectFile"></FaFileArrowUp>
            <input
              type="file"
              id="input"
              multiple
              onChange={(input: any) => {
                for (let i = 0; i < input.target.files.length; i++) {
                  setTimeout(() => {
                    setResponseFiles(input.target.files[i]);
                    if (i == input.target.files.length - 1) {
                      setTimeout(() => {
                        setResponseFiles(undefined);
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
              const savedData = localStorage.getItem("SavedSumaryData")
                ? JSON.parse(localStorage.getItem("SavedSumaryData")!)
                : [];
              const newData = [
                ...savedData,
                {
                  type: sumaryType,
                  date: sumaryDate,
                  data: schollData,
                },
              ];
              localStorage.setItem("SavedSumaryData", JSON.stringify(newData));
              setSavedData(newData);
            }}
          >
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
                    <div>Respondido: {cell?.justificativas?.length}</div>
                  </div>
                );
              })
            : null}
        </RelatoryContainer>
        <Footer>
          <div className="list">
            <SidePage>
              {savedData.map((data, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    onClick={() => {
                      setSchollData(data.data);
                    }}
                  >
                    <p>Tipo: {data.type}</p>
                    <p>{dateTimeFormat1.format(new Date(data.date))}</p>
                    <IoMdCloseCircle
                      onClick={() => {
                        const savedData = localStorage.getItem(
                          "SavedSumaryData"
                        )
                          ? JSON.parse(localStorage.getItem("SavedSumaryData")!)
                          : [];
                        const newData = savedData.filter(
                          (x: any, i: any) => i != index
                        );
                        localStorage.setItem(
                          "SavedSumaryData",
                          JSON.stringify(newData)
                        );
                        setSavedData(newData);
                      }}
                    />
                  </div>
                );
              })}
            </SidePage>
          </div>
          <div className="cell">
            <p>Total</p>
            <p>{sumariCount.total}</p>
          </div>
          <div className="cell">
            <p>Enviado</p>
            <p>{sumariCount.total}</p>
          </div>
          <div className="cell">
            <p>Fracassado</p>
            <p>{sumariCount.fracassado}</p>
          </div>
          <div className="cell">
            <p>Invalido</p>
            <p>{sumariCount.invalido}</p>
          </div>
          <div className="cell">
            <p>Respondido</p>
            <p>{sumariCount.respondido}</p>
          </div>
        </Footer>
      </MainDiv>
    </>
  );
}
