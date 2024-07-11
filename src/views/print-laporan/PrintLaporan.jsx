'use client'

import React, { useState } from 'react'

import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, TableHead } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import ExcelJS from 'exceljs'

const PrintLaporan = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [kasbonData, setKasbonData] = useState([])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleSearch = async () => {
    if (selectedDate) {
      const bulanTahun = dayjs(selectedDate).format('YYYY-MM')

      try {
        const response = await fetch(`/api/laporan-kasbon?bulanTahun=${bulanTahun}`)

        if (response.ok) {
          const data = await response.json()

          setKasbonData(data)
        } else {
          console.error('Gagal mengambil data kasbon')
        }
      } catch (error) {
        console.error('Error fetching kasbon data:', error)
      }
    } else {
      console.error('Please select a date')
    }
  }

  const handlePDF = () => {
    const doc = new jsPDF()

    const columns = [
      { header: 'No', dataKey: 'no' },
      { header: 'User Name', dataKey: 'namaKaryawan' },
      { header: 'Amount', dataKey: 'jumlah' },
      { header: 'Method', dataKey: 'metode' },
      { header: 'Request Status', dataKey: 'status_r' },
      { header: 'Payment Status', dataKey: 'status_b' },
      { header: 'Information', dataKey: 'keterangan' },
      { header: 'Admin', dataKey: 'namaAdmin' }
    ]

    const rowsForPDF = kasbonData.map((row, index) => ({
      no: index + 1,
      namaKaryawan: row.namaKaryawan,
      jumlah: row.jumlah,
      metode: row.metode,
      status_r: row.status_r,
      status_b: row.status_b,
      keterangan: row.keterangan,
      namaAdmin: row.namaAdmin
    }))

    autoTable(doc, {
      head: [columns.map(col => col.header)],
      body: rowsForPDF.map(row => columns.map(col => row[col.dataKey])),
    })

    const bulan = dayjs(selectedDate).format('MM')

    doc.save(`Debt-Monthly-${bulan}.pdf`)
  }

  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Debt Data')

    worksheet.columns = [
      { header: 'No', key: 'no', width: 10 },
      { header: 'User Name', key: 'namaKaryawan', width: 30 },
      { header: 'Amount', key: 'jumlah', width: 20 },
      { header: 'Method', key: 'metode', width: 20 },
      { header: 'Request Status', key: 'status_r', width: 20 },
      { header: 'Payment Status', key: 'status_b', width: 20 },
      { header: 'Information', key: 'keterangan', width: 30 },
      { header: 'Admin', key: 'namaAdmin', width: 30 }
    ]

    kasbonData.forEach((row, index) => {
      worksheet.addRow({
        no: index + 1,
        namaKaryawan: row.namaKaryawan,
        jumlah: row.jumlah,
        metode: row.metode,
        status_r: row.status_r,
        status_b: row.status_b,
        keterangan: row.keterangan,
        namaAdmin: row.namaAdmin
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')

    const bulan = dayjs(selectedDate).format('MM')

    link.href = URL.createObjectURL(blob)
    link.download = `Debt-Monthly-${bulan}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleJSON = () => {
    const json = JSON.stringify(kasbonData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')

    const bulan = dayjs(selectedDate).format('MM')

    link.href = URL.createObjectURL(blob)
    link.download = `Debt-Monthly-${bulan}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div className='my-[15px]'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={'"Month" and "Year"'}
            views={['month', 'year']}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </div>
      <br />
      <div>
        <Button
          variant='outlined'
          color='primary'
          sx={{ borderRadius: 30 }}
          startIcon={<SearchIcon />}
          size='large'
          onClick={handleSearch}
        >
          Search Debt
        </Button>
      </div>
      <br />
      <div>
        <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <Button variant='outlined' color="error" size="large" startIcon={<PictureAsPdfIcon />} sx={{ borderRadius: 30 }} onClick={handlePDF}>
            PDF Export
          </Button>
          <Button variant='outlined' color="success" startIcon={<ListAltIcon />} sx={{ borderRadius: 30 }} onClick={handleExcelExport}>
            Export XLSX
          </Button>
          <Button variant='outlined' color="warning" size="large" sx={{ borderRadius: 30 }} startIcon={<DataObjectIcon />} onClick={handleJSON}>
            JSON
          </Button>
        </Box>
      </div>
      <div className='my-[25px]'>
        <TableContainer component={Paper}>
          <Table id="detail-table" sx={{ minWidth: 200 }} aria-label="Detail Kasbon">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Request Status</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Information</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kasbonData.length > 0 ? (
                kasbonData.map((kasbon, index) => (
                  <TableRow key={kasbon.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{kasbon.namaKaryawan}</TableCell>
                    <TableCell>{kasbon.jumlah}</TableCell>
                    <TableCell>{kasbon.metode}</TableCell>
                    <TableCell>{kasbon.status_r}</TableCell>
                    <TableCell>{kasbon.status_b}</TableCell>
                    <TableCell>{kasbon.keterangan}</TableCell>
                    <TableCell>{kasbon.namaAdmin}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default PrintLaporan
