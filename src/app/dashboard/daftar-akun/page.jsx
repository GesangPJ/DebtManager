'use client'

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"

import TabelAkunAdmin from '@/views/tabel-akun/TabelAdmin'

import TabelAkun from "@/views/tabel-akun/TabelAkun"

const DaftarAkun = () => {
  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    if (status === 'loading') return

    if(!session){
      router.push('/error/401')
    }
  }, [session, status, router])

  if(!session){
    return null
  }

  return (
<div>
      <h1>Account Tables</h1>
      <br />
      <div>
        <TabelAkun/>
      </div>
      <br />
      <div>
        <TabelAkunAdmin/>
      </div>
      <br />
    </div>
  )
}

export default DaftarAkun
