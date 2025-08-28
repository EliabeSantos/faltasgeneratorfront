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
} from "./style";
export default function Relatorios() {
  const [sumariSheet, setSumariSheet] = useState<Array<any>>([]);
  const [formatedSumariSheet, setFormatedSumariSheet] = useState<Array<any>>(
    []
  );
  const [sumariData, setSumariData] = useState<any>({});
  const [sumariSheetFiles, setSumariSheetFiles] = useState<any>();

  useEffect(() => {
    if (sumariSheetFiles) ReadSumaries();
  }, [sumariSheetFiles]);

  const ReadSumaries = async () => {
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
      localStorage.getItem("numeros invalidos")!
    );
    let control: any = [];
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
      return cell;
    });
    localStorage.setItem("numeros invalidos", JSON.stringify(control));
    setFormatedSumariSheet(newArr);
    setSumariData(data);
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
                  }, 100 * i);
                }
              }}
            />
          </InputFileReceiver>
          <DownloadButton
            onClick={() => {
              MakeSumari();
            }}
          >
            <p>Gerar Relatorio</p>
            <FaFileArrowDown />
          </DownloadButton>
        </ButtonsDiv>
        <RelatoryContainer>
          {formatedSumariSheet
            ? formatedSumariSheet?.map((cell, index) => {
                return (
                  <div key={index}>
                    <div>{cell["Enviar para "]}</div>
                    <div>{cell["Status"]}</div>
                    <div>{cell["Data e Hora"]}</div>
                  </div>
                );
              })
            : null}
        </RelatoryContainer>
        <div>
          <div>Total {sumariData.Total}</div>
          <div>Enviado {sumariData.Enviado}</div>
          <div>Fracassado {sumariData.Fracassado}</div>
          <div>Invalido {sumariData.Invalido}</div>
          <div>Número inválido {sumariData["Número inválido "]}</div>
        </div>
      </MainDiv>
    </>
  );
}
