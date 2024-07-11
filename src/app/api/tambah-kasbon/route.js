// Tambah Kasbon API. Lokasi : /src/app/api/tambah-kasbon/route.js

import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export const POST = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Tambah Kasbon')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  try {
    const { userId, jumlah, keterangan, metode } = await req.json()

    if (!userId || !jumlah || !keterangan || !metode) {
      return NextResponse.json({ error: "All input must be filled!." }, { status: 400 });
    }

    // Ambil tanggal dan waktu saat ini
    const now = new Date()
    const createdAt = now.toISOString() // menggunakan format ISO untuk datetime

    // Set status request dan bayar ke BELUM
    const status_r = "PENDING"
    const status_b = "NOT PAID"

    try {
      const kasbon = await prisma.kasbon.create({
        data: {
          userId,
          jumlah,
          status_r,
          status_b,
          keterangan,
          metode,
          createdAt,
          updatedAt: createdAt,
        },
      })

      console.log('Debt created:', kasbon)

      return NextResponse.json(kasbon, { status: 201 })
    } catch (error) {
      console.error('Error creating new debt:', error)

      return NextResponse.json({ error: "Debt existed" }, { status: 400 })
    }
  } catch (error) {
    console.error('Error creating new debt:', error)

    return NextResponse.json({ error: "Error creating new request." }, { status: 500 })
  }
}
