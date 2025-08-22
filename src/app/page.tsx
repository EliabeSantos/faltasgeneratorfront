"use client";
import axios from "axios";
import * as XLSX from "xlsx";
import readXlsFile from "read-excel-file";
import { useEffect, useState } from "react";
import { AlunoDiv, MainDiv, TurmaDiv } from "./style";
export default function Home() {
  const [FullList, setFullList] = useState<Array<any>>([]);
  const [SelectedStudents, setSelectedStudents] = useState<Array<any>>([]);
  const downloadCsv = async () => {
    const rows = SelectedStudents;

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  };

  useEffect(() => {
    console.log(SelectedStudents);
  }, [SelectedStudents]);
  return (
    <MainDiv>
      <button
        onClick={() => {
          downloadCsv();
        }}
      >
        Test
      </button>
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
            let arr: any = [];
            let y = -1;
            for (let i = 0; i < sheetToJson.length; i++) {
              if (sheetToJson[i]["__EMPTY_2"]) {
                if (
                  sheetToJson[i]["__EMPTY_2"].toLowerCase().includes("curso")
                ) {
                  arr.push({
                    curso:
                      sheetToJson[i]["__EMPTY_5"] +
                      " " +
                      sheetToJson[i]["__EMPTY_13"],
                    alunos: [],
                  });
                  y++;
                }
                console.log(sheetToJson[i]);
              }
              if (sheetToJson[i]["__EMPTY_12"]) {
                if (
                  sheetToJson[i]["__EMPTY_12"]
                    .toLowerCase()
                    .includes("matriculado")
                ) {
                  arr[y]?.alunos.push(sheetToJson[i]);
                }
              }
            }
            console.log(arr);
            setFullList(arr);
          };
          reader.readAsArrayBuffer(input.target.files[0]);
        }}
      />
      <div>
        {FullList
          ? FullList?.map((x, index) => {
              return (
                <TurmaDiv key={index}>
                  <h1>{x.curso}</h1>
                  {x.alunos.map((y: any) => {
                    return (
                      <AlunoDiv>
                        <div>{y["__EMPTY_2"]}</div>
                        <div>{y["__EMPTY_4"]}</div>
                        <div>{y["__EMPTY_12"]}</div>
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            console.log(event.target.checked);
                            if (event.target.checked) {
                              const obj = [
                                y["__EMPTY_8"],
                                x.curso.replace("Seriação: ", "") +
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
      </div>
    </MainDiv>
  );
}
