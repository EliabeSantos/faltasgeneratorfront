"use client";
import axios from "axios";
import * as XLSX from "xlsx";
import readXlsFile from "read-excel-file";
import { useEffect, useState } from "react";
import {
  AlunoDiv,
  ButtonsDiv,
  Container,
  CopyText,
  DownloadButton,
  InputFileReceiver,
  MainDiv,
  TurmaDiv,
} from "./style";
export default function Home() {
  const [FullList, setFullList] = useState<Array<any>>([]);
  const [SelectedStudents, setSelectedStudents] = useState<Array<any>>([]);
  const downloadCsv = async () => {
    const rows = SelectedStudents;

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function (rowArray) {
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "test");
    // document.body.appendChild(link); // Required for FF

    // link.click();
  };

  useEffect(() => {
    console.log(SelectedStudents);
  }, [SelectedStudents]);
  return (
    <MainDiv>
      <ButtonsDiv>
        <InputFileReceiver>
          <p>Selecione o arquivo</p>
          <input
            type="file"
            id="input"
            onChange={(input: any) => {
              const reader = new FileReader();
              reader.onload = (e: any) => {
                const data = new Uint8Array(e.target.result);
                // Process data with SheetJS
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                // ... further processing
                const sheetToJson: any = XLSX.utils.sheet_to_json(worksheet);
                console.log(sheetToJson);
                const arr: any = [];
                let y = -1;
                let skip = false;
                for (let i = 0; i < sheetToJson.length; i++) {
                  if (sheetToJson[i]["__EMPTY_2"]) {
                    if (
                      sheetToJson[i]["__EMPTY_2"]
                        .toLowerCase()
                        .includes("curso") &&
                      !sheetToJson[i]["__EMPTY_5"]
                        .toLowerCase()
                        .includes("sem seriação") &&
                      !sheetToJson[i]["__EMPTY_2"]
                        .toLowerCase()
                        .includes("pma-programa") &&
                      !sheetToJson[i]["__EMPTY_2"]
                        .toLowerCase()
                        .includes("aluno monitor") &&
                      !sheetToJson[i]["__EMPTY_2"]
                        .toLowerCase()
                        .includes("sala r.") &&
                      !sheetToJson[i]["__EMPTY_2"]
                        .toLowerCase()
                        .includes("medio if") &&
                      !sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("medio fgb ept") &&
                      !sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("profissional")
                    ) {
                      skip = false;
                      arr.push({
                        curso: sheetToJson[i]["__EMPTY_2"].includes("TEC")
                          ? sheetToJson[i]["__EMPTY_5"] +
                            " " +
                            sheetToJson[i]["__EMPTY_13"] +
                            "TEC"
                          : sheetToJson[i]["__EMPTY_5"] +
                            " " +
                            sheetToJson[i]["__EMPTY_13"],
                        alunos: [],
                      });
                      y++;
                    }
                    if (
                      sheetToJson[i]["__EMPTY_5"]
                        ?.toLowerCase()
                        .includes("sem seriação") ||
                      sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("pma-programa") ||
                      sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("aluno monitor") ||
                      sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("sala r.") ||
                      sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("medio if") ||
                      sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("medio fgb ept") ||
                      sheetToJson[i]["__EMPTY_2"]
                        ?.toLowerCase()
                        .includes("profissional")
                    ) {
                      console.log("test");
                      skip = true;
                    }
                  }
                  if (sheetToJson[i]["__EMPTY_12"]) {
                    if (
                      sheetToJson[i]["__EMPTY_12"]
                        .toLowerCase()
                        .includes("matriculado") &&
                      skip == false
                    ) {
                      arr[y]?.alunos.push(sheetToJson[i]);
                    }
                  }
                }
                setFullList(arr);
              };
              reader.readAsArrayBuffer(input.target.files[0]);
            }}
          />
        </InputFileReceiver>
        <DownloadButton
          disabled={SelectedStudents.length == 0}
          onClick={() => {
            downloadCsv();
          }}
        >
          Download CSV
        </DownloadButton>
        <CopyText
          onClick={() => {
            navigator.clipboard.writeText(`Prezados pais e/ou responsáveis,

Informamos que o(a) aluno(a) @value1 não compareceu às atividades escolares realizadas no dia de hoje (chamada realizada na primeira aula). Poderia confirmar se há alguma justificativa legal, como atestado médico? Caso já tenha entregue o atestado para a secretaria, pode desconsiderar esta mensagem. Para outros motivos, reforçamos que cada dia corresponde a 5 faltas.

Caso já tenha realizado a justificativa, por gentileza, desconsidere este aviso.

Aguardamos seu retorno.
Qualquer dúvida, estarei à disposição.

Para outros assuntos, entre em contato com a secretaria pelo número (41) 99501-3079.

Atenciosamente,
Equipe Pedagógica
Colégio Estadial Leocádia Braga Ramos 
`);
          }}
        >
          Copiar Texto
        </CopyText>
      </ButtonsDiv>

      <Container>
        {FullList
          ? FullList?.map((x, index) => {
              return (
                <TurmaDiv key={index}>
                  <h1>{x.curso}</h1>
                  {x.alunos.map((y: any, index: any) => {
                    return (
                      <AlunoDiv key={index}>
                        <div>
                          <p>{y["__EMPTY_2"]}</p>
                        </div>
                        <div>
                          <p>{y["__EMPTY_4"]}</p>
                        </div>
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            console.log(event.target.checked);
                            if (event.target.checked) {
                              const obj = [
                                y["__EMPTY_8"],
                                x.curso
                                  .replace("Seriação: ", "")
                                  .replace("Turma: ", "") +
                                  "" +
                                  y["__EMPTY_4"],
                              ];

                              setSelectedStudents([...SelectedStudents, obj]);
                            } else {
                              setSelectedStudents([
                                ...SelectedStudents.filter((x) => x != y),
                              ]);
                            }
                          }}
                        />
                      </AlunoDiv>
                    );
                  })}
                </TurmaDiv>
              );
            })
          : null}
      </Container>
    </MainDiv>
  );
}
