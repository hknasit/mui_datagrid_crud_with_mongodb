"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [student, setStudent] = useState("");
  const [data, setData] = useState([]);

  async function getData() {
    const response = await axios.get("/api/students");
    console.log(response.data);

    const newObjects = [...response.data.response];
    //@ts-ignore
    setData(newObjects!);
  }

  async function addData() {
    const name = student;
    const response = await axios.post("api/students", { name });

    console.log(response);
    //@ts-ignore
    setData((oldData) => {
      return [...oldData, response.data.savedStudent];
    });
  }

  async function updateData() {
    const updateStudent = {
      id: "6504bc565cef32506d901614",
      name: "HARSH K Nasit",
    };

    const response = await axios.put("/api/students", updateStudent);

    console.log(response);
  }

  async function deleteData() {
    const id = "6504bc565cef32506d901614";
    const response = await axios.delete(`api/students`, { params: { id } });
    console.log(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <div>
        <input
          type="text"
          value={student}
          onChange={(event) => setStudent(event.target.value)}
        ></input>
        <button style={{ margin: "10px" }} onClick={addData}>
          Add data
        </button>
        <br style={{ margin: "10px" }} />
        <button style={{ margin: "10px" }} onClick={updateData}>
          Update data
        </button>
        <button onClick={deleteData}>Delete data</button>

        {data.map((student) => {
          return (
            //@ts-ignore
            <div style={{ margin: "5px" }} key={student._id}>
              {
                //@ts-ignore
                student.name
              }
            </div>
          );
        })}
      </div>
    </main>
  );
}
