# REST API Application

## Overview

This is a project practicing of creating RESTful API application.

In order to run the project:

1. Install [Yarn](https://yarnpkg.com/)
2. Clone project
3. Install dependencies:

   ```
   yarn install
   ```

4. Run server:

   ```
   yarn dev:server
   ```

## ER Diagram

![](.\ER.png)

## Routes and Authority Planning

| URL               | Purpose                 | Authority |
| ----------------- | ----------------------- | --------- |
| /                 | Root                    | Public    |
| /admin            | Admin Page              | Private   |
| /api              | View API Key / API Root | Private   |
| /api/person/list  | List persons (R)        | -         |
| /api/project/list | List projects (R)       | -         |
| /api/client/list  | List clients (R)        | -         |
| /api/report/list  | List Reports (R)        | -         |
| /api/person/:id   | Person detail (R/U)     | -         |
| /api/client/:id   | Client detail (R/U)     | -         |
| /api/project/:id  | Project detail (R/U)    | -         |
| /api/report/:id   | Report detail (R/U)     | -         |
| /api/person       | Person (C/D)            | -         |
| /api/client       | Client (C/D)            | -         |
| /api/project      | Project (C/D)           | -         |
| /api/report       | Report (C/D)            | -         |

## API Calls

| METHOD | ADDRESS           | BODY |
| ------ | ----------------- | ---- |
| GET    | /api/person/list  |      |
|        | /api/project/list |      |
|        | /api/client/list  |      |
|        | /api/report/list  |      |
|        |                   |      |
|        |                   |      |
|        |                   |      |
|        |                   |      |
|        |                   |      |
|        |                   |      |
|        |                   |      |

