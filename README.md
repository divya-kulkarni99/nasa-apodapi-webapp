# nasa-apodapi-webapp

**Overview:**

This web application shows NASA’s Astronomy Picture of the Day (APOD).
Key features:

- Email/password signup and login.
- Google Sign-In (GIS) flow.
- Protected main page showing the APOD image, title, and description.

Tech stack used for developing the Web Application :

1. Frontend: ReactJS framework.
2. Backend: NodeJS, and ExpressJS.
3. Database: MongoDB Atlas (Mongoose)

Installation / Local Run

1. Clone

   ```
   git clone https://github.com/divya-kulkarni99/nasa-apodapi-webapp.git
   ```

2. Frontend setup

   ```
   cd client
   npm install
   ```

   Create `client/.env`:

   ```
   REACT_APP_API_URL=http://localhost:8080
   REACT_APP_GOOGLE_CLIENT_ID=<your_google_client_id>
   ```

3. Backend setup

   ```
   cd server
   npm install
   ```

   Create `server/.env`:

   ```
   MONGO_URI=<your_mongodb_atlas_uri>
   JWTokenPrivateKey=<your_jwt_secret>
   SALT=10
   GOOGLE_CLIENT_ID=<your_google_client_id>
   NASA_APOD_KEY=<your_nasa_api_key>
   ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   NODE_ENV=development
   ```

4. Run
   - Backend: `npm run dev` (or `npm start`) from `server/` (defaults to port 8080)
   - Frontend: `npm start` from `client/` (http://localhost:3000)

Prod config

- Backend env (Render):
  - `MONGO_URI`, `JWTokenPrivateKey`, `SALT`, `GOOGLE_CLIENT_ID`, `NASA_APOD_KEY`
  - `ALLOWED_ORIGINS=https://<your-frontend-domain>`
  - `NODE_ENV=production`
- Frontend env (Netlify):
  - `REACT_APP_API_URL=https://<your-backend-domain>`
  - `REACT_APP_GOOGLE_CLIENT_ID=<same id as backend>`

Google setup

- In Google Cloud Console → OAuth Web client:
  - Authorized JavaScript origins: `http://localhost:3000`, `http://127.0.0.1:3000`, your prod frontend domain.
  - Authorized redirect URIs: leave empty for this GIS button flow.

NASA key

- Get an API key from https://api.nasa.gov/ and set `NASA_APOD_KEY`.

Deployment (example)

- Backend on Render Web Service:
  - Root: `/server`
  - Build: `npm install`
  - Start: `npm start`
  - Env: as above
- Frontend on Netlify:
  - Base: `/client`
  - Build: `npm run build`
  - Publish: `build/`
  - Include `client/public/_redirects` for SPA routing.
