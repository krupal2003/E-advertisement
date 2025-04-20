import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



export const Analytic = () => {

  const columns=[
    {field:"hoardingDimension",headerName:"Dimention",width:90},
    {field:"hoardingType",headerName:"Type",width:150},
    {field:"Availablity_Status",headerName:"Status",width:150},
    {field:"hourlyRate",headerName:"Rate",width:150},
    {field:"hordingURL",headerName:"Image",width:150},
  ]

  const [hoardings, sethoardings] = useState([])

  const getData=async()=>{
    const res=await axios.get("/hordings/userscreens/"+localStorage.getItem("id"));
    sethoardings(res.data.data);
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
