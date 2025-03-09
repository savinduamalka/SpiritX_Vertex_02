# Spirit11 Front-end

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Express.js for the backend
- MongoDB for the database

### Front-End Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/spirit11-frontend.git
   cd spirit11-frontend
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   VITE_BACKEND_URL=http://localhost:3001
   ```

4. **Run the Development Server**

   ```sh
   npm run dev
   ```

5. **Build the Project**

   ```sh
   npm run build
   ```

6. **Preview the Build**

   ```sh
   npm run preview
   ```

### Back-End Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-username/spirit11-backend.git
   cd spirit11-backend
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/spirit11
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Development Server**

   ```sh
   npm start
   ```

### Database Connection

Ensure MongoDB is running on your local machine or use a cloud MongoDB service. Update the `MONGODB_URI` in the `.env` file with your MongoDB connection string.

### Deployment

#### Front-End Deployment on Vercel

1. **Login to Vercel**

   ```sh
   vercel login
   ```

2. **Deploy the Project**

   ```sh
   vercel --prod
   ```

3. **Set Environment Variables**

   Set the `VITE_BACKEND_URL` environment variable in the Vercel dashboard to point to your backend URL.

#### Back-End Deployment on Render

1. **Login to Render**

   ```sh
   render login
   ```

2. **Deploy the Project**

   Follow the instructions on the Render dashboard to deploy your backend repository.

3. **Set Environment Variables**

   Set the `PORT`, `MONGODB_URI`, and `JWT_SECRET` environment variables in the Render dashboard.

### Links

- **Front-End Deployment**: [Vercel Deployment Link](https://spirit-x-vertex-02-btok.vercel.app/login)
- **Back-End Deployment**: [Render Deployment Link](https://your-render-deployment-link.onrender.com)

### Additional Implementations or Functionalities

1. **MUI Alerts for User Feedback**:
   - MUI alerts are used to provide user feedback for validation errors and successful actions.

2. **Password Visibility Toggle**:
   - Custom password visibility toggle buttons are implemented for both the password and confirm password fields.

3. **Session Management**:
   - Basic session management is implemented to keep the user logged in until they click the “Logout” button on the landing page.

4. **Password Strength Indicator**:
   - A password strength indicator is implemented that dynamically updates based on password complexity.

### Commands to Run the Code

1. **Install Dependencies**:
   ```sh
   npm install
   ```

2. **Run the Development Server**:
   ```sh
   npm run dev
   ```

3. **Build the Project**:
   ```sh
   npm run build
   ```

4. **Lint the Code**:
   ```sh
   npm run lint
   ```

5. **Preview the Build**:
   ```sh
   npm run preview
   ```

6. **Run the Backend Server**:
   - Ensure you have a backend server running at `http://localhost:3001` as specified in the `.env` file.
