# NexGen HR

An HR management system designed for simplicity, driving powerful results and peak performance.

## Architecture 🏗️

WIP

## Features ⚡

- Worker Management
- Company Management
- Time Management
- Job Portal
- Onboarding
- Reports

## Tech Stack 🛠️

| **Category** | **Technology**       |
| :----------- | :------------------- |
| **Web**      | Next.js              |
|              | TypeScript           |
|              | Tailwind CSS         |
|              | Material UI          |
| **Backend**  | Redis                |
|              | AWS RDS (PostgreSQL) |
| **Auth**     | AWS Cognito          |
| **IaC**      | Terraform            |
| **Infra**    | Kubernetes           |
|              | AWS EC2              |

## Prerequisites 📋

### Node.js

Make sure you have Node.js (v18 LTS) installed on your machine. If not, you can download it [here](https://nodejs.org/).

### PostgreSQL

Make sure you have PostgreSQL installed on your machine. If not, you can download it [here](https://www.postgresql.org/download/). When launching your PostgreSQL server locally, you can connect to the default port 5432 with the default user `postgres` and password `postgres`. Make sure to create a database named `nexgen_hr` and the tables by running the SQL script located in `/app/_config/sql/init.sql`.

### Redis

Make sure you have Redis installed on your machine. If not, you can download it [here](https://redis.io/download). The default port for Redis is 6379 on localhost. Redis is used for session management.

### AWS Cognito

Create an AWS Cognito User Pool and Identity Pool. You can follow the instructions [here](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools.html) and [here](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html).

### Environment Variables

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```env
COGNITO_USER_POOL_ID=
COGNITO_USER_POOL_CLIENT_ID=
COGNITO_IDENTITY_POOL_ID=

DATABASE_URL= defaults to `postgresql://postgres:postgres@localhost:5432/nexgen_hr`
REDIS_URL= defaults to `redis://localhost:6379`
```

## Getting Started 🚀

1. Clone this repository: `git clone https://github.com/arcade-l4b/nexgen-hr.git`
2. Navigate to the project directory: `cd nexgen-hr`
3. Install dependencies: `npm install`
4. Make sure you have PostgreSQL configured and running on your machine.
5. Make sure you have Redis running on your machine.
6. Start the development server: `npm run dev`
