# Credora: Stateless Credit Assessment API

![Credora](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-19.0+-61DAFB?logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)

**Credora** is a full-stack, stateless credit assessment application. It provides real-time credit scoring and risk analysis based on manual financial profile inputs or bulk CSV data uploads.

The platform is designed to give quick insights into an individual's or entity's financial stability, including risk levels, income stability, and fraud flags.

## 🌟 Features

- **Manual Profile Assessment**: Enter monthly income, expenses, savings, and utility payment consistency to get an instant credit score and risk analysis.
- **Bulk Data Processing**: Upload CSV files for batch processing of financial profiles.
- **Advanced Scoring Engine**: Evaluates income stability, savings behavior, payment discipline, and cash flow stability.
- **Fraud Detection**: Highlights potential risk flags and fraud risks based on unusual financial patterns.
- **Modern Dashboard**: A clean, responsive frontend built with React, Vite, and Tailwind CSS, featuring beautiful data visualizations with Recharts.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Data Visualization**: Recharts
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Data Processing**: Pandas, NumPy
- **Machine Learning / Analytics**: Scikit-learn
- **Server**: Uvicorn

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)

### 1. Backend Setup

Navigate to the backend directory and set up a virtual environment:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:
- **Windows**: `venv\Scripts\activate`
- **Mac/Linux**: `source venv/bin/activate`

Install the dependencies:
```bash
pip install -r requirements.txt
```

Run the backend server:
```bash
uvicorn main:app --reload
```
The FastAPI backend will be available at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install the dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The Vite development server will start, typically at `http://localhost:5173`.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/analyze-financial-profile` | Analyzes a single manual financial profile. |
| `POST` | `/analyze-csv` | Processes a CSV file for bulk credit assessment. |
| `GET`  | `/` | Health check endpoint. |

### Example Request (`/analyze-financial-profile`)

```json
{
  "monthly_income": 5000,
  "monthly_expenses": 2000,
  "average_savings": 1000,
  "utility_payment_consistency": 0.95,
  "employment_type": "salaried"
}
```

## 📁 Project Structure

```text
credora/
│
├── backend/                  # FastAPI Backend
│   ├── main.py               # API endpoints
│   ├── models.py             # Pydantic data models
│   ├── scoring.py            # Credit scoring logic
│   ├── data_processor.py     # CSV processing utilities
│   └── requirements.txt      # Python dependencies
│
└── frontend/                 # React + Vite Frontend
    ├── src/                  # React source code
    ├── public/               # Static assets
    ├── package.json          # Node dependencies
    ├── tailwind.config.js    # Tailwind configuration
    └── vite.config.ts        # Vite configuration
```
