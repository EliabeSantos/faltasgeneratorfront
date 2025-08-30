"use client";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { FaFileArrowUp, FaFileArrowDown, FaCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { FaRegWindowClose } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { GoIssueClosed } from "react-icons/go";
import {
  AcceptButton,
  AlunoDiv,
  ButtonsDiv,
  Container,
  CopyText,
  CustumizedInput,
  DownloadButton,
  FilterCell,
  FilterCellContainer,
  InputFileReceiver,
  MainDiv,
  NameSearch,
  NavContainer,
  RemoveButton,
  TurmaDiv,
} from "./style";

export default function Home() {
  const [FullList, setFullList] = useState<Array<any>>([]);
  const [filter, setFilter] = useState<Array<any>>([]);
  const [selectedFilter, setSelectedFilter] = useState<Array<any>>([]);
  const [SelectedStudents, setSelectedStudents] = useState<Array<any>>([]);
  const [filterByName, setFilterByName] = useState<string>("");
  const [invalidNumber, setInvalidNumber] = useState<Array<any>>([]);
  const [dontSendMessage, setDontSendMessage] = useState<Array<any>>([]);
  const [atestado, setAtestado] = useState<string>("");
  const [selectPeriod, setSelectedPeriod] = useState<string>("");
  const [selectDate, setSelectedDate] = useState<string>("");
  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const dateTimeFormat1 = new Intl.DateTimeFormat("pt-br", options);
  const downloadCsv = async () => {
    const rows = SelectedStudents;

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function (rowArray) {
      for (let i = 0; i < dontSendMessage.length; i++) {
        console.log(dontSendMessage[i], dontSendMessage);
        if (
          dontSendMessage[i][0]?.replace(/[^A-Za-z0-9]/g, "") ==
          rowArray[0].replace(/[^A-Za-z0-9]/g, "")
        ) {
          const atestadoDate = new Date(dontSendMessage[i][2]);
          if (atestadoDate.getTime() - new Date().getTime() < 0) {
            const filtered = dontSendMessage.filter(
              (x) =>
                x[0].replace(/[^A-Za-z0-9]/g, "") !=
                rowArray[0].replace(/[^A-Za-z0-9]/g, "")
            );
            localStorage.setItem("atestados", JSON.stringify(filtered));
            setDontSendMessage(filtered);
          } else {
            return;
          }
        }
      }
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    let encodedUri = encodeURI(csvContent);
    encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const today = new Date();
    link.setAttribute(
      "download",
      "Alunos Faltantes" + dateTimeFormat1.format(today)
    );
    document.body.appendChild(link);
    link.click();
  };
  /* eslint prefer-const: ["error", { ignoreReadBeforeAssign: true }] */
  const debounce = (func: any) => {
    let timer: any;
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
    const NumerosInvalidos = JSON.parse(
      localStorage.getItem("numeros-invalidos")!
    );
    setInvalidNumber(NumerosInvalidos);
    console.log(NumerosInvalidos);
  }, [SelectedStudents]);
  useEffect(() => {
    if (
      !dontSendMessage.length &&
      JSON.parse(localStorage.getItem("atestados")!)?.length
    )
      setDontSendMessage(JSON.parse(localStorage.getItem("atestados")!));
  }, [dontSendMessage]);
  useEffect(() => {
    if (
      !selectPeriod.length &&
      JSON.parse(localStorage.getItem("SelectedPeriod")!)?.length
    )
      setSelectedPeriod(JSON.parse(localStorage.getItem("SelectedPeriod")!));
  }, [selectPeriod]);

  function SortArrayByNumber(a: any, b: any) {
    return a.turma.slice(0, 1).localeCompare(b.turma.slice(0, 1));
  }
  function SortArrayByLetter(a: any, b: any) {
    if (a.turma.includes("Série"))
      return a.turma.slice(8, 10).localeCompare(b.turma.slice(8, 10));
    else return a.turma.slice(5, 7).localeCompare(b.turma.slice(5, 7));
  }
  return (
    <MainDiv>
      <>
        <ButtonsDiv>
          <InputFileReceiver>
            <p>Arquivo de alunos</p>
            <FaFileArrowUp id="IconSelectFile"></FaFileArrowUp>
            <input
              type="file"
              id="input"
              onChange={(input: any) => {
                setSelectedStudents([]);
                setSelectedFilter([]);
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  const data = new Uint8Array(e.target.result);
                  const workbook = XLSX.read(data, { type: "array" });
                  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                  const sheetToJson: any = XLSX.utils.sheet_to_json(worksheet);
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
                            "TEC "
                          : sheetToJson[i]["__EMPTY_5"] +
                            " " +
                            sheetToJson[i]["__EMPTY_13"];
                        if (!controlArr.find((x: any) => curso.includes(x)))
                          controlArr.push(
                            curso.split("").slice(10, 12).join("")
                          );
                        arr.push({
                          curso: curso,
                          periodo: sheetToJson[i]["__EMPTY_10"].replace(
                            "Turno: ",
                            ""
                          ),
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
                        console.log();
                        const invalid = invalidNumber?.find(
                          (x: any) =>
                            x ==
                            sheetToJson[i]["__EMPTY_8"].replace(
                              /[^A-Za-z0-9]/g,
                              ""
                            )
                        );
                        const hasAtestado = dontSendMessage.find(
                          (x) => x[0] == sheetToJson[i]["__EMPTY_8"]
                        );
                        arr[y]?.alunos.push({
                          ...sheetToJson[i],
                          invalido: invalid ? true : false,
                          atestado: hasAtestado ? true : false,
                        });
                      }
                    }
                  }
                  localStorage.setItem(arr[0].periodo, JSON.stringify(arr));
                  localStorage.setItem(
                    "SelectedPeriod",
                    JSON.stringify(arr[0].periodo)
                  );
                  localStorage.setItem(
                    `filter-${arr[0].periodo}`,
                    JSON.stringify(controlArr)
                  );
                  setFullList(arr);
                  setFilter(controlArr);
                };
                reader.readAsArrayBuffer(input.target.files[0]);
              }}
            />
          </InputFileReceiver>

          <InputFileReceiver>
            <p>Arquivo de faltas</p>
            <FaFileArrowUp id="IconSelectFile"></FaFileArrowUp>
            <input
              type="file"
              id="input"
              onChange={(input: any) => {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  const data = new Uint8Array(e.target.result);
                  const workbook = XLSX.read(data, { type: "array" });
                  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                  const sheetToJson: any = XLSX.utils.sheet_to_json(worksheet);
                  console.log(sheetToJson);
                  const filteredList = sheetToJson
                    .filter(
                      (falta: any) =>
                        falta.numAula == 2 && falta.turma.includes(selectPeriod)
                    )
                    .filter(
                      (falta: any, index: any, prev: any) =>
                        prev[index - 1]?.cgm != falta?.cgm
                    )
                    .sort((a: any, b: any) => SortArrayByNumber(a, b));
                  const faltas: Array<any> = [];

                  for (let i = 0; i < filteredList.length; i++) {
                    const currentTurma = filteredList[i].turma.includes("Ano")
                      ? filteredList[i].turma.slice(0, 7)
                      : filteredList[i].turma.slice(0, 10);
                    if (!faltas.find((x) => x?.turma == currentTurma))
                      faltas.push({
                        turma: currentTurma,
                        alunos: [],
                      });
                    faltas[
                      faltas.findIndex((x) => x.turma == currentTurma)
                    ].alunos.push(filteredList[i]);
                  }
                  const controlArr: Array<any> = [];

                  for (let i = 0; i < FullList.length; i++) {
                    const currentTurma = FullList[i].curso?.turma?.includes(
                      "Ano"
                    )
                      ? FullList[i]?.curso
                          .slice(10, 21)
                          .replace("Turma: ", "")
                          .trim()
                      : FullList[i]?.curso
                          .slice(10, 27)
                          .replace("Turma: ", "")
                          .trim();

                    const currentTurmaStudents =
                      faltas[
                        faltas.findIndex(
                          (x) =>
                            x?.turma.toLocaleLowerCase("pt-br") ==
                            currentTurma?.toLocaleLowerCase("pt-br")
                        )
                      ];
                    for (let y = 0; y < FullList[i].alunos.length; y++) {
                      if (
                        currentTurmaStudents?.alunos?.find(
                          (x: any) =>
                            x.cgm == FullList[i].alunos[y]["__EMPTY_3"]
                        )
                      ) {
                        const obj = [
                          FullList[i].alunos[y]["__EMPTY_8"],
                          FullList[i].curso
                            .replace("Seriação: ", "")
                            .replace("Turma: ", "") +
                            "" +
                            FullList[i].alunos[y]["__EMPTY_4"],
                        ];
                        controlArr.push(obj);
                      }
                    }
                  }
                  console.log(controlArr, faltas);
                  setSelectedStudents(controlArr);
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
Colégio Estadual Leocádia Braga Ramos 
`
              );
            }}
          >
            <p>Copiar Texto</p>
            <FaCopy />
          </CopyText>
          {filter?.length ? (
            <FilterCellContainer>
              {filter.map((item, index) => {
                return (
                  <FilterCell key={index}>
                    {item}
                    <input
                      type="checkbox"
                      id={`${item}-${index}`}
                      checked={
                        selectedFilter.length
                          ? selectedFilter.find((x) => x == item)
                            ? true
                            : false
                          : false
                      }
                      onChange={(event) => {
                        console.log(
                          "CLICK",
                          event.target.checked,
                          item,
                          selectedFilter
                        );
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
              })}
            </FilterCellContainer>
          ) : null}
          {filter != undefined && FullList.length > 0 && (
            <NameSearch>
              <input
                placeholder="Nome do aluno"
                onChange={(e) => debounce(e.target.value)}
              ></input>
            </NameSearch>
          )}
          <NavContainer>
            <button
              onClick={() => {
                setSelectedFilter([]);
                const manha = JSON.parse(localStorage.getItem("Manhã")!);
                const manhaFilter = JSON.parse(
                  localStorage.getItem("filter-Manhã")!
                );
                setFullList(manha);
                setFilter(manhaFilter);
              }}
            >
              Manhã
            </button>
            <button
              onClick={() => {
                setSelectedFilter([]);
                const tardeFilter = JSON.parse(
                  localStorage.getItem("filter-Tarde")!
                );
                setFilter(tardeFilter);

                const tarde = JSON.parse(localStorage.getItem("Tarde")!);
                setFullList(tarde);
              }}
            >
              Tarde
            </button>
            <div>
              <Link href={"/relatorios"}>Relatorios</Link>

              <Link href={"/ajuda"}>Ajuda</Link>
            </div>
          </NavContainer>
        </ButtonsDiv>

        <Container>
          {FullList && selectedFilter != undefined && filterByName != undefined
            ? FullList?.map((Turma, index) => {
                if (
                  selectedFilter.length &&
                  !selectedFilter.find((y) => Turma?.curso?.includes(y))
                )
                  return;
                return (
                  <TurmaDiv key={index}>
                    <h1>{Turma.curso}</h1>
                    {Turma.alunos.map((Aluno: any, index2: any) => {
                      if (filterByName.length)
                        if (
                          !Aluno["__EMPTY_4"]
                            .toLowerCase()
                            .includes(filterByName.toLocaleLowerCase())
                        )
                          return;
                      const obj = [
                        Aluno["__EMPTY_8"],
                        Turma.curso
                          .replace("Seriação: ", "")
                          .replace("Turma: ", "") +
                          "" +
                          Aluno["__EMPTY_4"],
                      ];
                      return (
                        <AlunoDiv
                          valid={Aluno.invalido ? "true" : "false"}
                          atestado={Aluno.atestado ? "true" : "false"}
                          key={index2}
                        >
                          <div>
                            <p>{Aluno["__EMPTY_2"]}</p>
                          </div>
                          <div>
                            {atestado == Aluno["__EMPTY_4"] ? (
                              <div className="edit-input">
                                <input
                                  type="date"
                                  onChange={(e: any) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log(e.target.value);
                                    setSelectedDate(e.target.value);
                                  }}
                                ></input>
                              </div>
                            ) : (
                              <p>{Aluno["__EMPTY_4"]}</p>
                            )}
                          </div>
                          <div className="edit">
                            {atestado == Aluno["__EMPTY_4"] ? (
                              <>
                                <AcceptButton
                                  onClick={(e: any) => {
                                    e.preventDefault();
                                    if (!selectDate.length) return;
                                    const newList = FullList;

                                    if (
                                      !dontSendMessage.find((z) =>
                                        z[1]?.includes(Aluno["__EMPTY_4"])
                                      )
                                    ) {
                                      newList[index].alunos[
                                        newList[index].alunos.findIndex(
                                          (x: any) =>
                                            x["__EMPTY_4"] == Aluno["__EMPTY_4"]
                                        )
                                      ].atestado = true;
                                      const newAtestado = [
                                        ...dontSendMessage,
                                        [...obj, selectDate],
                                      ];
                                      localStorage.setItem(
                                        "atestados",
                                        JSON.stringify(newAtestado)
                                      );
                                      setDontSendMessage(newAtestado);
                                    }
                                    setFullList(newList);
                                    setSelectedDate("");
                                    setAtestado("");
                                  }}
                                >
                                  <GoIssueClosed />
                                </AcceptButton>
                              </>
                            ) : (
                              <div
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  if (!atestado.length)
                                    setAtestado(Aluno["__EMPTY_4"]);
                                }}
                              >
                                <FaEdit />
                              </div>
                            )}
                          </div>
                          {atestado == Aluno["__EMPTY_4"] ? (
                            <RemoveButton
                              onClick={(e: any) => {
                                e.preventDefault();
                                setAtestado("");
                                console.log(dontSendMessage);
                                const filteredDontSend = dontSendMessage.filter(
                                  (x) => !x[1]?.includes(Aluno["__EMPTY_4"])
                                );
                                console.log(
                                  filteredDontSend,
                                  Aluno["__EMPTY_4"],
                                  selectDate
                                );
                                if (
                                  dontSendMessage.find((z) =>
                                    z[1]?.includes(Aluno["__EMPTY_4"])
                                  ) &&
                                  selectDate == ""
                                ) {
                                  const newList = FullList;
                                  newList[index].alunos[
                                    newList[index].alunos.findIndex(
                                      (x: any) =>
                                        x["__EMPTY_4"] == Aluno["__EMPTY_4"]
                                    )
                                  ].atestado = false;
                                  console.log(
                                    "filteredDontSend",
                                    filteredDontSend
                                  );
                                  setDontSendMessage([filteredDontSend]);
                                  localStorage.setItem(
                                    "atestados",
                                    JSON.stringify(filteredDontSend)
                                  );
                                }
                              }}
                            >
                              <IoIosCloseCircleOutline />
                            </RemoveButton>
                          ) : (
                            <CustumizedInput
                              type="checkbox"
                              onChange={() => {
                                if (
                                  !SelectedStudents.find((z) =>
                                    z[1]?.includes(Aluno["__EMPTY_4"])
                                  )
                                ) {
                                  setSelectedStudents([
                                    ...SelectedStudents,
                                    obj,
                                  ]);
                                } else {
                                  setSelectedStudents([
                                    ...SelectedStudents.filter((x) => {
                                      return x[1] != obj[1];
                                    }),
                                  ]);
                                }
                              }}
                              value={Aluno["__EMPTY_4"]}
                              checked={
                                SelectedStudents.find((z) =>
                                  z[1]?.includes(Aluno["__EMPTY_4"])
                                )
                                  ? true
                                  : false
                              }
                            />
                          )}
                        </AlunoDiv>
                      );
                    })}
                  </TurmaDiv>
                );
              })
            : null}
        </Container>
      </>
    </MainDiv>
  );
}
