
import { Typography } from "@mui/material"
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

const HalamanBantuan = () =>{

  return(
    <div>
      <div className=" justify-center items-center ">
        <Box sx={{ width: '100%'}} >
          <Typography variant="h2" sx={{fontWeight:'bold'}}>
            Help Page
          </Typography>
          <Divider/>
          <br />
          <Typography variant="h3">
            A. Adding New Debt
          </Typography><br />
          <div className="ml-[22px] pl-[22px] text-xl">
            <ol type="number">
              <li>User Login.</li>
              <li>Sidebar &gt; Debt Menu &gt; Add New Debt Request.</li>
              <li>Input the debt request amount</li>
              <li>Input the debt request information.</li>
              <li>Choose the payment method : <code>&quot;TRANSFER&quot; or &quot;CASH&quot;</code></li>
              <li>Make sure all the data is correct, then click <code>SEND</code></li>
            </ol>
          </div>
          <br />
          <Typography variant="h3">
            B. Dashboard
          </Typography><br />
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Is a page that have debt data table, for user, debt data displayed is a data for each user, for admin, the debt data is data from all users.</p>
              <ol type="number">
                <li><code>datetime</code>: A date and time when the debt data last modified.</li>
                <li><code>name</code>: A name of the user who request the debt.</li>
                <li><code>amount</code>: Total amount of debt requested by user.</li>
                <li><code>request status</code>: A current status of debt requested by user : &quot;PENDING&quot; ; &quot;APPROVE&quot; ; &quot;REJECT&quot; </li>
                <li><code>payment status</code>: A current status of debt payment : &quot;NOT PAID&quot; ; &quot;PAID&quot;</li>
                <li><code>information</code>: A text by user to give information why user requested that amount of the debt.</li>
                <li><code>method</code>: A payment method choosed by the user to pay the debt : &quot;TRANSFER&quot; ; &quot;CASH&quot;</li>
                <li><code>admin</code>: A name of the admin who modified the latest status of the debt, could be request status or payment status.</li>
                <li><code>detail</code>: A button to display the detail of the debt.</li>
              </ol><br />
              <p>Didalam Dashboard terdapat beberapa tombol, berikut adalah daftar tombol beserta dengan fungsinya :</p>
            <ul>
              <li>Button <code>PDF Export :</code> Use for exporting the debt data into PDF Format.</li>
              <li>Button <code>Export XLSX :</code>Use for exporting the debt data into Excel Format.</li>
              <li>Button <code>JSON : </code> Use for exporting the debt data into JSON Format.</li>
            </ul>
          </div><br />
          <Typography variant="h3">
            C. Request Kasbon
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>A page use by admin to change the debt request status, default request status : &quot;PENDING&quot; . then admin will change which debt will be Approve or Reject using button &quot;APPROVE&quot; or &quot;REJECT&quot;</p>
          </div><br />
          <Typography variant="h3">
            D. Payment Confirmation
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Is a page use by admin to confirm payment by user :</p>
            <ol type="number">
              <li>Insert the user name in the name field.</li>
              <li>Press Button <code>Search Debt Data</code>.</li>
              <li>And then the debt data of the user searched will be displayed under the table below search bar</li>
              <li>If there are none debt data of the user that mean the user dont have any debt data that is APPROVED.</li>
              <li>If there is data displayed, admin can choose which debt have been paid by the user by clicking button <code>PAID</code></li>
              <li>Admin can also change payment status from PAID to NOT PAID using button <code>NOT PAID</code></li>
            </ol>
          </div><br />
          <Typography variant="h3">
            E. Debt Report
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Is a page to get debt data per month and admin can export it into some formats.</p>
            <ol type="number">
              <li>Click calendar icon to show the month chooser dialog / Type the month and year in format &quot;YEAR-MONTH&quot;.</li>
              <li>To choose other year, click down arrow to show other years.</li>
              <li>After choose the month and year, click button <code>SEARCH DEBT</code></li>
              <li>And then the debt data will be displayed on the table below the search bar, if there are no data displayed, there&apos;s probably no debt data in that month or year.</li>
              <li>Click Button <code>PDF Export</code> To download the debt data in format PDF.</li>
              <li>Click Button <code>Export XLSX</code> To download the debt data in format Excel.</li>
              <li>Click Button <code>JSON</code> To download the debt data in format JSON.</li>
            </ol>
          </div><br />
          <Typography variant="h3">
            F. Change User Account Data
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Below are the steps how to change user account data, the data that could be change are name and email :</p>
            <ol type="number">
              <li>At sidebar, click Account Management</li>
              <li>Click Account Table.</li>
              <li>At user account table, choose which account you want to change the data by click button <code>EDIT</code> at the same row.</li>
              <li>When there is a dialog box appear, change the name if you want to change the name by remove the old name and type new name.</li>
              <li>When there is a dialog box appear, change the email if you want to change the email by remove the old email and type new email.</li>
              <li>Insert Master Key in Master Key field from, the key is from <code>ENVIRONMENT</code>of the website.</li>
              <li>If you have change to the new data either name or email and you think that is correct, click button <code>SEND</code>.</li>
              <li>If you change your mind and do not want to change the data, click button <code>CANCEL</code>.</li>
            </ol>
          </div><br />
          <Typography variant="h3">
            G. Account Registration
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Below are the steps how to register new account, either for admin or user :</p>
            <ol type="number">
              <li>On the sidebar click Account Management.</li>
              <li>And then click Account Registration.</li>
              <li>Kemudian masukkan nama di kolom <code>Nama Akun</code>.</li>
              <li>Kemudian masukkan email di kolom <code>Email Akun</code>.</li>
              <li>Kemudian masukkan password akun di kolom <code>Password</code>.</li>
              <li>Kemudian pilih tipe akun, &quot;ADMIN&quot; atau &quot;KARYAWAN&quot;.</li>
              <li>Lihat kembali data yang anda masukkan, jika sudah benar maka klik tombol <code>DAFTAR</code></li>
            </ol>
          </div><br />
          <Typography variant="h3">
            H. Reset Password Akun Karyawan
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah bagaimana cara mengganti password akun karyawan :</p>
            <ol type="number">
              <li>Pada sidebar, klik Manajemen Akun.</li>
              <li>Kemudian klik Reset Password Akun.</li>
              <li>Masukkan email akun karyawan di kolom <code>Email Karyawan</code>.</li>
              <li>Masukkan Password yang baru di kolom <code>Password</code>.</li>
              <li>Masukkan kembali password yang baru di kolom <code>Konfirmasi Password</code>.</li>
              <li>Jika data sudah benar maka klik tombol <code>Reset Password</code>.</li>
            </ol>
          </div><br />
          <Typography variant="h3">
            I. Reset Password Akun Admin
          </Typography>
          <div className="ml-[22px] pl-[22px] text-xl">
            <p>Berikut dibawah ini adalah bagaimana cara mengganti password akun admin :</p>
            <ol type="number">
              <li>Pada sidebar, klik Manajemen Akun.</li>
              <li>Kemudian klik Reset Password Akun.</li>
              <li>Masukkan Email Akun Admin di kolom <code>Email Admin</code>.</li>
              <li>Masukkan Password admin yang baru di kolom <code>Password</code>.</li>
              <li>Masukkan kembali passsword yang baru di kolom <code>Konfirmasi Password</code>.</li>
              <li>Masukkan kode MasterKEY di kolom <code>Master Key</code>.</li>
              <li>Jika data sudah benar, maka klik tombol <code>Reset Password Admin</code>.</li>
            </ol>
          </div><br />
          <Divider />
          <br />
          <Typography variant="h3" sx={{fontWeight:'bold'}}>
            Daftar Error
          </Typography><br />
          <Divider /><br />
          <div className="ml-[22px] pl-[22px] text-xl">
          <p>Berikut dibawah ini adalah daftar error yang kemungkinan muncul beserta dengan penjelasan dan cara menanganinya :</p>
          <ul>
          <li><code className="text-red-600">MasterKEY Salah</code>: Master Key yang dimasukkan tidak sesuai dengan yang ada, cek kembali apakah master key yang dimasukkan sama dengan yang ada di <code>Environment Variable</code> website.</li>
          <li><code className="text-red-600">Data Tidak Boleh Kosong</code>: Terdapat kolom yang kosong disaat akan mengirim / menyimpan data, cek kembali kolom mana yang kosong.</li>
          <li><code className="text-red-600">Tidak Ada Data</code>: Data tidak ditemukan.</li>
          <li><code className="text-red-600">No Rows</code>: Data tidak ditemukan.</li>
          <li><code className="text-red-600">Gagal Menambahkan / Mengirim Data</code>: Terjadi kesalahan saat akan mengirim / menyimpan data, pastikan database terkoneksi dengan baik, jika anda menggunakan PostgreSQL pastika server PostgreSQL masih berjalan, atau pastikan anda masih terhubung ke internet.</li>

          </ul>

          </div>


        </Box>
      </div>
    </div>
  )
}

export default HalamanBantuan
