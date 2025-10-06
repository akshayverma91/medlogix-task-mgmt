
# MedLogix Task Management API

## Overview

This API provides backend services for the MedLogix Task Management system. Built with ASP.NET Core, it offers authentication, task management, and user management capabilities through a RESTful interface.

## Technology Stack

- **Framework**: ASP.NET Core (.NET 9.0)
- **Database**: In-memory database (EntityFrameworkCore)
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: OpenAPI/Swagger

## Getting Started

### Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download) or newer
- Visual Studio 2022 or Visual Studio Code

### Running the API

1. Navigate to the API project directory:
   ```
   cd TaskManagement.Api
   ```

2. Run the application:
   ```
   dotnet run
   ```

3. Access the API at:
   - API endpoints: `http://localhost:5195/api/`
   - Swagger documentation: `http://localhost:5195/swagger` (in development mode)

## API Endpoints

### Authentication

| Method | Endpoint | Description | Request Body | Authorization |
|--------|----------|-------------|--------------|--------------|
| POST | `/api/auth/register` | Register a new user | `{ "userName": "string", "email": "string", "password": "string" }` | None |
| POST | `/api/auth/login` | Login and get JWT token | `{ "email": "string", "password": "string" }` | None |

### Tasks

| Method | Endpoint | Description | Request Body | Authorization |
|--------|----------|-------------|--------------|--------------|
| GET | `/api/tasks` | Get all tasks (with optional status/assignee filters) | None | JWT Bearer Token |
| POST | `/api/tasks` | Create a new task | Task object | JWT Bearer Token |
| PUT | `/api/tasks/{id}` | Update a task | Task object | JWT Bearer Token |
| DELETE | `/api/tasks/{id}` | Delete a task | None | JWT Bearer Token (Admin only) |

### Users

| Method | Endpoint | Description | Request Body | Authorization |
|--------|----------|-------------|--------------|--------------|
| GET | `/api/users` | Get all users | None | JWT Bearer Token |

## Data Models

### Task

```json
{
  "id": 0,
  "title": "string",
  "description": "string",
  "status": "Todo", // Todo, InProgress, Done
  "priority": "Low", // Low, Medium, High
  "createdAt": "2025-10-06T12:00:00Z",
  "dueDate": "2025-10-15T12:00:00Z",
  "creatorId": 1,
  "assigneeId": 2
}
```

### User

```json
{
  "id": 0,
  "userName": "string",
  "email": "string",
  "role": "string",
  "createdAt": "2025-10-06T12:00:00Z"
}
```

## Authentication

The API uses JWT Bearer tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer {your-jwt-token}
```

## Demo Accounts

The API comes with pre-configured demo accounts:

1. Admin Account
   - Email: admin@example.com
   - Password: Admin@123
   - Role: ADMIN

2. Regular User
   - Email: user@example.com
   - Password: User@123
   - Role: USER

## CORS Configuration

The API is configured to allow requests from:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (Alternative development port)

## Development Notes

- The API uses an in-memory database by default for simplicity
- JWT settings are configured in appsettings.json
- To modify CORS settings, update the `AddCors` configuration in Program.cs
- Password hashing uses BCrypt for secure storage