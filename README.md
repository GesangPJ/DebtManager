![Vercel](https://vercelbadge.vercel.app/api/GesangPJ/KasbonManajer?style=for-the-badge)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

# DEBT MANAGER

Debt / Loan Management Application further development from the previous version (Kasbon-JS),
using NextJS 14 Full Stack with PostgreSQL or SQLite Database (will be available on another branch).

https://github.com/GesangPJ/KasbonManajer/assets/26625652/bd2fe23c-ba7d-4281-9fc3-c162a7805261

## Website Features

1. App Router.
2. Next-Auth for Authentication.
3. Json Web Token (JWT) to secure sessions.
4. MUI DataGrid for better data presentation.
5. Multi-Role account, accounts are divided into 2 types: Admin and User (Employees).
6. Bcrypt for password hashing.
7. API Protection using JWT Token Validation.
8. Pages protection using session.
9. Admin Master Key authentication for admins to change account passwords and account data.

## Debt Features

1. Dashboard (Admin & Employee).
2. Add debt form (Employee).
3. Request Status Page.
4. Payment Status Page.
5. Export debts to PDF, Excel, JSON.
6. Retrieve Monthly debt Report.
7. Display the total debt value requested, approved, paid off, and unpaid.
8. Help Page containing explanations of each page and how to submit and display data.
9. Edit User Account Data.
10. Edit Admin Account Data.
11. Reset User Account Password.
12. Reset Admin Account Password.

# Container Deploy

Docker compose is available. Use according to image version (PostgreSQL / SQLite)
don’t forget about the existing environment variables.

## Container Image

Container Image is available in the repository package (ghcr.io)

- debt-manager-pg : is the version with PostgreSQL
- debt-manager-sqlite : is the version with SQLite

## SQLite Version

The SQLite version is available in the "SQLiteVersion" branch

SQLite database file is located at `/prisma/dev.db`

open schema.prisma to change the connection and schema.

Using this SQLite version does not require installing other databases like PostgreSQL or MySQL.

## Installation

### Install PostgreSQL Version

1. Clone this repository.
2. Open the repository folder on your local PC.
3. Change the file `.env.example` >> `.env`
4. Fill in the `NEXTAUTH_SECRET` value using `openssl rand -base64 32` to generate a secret key and copy it to `NEXTAUTH_SECRET`
5. Fill in the `NEXTAUTH_URL` value with `http://localhost:3000` if run on a local PC, or another domain if run on hosting/cloud.
6. Open schema.prisma, if you are using PostgreSQL locally then change the `url=` value to `env("DATABASE_URL")`
7. Then fill in DATABASE_URL with example value: `postgresql://<account name>:<password>@localhost:<port>/<database name>`
8. If using PostgreSQL from Vercel, then change the `url=` value to `env("POSTGRES_PRISMA_URL")` and add `directUrl = env("POSTGRES_URL_NON_POOLING")` below it.
9. Then fill in the `POSTGRES_PRISMA_URL` value in the `.env` file with the URL from PostgreSQL in Vercel, as well as the `POSTGRES_URL_NON_POOLING` value.
10. Fill in the `ADMIN_KEY` value with your own secret key (this is used so that the admin can change the name/email/password of other accounts.)
11. Once everything is filled in and correct, run `npm install`.
12. Then run `npx prisma migrate deploy`.
13. Then run `npx prisma generate`.
14. Once done, run npm run seedadmin to create an admin account.
15. Then run npm run seedkaryawan to create an user account.
16. The email and password of both accounts can be seen and changed in `/prisma/seedAdmin.js` and `/prisma/seedKaryawan.js`.
17. Then build the project by running `npm run build`.

### Install SQLite Version

1. Clone the SQLiteVersion branch repository.
2. Open the repository folder on your local PC.
3. Change the file `.env.example` >> `.env`.
4. Fill in the `NEXTAUTH_SECRET` value using openssl rand -base64 32 to generate a secret key and copy it to `NEXTAUTH_SECRET`.
5. Fill in the `NEXTAUTH_URL` value with `http://localhost:3000` if run on a local PC, or another domain if run on hosting/cloud.
6. Open schema.prisma and make sure that `provider = "sqlite"` and `url = "file:./dev.db"` which means Prisma uses SQLite as the database and the database file is located in `/prisma/dev.db`.
7. Fill in the `ADMIN_KEY` value with your own secret key (this is used so that the admin can change the name/email/password of other accounts.)
8. Once everything is filled in and correct, run `npm install`.
9. Then run `npx prisma migrate deploy`.
10. Then run `npx prisma generate`.
11. Once done, run `npm run seedadmin` to create an admin account.
12. Then run `npm run seedkaryawan` to create an user account.
13. The email and password of both accounts can be seen and changed in `/prisma/seedAdmin.js` and `/prisma/seedKaryawan.js`
14. Then build the project by running `npm run build`.

## Changelog

### v.1.3.1 Update Patch #5

- Edit Data Admin
- Edit Data Admin API
- Refactor some codes
- Remove Unnecessary files

### v.1.2.7 Update Patch #4

- Add Help page.
- Add API Documentation.
- Add About Page.
- Sidebar Update.
- Refactor some codes.

### v.1.1.8 Update Patch #3

- Add more page protection.
- Refactor some codes.
- Remove unused files.

### v.1.1.7 Update Patch #2

- Add Reset Password for Karyawan.
- Add Reset Password for Admin.
- Add master Key validation for Admin password reset.

### v.1.0.10 Update Patch #1

- Fix API Endpoint protection error.
- Refactor some codes.

### v.1.0.7PG-Release

- Rilis pertama.
- PostgreSQL Version.
- All Debt Version (Add, status change, get monthly report, export to pdf ; excel ; json).
