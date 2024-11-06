<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
</p>

# Used Car Pricing API

This is a NestJS project that includes user authentication, authorization, and reporting features. The project is built with TypeScript, TypeORM, and SQLite, and includes testing with Jest and documentation with Swagger.


## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MinaSamirSaad/used_car_pricing_API
    cd used_car_pricing_API
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:
    - Copy `.env.development` and `.env.test` files and configure them as needed.

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests


```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

### Users

* **GET /users**
  * Retrieves a list of all users.
* **GET /users/{id}**
  * Retrieves a specific user by ID.
* **PATCH /users/{id}**
  * Updates a specific user by ID.
* **DELETE /users/{id}**
  * Deletes a specific user by ID.

### Reports

* **GET /reports**
  * Retrieves a list of reports
* **GET /reports/estimate**
  * give you a price estimate based on the query you send and the reports in the system.
* **POST /reports**
  * Creates a new report.
* **GET /reports/{id}**
  * Retrieves a specific report by ID.
* **PATCH /reports/{id}**
  * Updates a specific report by ID.
* **DELETE /reports/{id}**
  * Deletes a specific report by ID.
* **PATCH /reports/{id}/approve**
  * Approves a specific report by ID.

### Authentication

* **POST /auth/signup**
  * Creates a new user account.
* **POST /auth/signin**
  * Signs in a user.
* **POST /auth/signout**
  * Signs out a user.

## Data Models

* **UserDto:** Represents a user.
* **UserReportsDto:** Represents a list of user reports.
* **UpdateUserDto:** Represents a user update request.
* **CreateReportDto:** Represents a report creation request.
* **ReportDto:** Represents a report.
* **UpdateReportDto:** Represents a report update request.
* **ApproveReportDto:** Represents a report approval request.
* **CreateUserDto:** Represents a user creation request.


## API Documentation

For full API documentation, please refer to the [Swagger Documentation](https://usedcarpricingapi-production.up.railway.app/api-docs).
