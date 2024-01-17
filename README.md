# SQL Project

This is a [CodeCrypto](https://codecrypto.academy/) project to allow us to run and interact with different databases using Docker containers.

## How to use this project
- Clone this repo
- Go to sql-course `cd sql-course`
- Install dependencies `npm i`

Then, the process is similar for each database setting. The steps are:
1) **Create a DB Docker container**
2) **Connect to DB**
3) **Populate DB**
4) **Test DB**

###  1. **Create DB container**
#### MYSQL
```
docker run --name mysql-course -p 3306:3306 -e MYSQL_ROOT_PASSWORD=ab12 -d mysql:8.0.28
```

#### Postgres
```
docker run --name pg-course -p 5432:5432 -e POSTGRES_PASSWORD=ab12 -d postgres:13
```

#### SQL Server
```
docker run --name sqlserver-course -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Abcd1234!" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04
```

#### Oracle
```
docker run -d --name oracle-course -e ORACLE_PWD=Abc123 -p 1521:1521 container-registry.oracle.com/database/express:21.3.0-xe
```

### 2. Connect to DB
Install [DBeaver](https://dbeaver.io/) or any DB manager and connect using below data.

#### MYSQL
```
user: root
password: ab12
host: localhost
port: 3306
database: northwind
```

#### Postgres
```
user: postgres
password: ab12
host: localhost
port: 5432
database: postgres
```

#### SQL Server
```
user: sa
password: Abcd1234!
host: localhost
port: 1433
database: northwind
```

#### Oracle
1) Log with admin data
```
user: SYS
password: Abc123
host: localhost
database: XE
```

2) Create a user and assign dba role running this script
```sql
CREATE USER C##DATOS IDENTIFIED BY DATOS;
GRANT DBA TO C##DATOS
```

3) Change log data for the new user created data
```
user: c##datos
password: datos
```

### 3. Populate DB

Open and copy any content of the above scripts for the DB you would like to test using [DB Visualizer](https://www.dbvis.com/download/) or similar.

- [MYSQL](https://www.aspsnippets.com/Handlers/DownloadFile.ashx?File=9cb579c6-86db-4596-84c3-d549428fdcf5.zip)
- [Postgres](https://raw.githubusercontent.com/pthom/northwind_psql/master/northwind.sql)
- [SQL Server](https://raw.githubusercontent.com/microsoft/sql-server-samples/master/samples/databases/northwind-pubs/instnwnd.sql)
- [Oracle](https://gist.githubusercontent.com/Jviejo/4f59dfe1d31d55c633b6c4a441bfb806/raw/800005c1ea4264f4e16b2a13cca7af28431f3879/northwind%2520oracle)


Paste and run the script in your manager for the desired DB.
![image](https://github.com/RodrigoVila/sql-docker/assets/42290738/5a341a2b-9e38-43c0-b5da-4f6e409b58a5)

### 4. Add credentials to .ENV file

Uncomment needed lines for the credentials you need. For example, to test a postgres DB, uncomment lines 9 to 13.

![image](https://github.com/RodrigoVila/sql-docker/assets/42290738/5317abbd-9963-436b-bdad-70b6a15dc454)


If you are usinng your own credentials, only update the values for the given keys

![image](https://github.com/RodrigoVila/sql-docker/assets/42290738/c209f09b-5e46-41a8-8cfd-e33d57f009ed)

### 5. Test DB

**MySQL** `npx nodemon dbmysql.js`

**Postgres** `npx nodemon dbpostgres.js`

**SQL Server** `npx nodemon dbsqlserver.js`

**Oracle** `npx nodemon dboracle.js`
