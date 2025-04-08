Project Title: AI chatbot 


Overview


This is a web application and mobile app featuring a chatbot and a basic CMS built using Adonisjs for backend and React + Typescript for the front end. It also includes a React Native mobile app. The CMS is used to manage content that the chatbot can use to provide replies to user queries.


Running Locally


1. Clone: `git clone https://github.com/mmachi11233/AI_chatbot`

2. Navigate: `cd AI_Chatbot`

3. To build the docker image 'docker build -t backend-image' 

4. Run the docker container 'docker run -p 4000:3333 backend-image'

this will expose the backend on http://localhost:4000

5. Build and run the front-end 

docker build -t frontend-image ./chatbot-app

docker run -p 3000:80 frontend-image


Access the app:
 Backend URL: http://localhost:4000

Frontend URL: http://localhost:3000





Deployment


· Containerized app using Docker by creating a docker file

· Hosted code with GitHub which serves as a central version control system

· I will be using Render as the hosting platform


Once I connect the GitHub repo to Render it will recognize the Dockerfile


Hosting URL: https://ai-chatbot-226o.onrender.com




CMS and Chatbot Integration


· The chatbot receives user queries and information from the CMS via the web or mobile app

· It then checks for matching keywords in the Mongodb database with predefined responses

· Content relevant to the chatbot is managed within the CMS.

· When a user interacts with the chatbot, by imputing a message this triggers a CMS lookup

· Data fetched from the CMS is then outputted to the user or falls back to an AI response if there was no relevant matching keyword in the database