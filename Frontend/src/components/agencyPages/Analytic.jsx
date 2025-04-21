import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'




export const Analytic = () => {

  const columns=[
    {field:"hoardingDimension",headerName:"Dimention",width:90},
    {field:"hoardingType",headerName:"Type",width:150},
    {field:"Availablity_Status",headerName:"Status",width:150},
    {field:"hourlyRate",headerName:"Rate",width:150},
    {field:"hordingURL",headerName:"Image",width:150},
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  const [hoardings, sethoardings] = useState([])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/hordings/deletehording/${id}`);
      // Remove the deleted item from state
      sethoardings(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  const getData=async()=>{
    const res=await axios.get("/hordings/userscreens/"+localStorage.getItem("id"));
    sethoardings(res.data.data);
    console.log(res.data.data);
  }

  useEffect(() => {
    getData();
  }, [])
  
  return (
    <div >
      <DataGrid sx={{ m: 2 }}
        columns={columns}
        rows={hoardings}
        getRowId={(row) => row._id}
      ></DataGrid>
    </div>
  )
}
