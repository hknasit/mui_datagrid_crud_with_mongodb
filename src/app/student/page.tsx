"use client";
import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
} from "@mui/x-data-grid";
import axios from "axios";

export default function Page() {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await axios.get("api/students");
    const newResponse = response.data.response.map((student: any) => {
      return { id: student._id, ...student };
    });
    //@ts-ignore
    setData([...response.data.response]);
  }
  useEffect(() => {
    getData();
  }, []);

  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];

  const rows2: GridRowsProp = data;

  const columns: GridColDef[] = [
    { field: "_id", headerName: "Id", width: 300, editable: true },
    { field: "name", headerName: "Name", width: 150 },
  ];

  function onRowEdit(params: any, event: any) {
    console.log(params, event);
  }

  return (
    <>
      <Grid >
        <Box width={"50%"}>
          <DataGrid
            getRowId={(row) => row._id}
            editMode="row"
            onRowEditStop={onRowEdit}
            rows={rows2}
            columns={columns}
          />
        </Box>
      </Grid>
    </>
  );
}
