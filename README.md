# PDF-Processor

A full-stack application for processing and analyzing PDF documents, built with React and Node.js.

## Project Overview

PDF-Processor is a web application that allows users to upload, process, and analyze PDF documents. The application features a modern React frontend and a robust Node.js backend with PDF processing capabilities.

## Tech Stack

### Frontend (Client)
- React 19
- React Router DOM
- React Bootstrap
- Axios for API calls
- Bootstrap 5 for styling

### Backend (Server)
- Node.js with Express
- SQLite3 with Knex.js for database management
- PDF processing libraries:
  - pdf-lib
  - pdf-parse
  - pdfjs-dist
- Tesseract.js for OCR capabilities
- Cohere AI for advanced text processing
- Multer for file uploads

## Project Structure

```
PDF-Processor/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/              # Source code
│   └── package.json      # Frontend dependencies
│
└── Server/               # Node.js backend
    ├── controllers/      # Route controllers
    ├── services/        # Business logic
    ├── uploads/         # Temporary file storage
    ├── server.js        # Main server file
    ├── routes.js        # API routes
    ├── db.js           # Database configuration
    └── package.json    # Backend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SumanshuBorkar/AI-Recipt-Processor.git
cd PDF-Processor
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../Server
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd Server
npm start
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Features

- PDF document upload and processing
- Text extraction from PDFs
- OCR capabilities for scanned documents
- Advanced text analysis using Cohere AI
- Secure file handling
- Modern and responsive UI

## API Endpoints

The backend provides various endpoints for PDF processing and analysis. Detailed API documentation can be found in the server's routes.js file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Sumanshu Borkar
