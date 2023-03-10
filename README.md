# Dialogflow_to_Lex
 In this repo, I am sharing a NodeJS code which will help to send utterances of Intents present in dialogflow to Lex agent which will help in migration of chatbot from Google Dialogflow to Amazon Lex.

prerequisites:
1. Nodejs
2. Create a bot in Lex and export the json file from it.
3. Zip file of Dialogflow
4. Same Intent names in both Lex and Dialogflow.

Steps:
1. Take the intents folder from dialogflow zip and paste it in the folder where the code is present
2. Copy the json data present in Lex json file and paste it in Lex_json file.
3.Now run the Index.js file. It will give all the actions done while uploading utterances from dialogflow to lex in an Excel file where we can recheck.

Pros:
1. Decreases time for migrating from dialogflow to amazon lex.
2. Better than third party apps as data of your bot is safe.

Cons:
Intent names should be same in both bots
It is not creating slots in Lex and also not using entities in Dialogflow.

