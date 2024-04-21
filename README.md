Sports Event Management Project Using GraphQL and Node.js


Overview:
I've built this project with a focus on simplicity, organization, and maintainability. Every part of the code is structured and easy to follow, making it a breeze to work with.

Starting from the basic functionalities, I've gradually added more advanced features, ensuring a smooth progression. For managing data, I've chosen to use arrays, which keeps things simple and efficient.

To handle errors, I've implemented clear and reliable error-handling mechanisms. This ensures that even if something unexpected happens, the application won't crash, and users will receive helpful feedback.

And to make sure everything works as expected, I've written thorough unit tests. These tests cover different scenarios and edge cases, giving us confidence that the code is solid and reliable.


Dependencies Used:
• Express: Server framework for Node.js
• Express – GraphQL: Middleware for integrating GraphQl with Express
• GraphQL: Query language for APIs
• Lodash: Utility library for manipulating data
• Uuid: Library for generating unique identifiers
• Jest: Testing framework for JavaScript
• Supertest: Library for handling HTTP requests in testing


Data Storage Structure:
Event Details:
{
        eventId:"Unique Id",
        eventName:"Name of the Event",
        eventType:"Type of the Event",
        eventDate:"Date",
        participantsLimit:2, // How many can able to participate to the event
        totalNoOfParticipants:2 // How many are already Enrolled to the event
}

Participant Details:
{
        userId:"e35d2194-d246-4c26-a6a3-58d2fc86949f",
        participantName:"Prithiviraj",
        age:25,
        email:"EmailId@gmail.com",
        phone:"PhoneNo",
        eventId:["EventId 1","EventId 2","EventId3"] // participants can able to register multiple events
}


Project Setup Process:
Step 1: Clone the project files into localsystem using https in github.
Step 2: Change terminal directory to src/app.js file where found.
Step 3: Run Command = " npm install -g nodemon ", Ignore if you already have Nodemon.
Step 4: Run Command = " npm install " | " npm install -f ", To install dependencies that is 
required to run this project.
Step 5: Run Command = " nodemon app.js " | " node app.js ", To start the application.
Step 6: URL to run queries = "http://localhost:4000/graphql"


API Interaction:
1.Create Event:
Query No 1:
mutation {
     createEvent(
       eventName:"ENTER EVENT NAME | STRING",
       eventType:"ENTER EVENT TYPE | STRING", 
       eventDate:"ENTER EVENT ORGANIZING DATE | STRING",
       participantsLimit: SET LIMIT | INT
     )
   {
     eventName
     eventType
     eventDate
     participantsLimit
   }
}

2.Register Participant:
Query No 2:
mutation {
  registerToEvent(
    participantName: "ENTER NAME | STRING"
    age: ENTER AGE | INT
    email: "ENTER EMAILID | STRING"
    phone:"ENTER NUMBER | STRING"
    eventId:"ENTER EVENTID | STRING | REFER IN eventData file"
  ) {
    participantName
    age
    email
    phone
    eventId
    userId
  }
}
 
3.List Events:
Query No 3:
{
 event{
  eventDetails{
    eventName
    eventId
    eventType
    eventDate
    participantsLimit
    totalNoOfParticipants
    participants{
      participantName
      email
      phone
    }
  }
} 
}

4.View Specific Event Detail:
Query No 4:
{
	event{
    	eventDetail(eventId:"ENTER EVENTID | STRING | REFER IN eventData file"){
    	eventName
    	eventId
    	eventType
    	eventDate
    	participantsLimit
    	totalNoOfParticipants
      	  participants{
            participantName
            email
      }
  }
}
}

5.Update Existing Event:
Query No 5:
mutation{
  updateEvent(
    eventId:"ENTER EVENTID TO UPDATE | STRING | REFER IN eventData file",
    eventName:"ENTER NEW EVENTNAME | STRING"
    eventType:"ENTER NEW EVENTTYPE | STRING",
    eventDate:"ENTER UPDATED DATE | STRING"
  )
  {
    eventId
    eventType
    eventDate
  }
}

6.Delete Existing Event:
Query No 6:
mutation{
  deleteEvent(
    eventId:"ENTER EVENTID TO DELETE | STRING | REFER IN eventData file"
  )
  {
    eventId
  }
}

Error Handling:
1.Attempting to register for a non-Existing event:
NOTE:- Refer Query No with Api integration query

• Using Query No 2, If you enter the eventID that is not present in the eventData file then it 
will throw an error, That means there is no event like that.

• ERROR MESSAGE: "The Event you are trying to register is no longer exists, or check 
the eventId once.."

2.Creating Duplicate Event: 
• Using Query No 1, If you enter the eventName that already present in the eventData file 
then it will throw an error, That means there is already Event present like that.

• ERROR MESSAGE: "Event Already Exists..."

3.Participant Limit: 
• Using Query No 2, If you try to register for an event that already crosses 
totalNoOfParticipants i.e, The slots are full then it will throw an error.

• ERROR MESSAGE: "Registration is closed.."

4.Attempting to update for a non Existing event (New Implementation):
• Using Query No 5, If you try to enter eventId and run the query, If that eventId doesn't 
present in the eventData file, then it will throw an error, That means there is no event like 
but we are trying to update that.

• ERROR MESSAGE: "Event you are trying to update is not found.." 

5.Attempting to delete for a non Existing event (New Implementation): 
• Using Query No 6, If you try to enter eventId and run the query, If that eventId doesn't 
present in the eventData file, then it will throw an error, That means there is no event like 
but we are trying to delete that.

• ERROR MESSAGE: "Event you are trying to delete is not found.."

6.User trying to register for a same event more than once (New Implementation): 
• Using Query No 2, If you try to execute the query by entering the same eventId more 
than once then it throws an error, That means person is allowed for a same event once.

• ERROR MESSAGE: "You are Already Registered for this event.."

Unit Testing:
File:
index.test.js file contains every test cases.
junit.xml file contains every test case results.

To Run Testing:
Step 1: Make sure jest and junit has been installed.
Step 2: Run Cmd = " npm run main_tests "    

-------------------------------------------   Completed   ----------------------------------------------------
by, 
Prithiviraj A