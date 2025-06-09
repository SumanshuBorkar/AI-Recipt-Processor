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
4. Setup server .env file:
```bash
PORT=5001
UPLOAD_DIR=./uploads
COHERE_API_KEY=4ncMblhGXKhxoiC8F5O36C7i4Bcm3Ehl43vt2WSS
NODE_ENV=development
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

https://uml.planttext.com/plantuml/svg/jPHDJy9048Rl_HLpB8b4zCZ144MCyG3Xws9CCxHZNIbjipi5VxwxTFi5BNZnr6RcwJlppivsf1WbPxl8GPyJ2Ij5qabrIFWYnPXX8fEOAGuQmKVqjwUnCJ9kK54ZE7sQBqZkXK-EOwIX_r0g3c6LHWa6C1jFu5D4v1GPGzaIGvXD5qkupNBKDLpFiKd35MM7e71FS_99f3pHr17rTiJOSme8-dNb6Wp9vfjyheGRVTuFxk194ZBP3gniYwMb566eWtkCH80ialYIAqjHhleQT3WBgN9aeAjswZ9bVbqKC_DMB3EVCqdj5RFKaElIn8AHCsKRkCdTTVMnEduRjFTpCjS1JD_0hORbIL9Pn1T7cyh49wL475uQhQN-SxBLSW-1VbZg6xJKptn3KkIldbCXfn_ezxgJEjWeZGTWBTfLLrysLMozQTurSAzJRb4SUm1wu7Zr8hdM5mMUuQyCwEmMrLLtABTcWhFSD0Nd9zEw73BNjlLRzc8jw02MKkqhyVAiDw94kZR1kb3k5Pll7tzhMNcHKFemHZgf_x2_

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
