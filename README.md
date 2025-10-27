# Expense Tracker – Technical Assignment

## Installation

1. **Clone or download** the project to your local machine.
2. Open your terminal and navigate to the **root folder** of the project.
3. Install all dependencies by running:

   ```bash
   npm run install-all
   ```

## Environment Variables

The application uses environment variables for configuration. After cloning the repository:

1. Create a `.env` file in the **Backend file**:
   ```bash
   cp .env.example .env
   ```
2. Edit the created `.env` file
3. Add your own mongoDb uri and bravo api-key

## Running the Application

This project consists of two parts:

- **Backend**: Node.js + Express server (in the `Backend/` folder)
- **Frontend**: React application (in the `frontend/` folder)

To start both servers simultaneously in development mode, run:

```bash
npm run dev
```
