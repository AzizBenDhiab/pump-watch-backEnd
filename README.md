```markdown
# PumpWatch Backend

This is the backend for the PumpWatch project built with NestJS. It connects to a MySQL database and uses environment variables to configure the database connection and other settings.

## Requirements

- Node.js (LTS version)
- MySQL (installed locally or on a remote server)
- NestJS CLI (optional, but recommended)

## Setup

### 1. Clone the repository

Clone the `pumpwatch-backend` repository to your local machine:

```bash
git clone https://github.com/yourusername/pumpwatch-backend.git
cd pumpwatch-backend
```

### 2. Install dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 3. Create the MySQL database

Before running the backend, you need to create a MySQL database named `pump_watch`.

1. Log in to your MySQL server:

```bash
mysql -u root -p
```

2. Create the `pump_watch` database:

```sql
CREATE DATABASE pump_watch;
```

3. Exit MySQL:

```sql
EXIT;
```

### 4. Configure environment variables

Create a `.env` file in the root of the project and add the following database and secret configuration:

```env
DB_HOST="your_host"
DB_TYPE=mysql
DB_PORT=3306
DB_USERNAME="your_own_user"
DB_PASSWORD="your own password"
DB_NAME=pump_watch
SECRET=
```

- `DB_HOST`: The database host (usually `localhost` for local development).
- `DB_TYPE`: The type of database being used (MySQL in this case).
- `DB_PORT`: The port the MySQL database is running on (default `3306`).
- `DB_USERNAME`: The username to connect to the database.
- `DB_PASSWORD`: The password for the MySQL user.
- `DB_NAME`: The name of the database to use (`pump_watch`).
- `SECRET`: A secret key used for JWT or other cryptographic operations.

### 5. Run database migrations (optional)

If your project includes database migrations, you can run them using:

```bash
npm run migration:run
```

Make sure that your `ormconfig.json` or `TypeORM` setup is configured correctly.

### 6. Start the backend server

Now, you can start the backend server on your local machine:

```bash
npm start
```

The backend should now be running on `http://localhost:3000`.

### 7. Verify the database connection

Once the server is running, the backend will connect to the `pump_watch` database. You can check the logs to ensure the database connection was successful.

## API Documentation

To get more details about the available endpoints, refer to the [API Documentation](./docs/api.md).

## Troubleshooting

- If you encounter any issues with database connectivity, ensure that MySQL is running and the provided credentials in the `.env` file are correct.
- Check for any error messages in the terminal or log files for more details.
```

### Additional Notes:

- Ensure that you have MySQL installed and running on your machine or a remote host.
- The `.env` file should not be committed to the repository. Make sure to add it to `.gitignore` to avoid accidental commits.

Let me know if you need further adjustments!
