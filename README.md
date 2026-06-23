# SmartBudget AI — Machine Learning Expense Categorizer

SmartBudget AI is a full-stack web application that uses a custom Natural Language Processing (NLP) model to automatically analyze and categorize messy bank transaction descriptions. Users can either type a single manual entry or upload an entire monthly CSV statement to generate instantaneous visual data spending counts.

## Key Features
* **Machine Learning Classification Engine:** Built using Scikit-Learn (`LinearSVC` combined with `TfidfVectorizer`) to achieve high classification accuracy on raw, realistic transaction texts.
* **Asynchronous Multi-Part API Backend:** Developed with FastAPI to parse multi-part file uploads efficiently directly inside server RAM streams via `io.BytesIO`.
* **Component-Driven UI Dashboard:** Built using React, Tailwind CSS, and Axios featuring dynamic state synchronization and full Dark/Light mode support.

## Tech Stack
* **Frontend:** React, Tailwind CSS, Axios, Vite
* **Backend:** FastAPI, Pandas, Joblib, Uvicorn
* **AI/ML:** Scikit-Learn (NLP text classification pipelines)

# Local Setup Instructions

## 1. Backend Setup
# Activate virtual environment (Windows example)
.\venv\Scripts\activate

# Start the API server
uvicorn backend.main:app --reload

## 2. Frontend Setup

cd frontend
npm install
npm run dev