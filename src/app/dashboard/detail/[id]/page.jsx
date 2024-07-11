'use client'

import { useEffect, useState, useRef } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import ExcelJS from 'exceljs'

const formatDate = (dateString) => {
  if (!dateString) return 'Invalid Date'
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }

  return new Intl.DateTimeFormat('id-ID', options).format(date)
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const DetailPage = () => {
  const params = useParams()
  const id = params.id
  const {data: session, status} = useSession()
  const router = useRouter()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/error/401')
    }

    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/detail-kasbon?id=${id}`)

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }

          const contentType = response.headers.get('content-type')

          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Received non-JSON response')
          }

          const result = await response.json()

          setData(result)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching detail data:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [id, session, status, router])

  if (!session) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!data) {
    return <div>Debt Not Found</div>
  }

  const rows = [
    { label: 'Debt ID', value: data.id },
    { label: 'User ID', value: data.userId },
    { label: 'Name', value: data.namaKaryawan },
    { label: 'Amount', value: formatCurrency(data.jumlah) },
    { label: 'Request Status', value: data.status_r },
    { label: 'Payment Status', value: data.status_b },
    { label: 'Payment Method', value: data.metode },
    { label: 'Information', value: data.keterangan },
    { label: 'Admin Name', value: data.namaAdmin },
    { label: 'Debt Request Date', value: formatDate(data.createdAt) },
    { label: 'Debt Modified Date', value: formatDate(data.updatedAt) },
  ]

  const handlePrint = () => {
    const doc = new jsPDF()

    autoTable(doc, { html: '#detail-table' })
    doc.save(`detail_debt-${data.id}.pdf`)
  }

  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Debt Detail')

    worksheet.columns = [
      { header: 'Label', key: 'label', width: 30 },
      { header: 'Value', key: 'value', width: 30 },
    ]

    rows.forEach((row) => {
      worksheet.addRow(row)
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = `DebtDetail-${data.id}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDocxExport = () => {
    // Implement your Docx export logic here
  }

  return (
    <div>
      <h1>Detail Kasbon : {data.namaKaryawan} | ID : {data.userId} </h1>
      <br />
      <TableContainer component={Paper}>
        <Table id="detail-table" sx={{ minWidth: 200 }} aria-label="Debt Detail">
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" className='text-xl'>
                  {row.label}
                </TableCell>
                <TableCell className='text-xl'>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Box sx={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
        <Button variant='contained' color="primary" sx={ { borderRadius: 30 } } href="/dashboard" size="large" >
          &laquo; Dashboard
        </Button>
        <Button variant='outlined' color="error" onClick={handlePrint} size="large" sx={ { borderRadius: 30 } } startIcon={<PictureAsPdfIcon/>}>
          PDF Export
        </Button>
        <Button variant='outlined' color="success" onClick={handleExcelExport} sx={ { borderRadius: 30 } } size="large" startIcon={<ListAltIcon/>}>
          Export XLSX
        </Button>
      </Box>
    </div>
  )
}

export default DetailPage
