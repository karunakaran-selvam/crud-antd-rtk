# React RTK Query and Ant Design Project

This project is a React application that utilizes React Toolkit (RTK) Query for API data fetching and Ant Design for UI components. The application fetches data from the Fakestore API and demonstrates CRUD (Create, Read, Update, Delete) operations.

## Project Structure

- **src/**
  - **app/**
    - **components/**
      - `NotFound.js`: Component for 404 Not Found page
    - **pages/**
      - **Product/**
        - `ProductList.js`: Component displaying a list of products
        - `ProductForm.js`: Component for creating and updating products
  - **redux/**
    - **api/**
      - `productApi.js`: API service for products
    - `store.js`: Configure Store
  - **routes/**
    - `index.jss`: Routing
  - `App.js`: Home page
  - `index.css`: Global styles
  - `index.js`: Entry point for the application
  - `setupTests.js`: Configuration for Jest tests

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/karunakaran-selvam/crud-antd-rtk

2. **Install dependencies:**

   ```bash
    cd your-react-rtk-antd-project
    npm install
4. **Run the development server:**

   ```bash
    npm start

## Features

  Display a list of products from the Fakestore API.
  Perform CRUD operations on products.
  Use Ant Design components for a consistent and responsive UI.

## API Integration

  The application integrates with the [Fakestore API](https://fakestoreapi.com) to fetch product data.
