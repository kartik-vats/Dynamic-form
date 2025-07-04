# Codebase Architecture

This document provides a detailed overview of the architecture of this Next.js application.

## High-Level Overview

This is a full-stack web application built with the Next.js framework (version 15), utilizing the App Router. The application is written in TypeScript. The primary purpose of this application is to render a dynamic form and save the submitted data to a MongoDB database.

## Core Technologies

- **Framework**: [Next.js](https://nextjs.org/) 15 (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Frontend**:
    - [React](https://react.dev/) 19
    - [React JSON Schema Form (RJSF)](https://rjsf-team.github.io/react-jsonschema-form/) for dynamic form generation.
- **Backend**:
    - [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- **Database**:
    - [MongoDB](https://www.mongodb.com/)
    - [Mongoose](https://mongoosejs.com/) as the Object Data Modeling (ODM) library.

## Project Structure

The project follows the standard Next.js App Router directory structure.

```
.
├── app/                  # Main application folder for the App Router
│   ├── api/              # API routes
│   │   └── form/
│   │       └── route.ts  # API endpoint for form submission
│   ├── layout.tsx        # Root layout for the application
│   └── page.tsx          # The main page of the application
├── lib/                  # Library files and utilities
│   └── mongodb.ts        # MongoDB connection logic
├── models/               # Mongoose data models
│   └── FormData.ts       # Schema for the form data
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Detailed Component Breakdown

### Frontend (`app/page.tsx`)

- The main page of the application is located at `app/page.tsx`.
- It is a **Client Component** (`'use client'`), which means it is rendered on the client-side.
- It uses the **React JSON Schema Form (RJSF)** library to dynamically generate a form. The form's structure is defined by a JSON schema, which is likely located within this file (or imported into it).
- The page is responsible for handling user input and submitting the form data to the backend API.

### Backend (`app/api/form/route.ts`)

- The backend logic for handling form submissions is implemented as a Next.js API Route at `/api/form`.
- This route handler exports a `POST` function that:
    1.  Receives the form data in the request body.
    2.  Connects to the MongoDB database using the `connectToDatabase` utility.
    3.  Creates a new `FormData` document using the Mongoose model.
    4.  Saves the document to the database.
    5.  Returns a JSON response indicating success or failure.
- It also exports a `GET` function that returns an informational message, as this endpoint is only designed to handle `POST` requests.

### Database (`lib/mongodb.ts` and `models/FormData.ts`)

- **Connection**: The `lib/mongodb.ts` file manages the connection to the MongoDB database. It uses a caching mechanism to reuse existing database connections, which is a best practice for serverless environments like Vercel. The MongoDB connection string is read from the `MONGODB_URI` environment variable.
- **Data Model**: The `models/FormData.ts` file defines the Mongoose schema for the data collected from the form. The `FormDataSchema` is a complex, nested schema that represents the different sections of the form, including club/society information, events, members, and social media links.

## Data Flow

1.  A user visits the main page of the application.
2.  The `app/page.tsx` component renders a dynamic form using RJSF.
3.  The user fills out the form and clicks the submit button.
4.  The frontend sends a `POST` request with the form data to the `/api/form` endpoint.
5.  The API route handler in `app/api/form/route.ts` processes the request.
6.  The handler connects to the MongoDB database.
7.  The form data is validated against the `FormDataSchema` and saved to the database.
8.  The API route returns a success response to the frontend.

## Getting Started

To run this project locally, follow these steps:

1.  Install the dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env.local` file in the root of the project and add your MongoDB connection string:
    ```
    MONGODB_URI=your_mongodb_connection_string
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.
