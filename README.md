# nasa-apodapi-webapp
Overview:

I have developed a web application which displays Astronomy Picture of the Day
The website contains the following functionalities:
Provides an option to Login/SignUp. 
Provides an option to log in with Google Oauth. 
Displays the Image uploaded by Astronomy picture of the day uploaded by NASA on successful login.

Tech stack used for developing the Web Application :
1) Frontend: ReactJS framework.
2) Backend:  NodeJS, and ExpressJS.
3) Database: Mongoose from MongoDB is used for storing the bcrypted user information

Installation/Steps to Run this web application

Step 1. Clone the repository to your local machine using Git.
git clone `https://github.com/divya-kulkarni99/nasa-apodapi-webapp.git`

Step 2. Open client (frontend) folder 
`cd client`

Step 3. Install project dependency with npm (Node Package Manager) or yarn (Yet Another Resource Negotiator)
1. `npm install or yarn install`
2. `npm install react-router-dom`
3. `npm install moments`

Step 4. Open server (backend) folder 
`cd server`

Step 5. Install project dependency with npm (Node Package Manager) or yarn (Yet Another Resource Negotiator)
1. `npm install or yarn install`
2. `npm install express cors joi mongodb bcrypt dotenv jsonwebtoken nodemon`

Step 6. Setting up .env file
1. `cd server`
2. create .env file
3. Add the following
`UserInformation = 'YOUR_MONGODB_URL'`
`JWTokenPrivateKey ='JWEBTOKEN_PRIVATE_KEY'`
`SALT = 10`

Step 7. Obtaining NASA_APOD_API_KEY
a. Visit the NASA API portal: Go to the NASA API portal website at https://api.nasa.gov/.

b. Create an account: If you don't already have an account, click on the "Sign Up" link at the top-right corner of the page. Fill in the required information and create your account. If you already have an account, you can log in using your credentials.

c. Log in to your account: After creating your account or if you already have one, log in to the NASA API portal using your credentials.

d. Generate an API key: Once you are logged in, navigate to the "API Keys" section or a similar area where you can manage your API keys.

e. Create a new key: Click on the "Create" or "Generate" button to create a new API key.

f. Provide details: You may be prompted to provide some details about your usage, such as the project name, purpose, and intended API endpoints. Fill in the required information and proceed.

g. Obtain the API key: After submitting the details, the portal will generate an API key for you. It is usually a long alphanumeric string.

Step 8. Google button access
1. Go to https://console.cloud.google.com/
2. Create an APIs and get clientID and store it in .env file

Step 9. Running the application
1. `cd client`
2. `npm start` or `yarn start`
3. `cd server`
4. `nodemon start`

Step 10. Webapplication opens in http://localhost:3000

The web application is live on https://nasa-apodapi-webapp-1.vercel.app/
