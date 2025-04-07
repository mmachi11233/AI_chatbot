Project Title: AI chatbot 


Overview


This is a web application and mobile app featuring a chatbot and a basic CMS built using Adonisjs for backend and React + Typescript for the front end. It also includes a React Native mobile app. The CMS is used to manage content that the chatbot can use to provide replies to user queries.


Running Locally


1. Clone: `git clone https://github.com/mmachi11233/AI_chatbot`

2. Install: `npm install` and install Nodejs version 18 or higher

3. Environment: Create `.env` set necessary variables (e.g., `PORT`, `DATABASE_URL`, API keys).

4. Run: `adonis serve --dev`

5. Run front end: npm start


Deployment


· Containerized app using Docker by creating a docker container

· Hosted code with GitHub which serves as a central version control system

· I will be using Render as the hosting platform


Once I connect the GitHub repo to Render it will recognize the Dockerfile


Hosting URL: 
backend: https://ai-chatbot-226o.onrender.com
frontend: https://frontend.onrender.com




CMS and Chatbot Integration


· The chatbot receives user queries and information from the CMS via the web or mobile app

· It then checks for matching keywords in the Mongodb database with predefined responses

· Content relevant to the chatbot is managed within the CMS.

· When a user interacts with the chatbot, by imputing a message this triggers a CMS lookup

· Data fetched from the CMS is then outputted to the user or falls back to an AI response if there was no relevant matching keyword in the database
