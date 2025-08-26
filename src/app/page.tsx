"use client";
import axios from "axios";
import * as XLSX from "xlsx";
import readXlsFile from "read-excel-file";
import { useEffect, useState } from "react";
import { FaFileArrowUp, FaFileArrowDown, FaCopy } from "react-icons/fa6";
import {
  AlunoDiv,
  ButtonsDiv,
  Container,
  CopyText,
  DownloadButton,
  FilterCell,
  FilterCellContainer,
  InputFileReceiver,
  MainDiv,
  NameSearch,
  TurmaDiv,
} from "./style";
export default function Home() {
  const [FullList, setFullList] = useState<Array<any>>([]);
  const [filter, setFilter] = useState<Array<any>>([]);
  const [selectedFilter, setSelectedFilter] = useState<Array<any>>([]);
  const [SelectedStudents, setSelectedStudents] = useState<Array<any>>([]);
  const [filterByName, setFilterByName] = useState<string>("");
  const downloadCsv = async () => {
    const rows = SelectedStudents;

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function (rowArray) {
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    let encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
    encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const today = new Date();
    link.setAttribute(
      "download",
      "Alunos Faltantes" + today.toLocaleDateString("pt-br")
    );
    document.body.appendChild(link); // Required for FF

    link.click();
  };
  /* eslint prefer-const: ["error", { ignoreReadBeforeAssign: true }] */
  const debounce = (func: any) => {
    console.log("DEBOUNCE");
    let timer: any;
    console.log("DEBOUNCE");
    clearTimeout(timer);
    timer = setTimeout(() => {
      setFilterByName(func);
    }, 500);
  };
  useEffect(() => {
    console.log(filterByName);
    setFullList([...FullList]);
  }, [selectedFilter, filterByName]);
  useEffect(() => {
    console.log(SelectedStudents);
  }, [SelectedStudents]);
  return (
    <MainDiv>
      <ButtonsDiv>
        <InputFileReceiver>
          <p>Selecione o arquivo</p>
          <FaFileArrowUp id="IconSelectFile"></FaFileArrowUp>
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
                const controlArr: any = [];
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
                      const curso: any = sheetToJson[i]["__EMPTY_2"].includes(
                        "TEC"
                      )
                        ? sheetToJson[i]["__EMPTY_5"] +
                          " " +
                          sheetToJson[i]["__EMPTY_13"] +
                          "TEC"
                        : sheetToJson[i]["__EMPTY_5"] +
                          " " +
                          sheetToJson[i]["__EMPTY_13"];
                      if (!controlArr.find((x: any) => curso.includes(x)))
                        controlArr.push(curso.split("").slice(10, 12).join(""));
                      arr.push({
                        curso: curso,
                        alunos: [],
                      });
                      console.log("TEST", controlArr);
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
                setFilter(controlArr);
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
          <p>Download CSV</p>
          <FaFileArrowDown />
        </DownloadButton>
        <CopyText
          onClick={() => {
            navigator.clipboard.writeText(
              `Prezados pais e/ou responsáveis,

Informamos que o(a) aluno(a) @value1 não compareceu às atividades escolares realizadas no dia de hoje (chamada realizada na primeira aula). Poderia confirmar se há alguma justificativa legal, como atestado médico? Caso já tenha entregue o atestado para a secretaria, pode desconsiderar esta mensagem. Para outros motivos, reforçamos que cada dia corresponde a 5 faltas.

Caso já tenha realizado a justificativa, por gentileza, desconsidere este aviso.

Aguardamos seu retorno.
Qualquer dúvida, estarei à disposição.

Para outros assuntos, entre em contato com a secretaria pelo número (41) 99501-3079.

Atenciosamente,
Equipe Pedagógica
Colégio Estadial Leocádia Braga Ramos 
`
            );
          }}
        >
          <p>Copiar Texto</p>
          <FaCopy />
        </CopyText>
        <FilterCellContainer>
          {filter
            ? filter.map((item, index) => {
                return (
                  <FilterCell key={index}>
                    {item}
                    <input
                      type="checkbox"
                      onChange={(event) => {
                        console.log("CLICK", event.target.checked);
                        if (event.target.checked)
                          setSelectedFilter([...selectedFilter, item]);
                        else
                          setSelectedFilter([
                            ...selectedFilter.filter((x) => x != item),
                          ]);
                      }}
                    ></input>
                  </FilterCell>
                );
              })
            : null}
        </FilterCellContainer>
        {filter != undefined && FullList.length > 0 && (
          <NameSearch>
            Nome Aluno
            <input onChange={(e) => debounce(e.target.value)}></input>
          </NameSearch>
        )}
      </ButtonsDiv>

      <Container>
        {FullList && selectedFilter != undefined && filterByName != undefined
          ? FullList?.map((x, index) => {
              if (
                selectedFilter.length &&
                !selectedFilter.find((y) => x?.curso?.includes(y))
              )
                return;
              return (
                <TurmaDiv key={index}>
                  <h1>{x.curso}</h1>
                  {x.alunos.map((y: any, index: any) => {
                    if (
                      filterByName.length &&
                      !y["__EMPTY_4"]
                        .toLowerCase()
                        .includes(filterByName.toLocaleLowerCase())
                    )
                      return;
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
                            const obj = [
                              y["__EMPTY_8"],
                              x.curso
                                .replace("Seriação: ", "")
                                .replace("Turma: ", "") +
                                "" +
                                y["__EMPTY_4"],
                            ];
                            if (
                              !SelectedStudents.find((z) =>
                                z[1]?.includes(y["__EMPTY_4"])
                              )
                            ) {
                              setSelectedStudents([...SelectedStudents, obj]);
                            } else {
                              setSelectedStudents([
                                ...SelectedStudents.filter((x) => {
                                  return x[1] != obj[1];
                                }),
                              ]);
                            }
                          }}
                          defaultChecked={false}
                          value={y["__EMPTY_4"]}
                          checked={SelectedStudents.find((z) =>
                            z[1]?.includes(y["__EMPTY_4"])
                          )}
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
