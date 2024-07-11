'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DataObjectIcon from '@mui/icons-material/DataObject'
import Typography from '@mui/material/Typography'
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import ExcelJS from 'exceljs'


const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength) + '...'
}

const getStatusChip = (status) => {
  switch (status) {
    case 'PENDING':
      return <Chip label="PENDING" color="warning" variant="outlined" icon= {<PauseCircleIcon/>} />
    case 'APPROVE':
      return <Chip label="APPROVE" color="success" variant="outlined" icon= {<CheckCircleOutlineIcon/>} />
    case 'REJECT':
      return <Chip label="REJECT" color="error" variant="outlined"  icon= {<HighlightOffIcon/>} />
    default:
      return <Chip label="UNKNOWN" color="default" variant="outlined" />
  }
}

const getBayarChip = (status) => {
  switch (status) {
    case 'NOT PAID':
      return <Chip label="NOT PAID" color="error" variant="outlined" icon= {<ErrorOutlineIcon/>} />
    case 'PAID':
      return <Chip label="PAID" color="success" variant="outlined" icon= {<CheckCircleOutlineIcon/>} />
    default:
      return <Chip label="UNKNOWN" color="default" variant="outlined" />
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Invalid Date'
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

const TabelAdmin = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const [totals, setTotals] = useState({
    jumlahTotal: 0,
    TotalSetuju: 0,
    TotalLunas: 0,
    belumLunas: 0
  })

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/dashboard-admin?userId=${session.user.id}`)
          const data = await response.json()

          // Tambahkan nomor urut
          const numberedData = data.kasbons.map((row, index) => ({ ...row, no: index + 1 }))

          setRows(numberedData)

          setTotals({
            jumlahTotal: data.jumlahTotal,
            TotalSetuju: data.TotalSetuju,
            TotalLunas: data.TotalLunas,
            belumLunas: data.belumLunas
          })

          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [session])

  const handleDetailClick = (row) => {
    if (row && row.id) {
      router.push(`/dashboard/detail/${row.id}`)
    } else {
      console.error('ID is not valid:', row)
    }
  }

  const columns = [
    { field: 'no', headerName: 'No', width: 50, headerClassName:'app-theme--header', },
    {
      field: 'updatedAt',
      headerName: 'Datetime',
      headerClassName:'app-theme--header',
      width: 150,
      renderCell: (params) => <div>{formatDate(params.value)}</div>,
    },{
      field: 'namaKaryawan',
      headerName: 'Name',
      headerClassName:'app-theme--header',
      width: 160,
    },
    {
      field: 'jumlah',
      headerName: 'Amount',
      headerClassName:'app-theme--header',
      width: 100,
      renderCell: (params) => <div>{formatCurrency(params.value)}</div>,
    },
    {
      field: 'status_r',
      headerName: 'Request Status',
      headerClassName:'app-theme--header',
      width: 160,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: 'status_b',
      headerName: 'Payment Status',
      headerClassName:'app-theme--header',
      width: 160,
      renderCell: (params) => getBayarChip(params.value),
    },
    { field: 'metode', headerName: 'Method', headerClassName:'app-theme--header', width: 100 },
    {
      field: 'keterangan',
      headerName: 'Information',
      headerClassName:'app-theme--header',
      width: 150,
      renderCell: (params) => <div>{truncateText(params.value, 40)}</div>,
    },
    {
      field: 'namaAdmin',
      headerName: 'Admin Name',
      headerClassName:'app-theme--header',
      width: 170,
    },
    {
      field: 'detail',
      disableExport: true,
      headerName: 'Detail',
      headerClassName:'app-theme--header',
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleDetailClick(params.row)}>
          Detail &raquo;
        </Button>
      ),
    },
  ]

  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Detail Kasbon')

    // Menambahkan header
    worksheet.columns = columns
      .filter(col => col.field !== 'detail') // Hapus kolom detail
      .map(col => ({
        header: col.headerName,
        key: col.field,
        width: col.width / 10 || 20, // Lebar kolom
      }))

    // Menambahkan baris data
    rows.forEach((row) => {
      const rowData = {}

      columns.forEach(col => {
        if (col.field !== 'detail') { // Hapus data kolom detail
          rowData[col.field] = row[col.field]
        }
      })
      worksheet.addRow(rowData)
    })

    // Menulis buffer
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = `DebtManager.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePDF = () => {
    const doc = new jsPDF()

    const columns = [
      { header: 'No', dataKey: 'no' },
      { header: 'Datetime', dataKey: 'updatedAt' },
      { header: 'Name', dataKey: 'namaKaryawan' },
      { header: 'Amount', dataKey: 'jumlah' },
      { header: 'Request Status', dataKey: 'status_r' },
      { header: 'Payment Status', dataKey: 'status_b' },
      { header: 'Method', dataKey: 'metode' },
      { header: 'Information', dataKey: 'keterangan' },
      { header: 'Admin Name', dataKey: 'namaAdmin' }
    ]

    const rowsForPDF = rows.map(row => ({
      no: row.no,
      updatedAt: formatDate(row.updatedAt),
      namaKaryawan: row.namaKaryawan,
      jumlah: formatCurrency(row.jumlah),
      status_r: row.status_r,
      status_b: row.status_b,
      metode: row.metode,
      keterangan: truncateText(row.keterangan, 40),
      namaAdmin: row.namaAdmin
    }))

    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rowsForPDF.map(row => columns.map(col => row[col.dataKey])),
    })

    doc.save('DebtManager.pdf')
  }

  const handleJSON = () => {
    const json = JSON.stringify(rows, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = 'DebtData.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div>
          <Box
          sx={{
            height: 400,
            width: '100%',
            '& .app-theme--header': {
              fontWeight: 'bold',
              fontSize: '1.1rem', // Adjust as needed
            },
          }}
        >
          <DataGrid
            rows={rows}
            slots={{ toolbar: GridToolbar, printOptions:{
              pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }',
              hideToolbar: true,
              hideFooter: true,
            } }}
            sx={{
              '@media print': {
                '.MuiDataGrid-main': {
                  color: 'rgba(0, 0, 0, 0.87)',
                  backgroundColor: 'white',
                  '-webkit-print-color-adjust': 'exact', // Ensure colors print correctly
                },
                '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
                  color: 'rgba(0, 0, 0, 0.87)',
                  '-webkit-print-color-adjust': 'exact',
                },
              },
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            columns={columns}
            pageSize={5}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            loading={loading}
            getRowId={(row) => row.id} // Tetap gunakan ID asli untuk identifikasi baris
          />
        </Box>
      </div>
      <br />
      <br />
      <div>
        <Box>
        <Typography variant='subtitle1'>
          Total Amount Of Debt Requested : {formatCurrency(totals.jumlahTotal)}
        </Typography><br />
        <Typography variant='subtitle1'>
          Total Amount Of Debt Approved : {formatCurrency(totals.TotalSetuju)}
        </Typography><br />
        <Typography variant='subtitle1'>
          Total Amount Of Debt Paid : {formatCurrency(totals.TotalLunas)}
        </Typography><br />
        <Typography variant='subtitle1'>
          Total Amount Of Debt Not Paid : {formatCurrency(totals.belumLunas)}
        </Typography>
        </Box>
      </div>
      <br />
      <div>
      <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        <Button variant='outlined' color="error" size="large" startIcon={<PictureAsPdfIcon/>} sx={ { borderRadius: 30 } } onClick={handlePDF}>
          PDF Export
        </Button>
        <Button variant='outlined' color="success" startIcon={<ListAltIcon/>} sx={ { borderRadius: 30 } } onClick={handleExcelExport}>
          Export XLSX
        </Button>
        <Button variant='outlined' color="warning" size="large" sx={ { borderRadius: 30 } } startIcon={<DataObjectIcon/>} onClick={handleJSON} >
          JSON
        </Button>
      </Box>

      </div>

    </div>

  )
}

export default TabelAdmin
