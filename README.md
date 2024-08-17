# Portfolio Management System

A comprehensive Portfolio Management System that allows users to manage their financial portfolios, track investments, and visualize their assets. This project is built using ReactJS for the frontend and Spring Boot for the backend, with MySQL as the database.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- **Portfolio Management**: Manage assets, trades, fund managers, and fund transactions.
- **Interactive Dashboard**: Visualize your portfolio through charts, including net worth, asset distribution, and cash flow.
- **CRUD Operations**: Easily create, read, update, and delete portfolio data.
- **Real-time Updates**: Reflect changes in fund balances based on trade activity.
- **Responsive UI**: A modern and responsive interface built with ReactJS.

## Architecture

The project follows a three-tier architecture:

1. **Frontend**: Built using ReactJS, it includes various components to display and manage portfolio data.
2. **Backend**: Implemented using Spring Boot, it provides RESTful APIs to interact with the database.
3. **Database**: MySQL is used to store portfolio data, including assets, trades, and fund managers.

## Technologies Used

- **Frontend**:
  - ReactJS
  - Axios (for API requests)
  - Chart.js (for data visualization)
  - Bootstrap (for styling)

- **Backend**:
  - Spring Boot
  - Hibernate (for ORM)
  - MySQL (as the database)
  - JPA (for data persistence)

- **Tools**:
  - Maven (for backend build and dependency management)
  - npm (for frontend package management)
  - Git (for version control)

## Getting Started

### Prerequisites

- **Node.js**: Required for running the ReactJS frontend.
- **Java JDK 17+**: Required for running the Spring Boot backend.
- **MySQL**: For database management.
- **Maven**: For managing backend dependencies and building the project.

### Backend Setup

1. **Clone the Backend Repository**:
   ```bash
   git clone https://github.com/AnkittSharmaa/portfolio-management-backend.git
   cd portfolio-management-backend
## Configure MySQL Database

1. Create a MySQL database named `portfoliomanger`.

2. Update the `application.properties` file located in `src/main/resources/` with your MySQL credentials:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/portfoliomanger
    spring.datasource.username=yourUsername
    spring.datasource.password=yourPassword
    spring.jpa.hibernate.ddl-auto=update
    ```

## Build and Run the Spring Boot Application

1. Build and run the Spring Boot application:

    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

   The backend will be available at `http://localhost:8080`.

## Frontend Setup

1. Clone the Frontend Repository:

    ```bash
    git clone https://github.com/AnkittSharmaa/portfolio-management-frontend.git
    cd portfolio-management-frontend
    ```

2. Install Dependencies:

    ```bash
    npm install
    ```

3. Start the React Application:

    ```bash
    npm start
    ```

   The frontend will be available at `http://localhost:3000`.

## Usage

After setting up both the backend and frontend, you can access the application at `http://localhost:3000`.

- **Dashboard**: View your portfolio's net worth, asset distribution, and cash flow charts.
- **Manage Assets**: Add, update, or delete assets in your portfolio.
- **Trade Book**: Record and track your trades.
- **Fund Manager**: View and manage fund managers and their associated balances.

## API Endpoints

### Assets

- `GET /api/assets`: Retrieve all assets.
- `POST /api/assets`: Create a new asset.
- `PUT /api/assets/{id}`: Update an existing asset.
- `DELETE /api/assets/{id}`: Delete an asset.

### Trade Book

- `GET /api/trades`: Retrieve all trades.
- `POST /api/trades`: Create a new trade.
- `PUT /api/trades/{id}`: Update an existing trade.
- `DELETE /api/trades/{id}`: Delete a trade.

### Fund Manager

- `GET /api/fund-managers`: Retrieve all fund managers.
- `POST /api/fund-managers`: Create a new fund manager.
- `PUT /api/fund-managers/{id}`: Update an existing fund manager.
- `DELETE /api/fund-managers/{id}`: Delete a fund manager.

### Fund Balance History

- `GET /api/fund-balance-history`: Retrieve the fund balance history.

## Backend Structure

- `src/main/java`: Contains the Java source code, including entities, repositories, services, and controllers.
- `src/main/resources`: Contains the application properties and other resource files.
- `pom.xml`: Maven configuration file.

## Frontend Structure

- `src/components`: Contains the React components used to build the UI.
- `src/services`: Contains the services used to interact with the backend APIs.
- `App.js`: The main React component that sets up the application's routing and layout.
- `index.js`: The entry point for the React application.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## Project Structure

```plaintext
portfolio-management/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   ├── pom.xml
│   └── mvnw
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md
