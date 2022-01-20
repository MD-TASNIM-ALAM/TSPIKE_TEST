Tiger Spike Coding Challenge | Candidate: MD TASNIM ALAM | Email: talamiu@gmail.com
===================================================================================

Problem (Landmark Remark)
-------------------------
A simple web app to let the users save landmarks at their current locations and add remark to that. Users can search for landmarks created by them and also by other users.

User stories/Backlogs
-------------------
The explicit requirements are:  
-	As a user (of the application) I can see my current location on a map  
-	As a user I can save a short note/remark at my current location  
-	As a user I can see my remark that I have saved at the location they were saved on the map  
-	As a user I can see the location, text, and user­name of notes other users have saved  
-	As a user I have the ability to search for a note based on contained text or user­name 

Based on the explicit requirements/ functionalities the following implicit requirements are recognised.
-	A user should be able register/signup with the app
-	A user can login/logout to/from the app
-	A user should be able to see his current location with a special indicator/icon on the map
-	A user should be able to see all the landmarks (either created by him or other users) around his current location
-	A user should be able to easily identify a landmark whether its created by him or other user
-	A user should be able to search for landmarks and also make apply filter to all landmarks
-	A user should be able tap on the landmark pin on the map and see the details (note/remark and the username)
-	A user should be able to zoom-in/zoom out the map to look for landmarks
-	Live update of location remarks by other users
-	Basic API security
-	Toast message, pop dialogue and log in time out features

App Features for current sprint that will meet the requirements
---------------------------------------------------------------

-	User can login with their Username & Password
-	On the landing page User can add notes on their current location by clicking/touching on the icon
-	Can look at their own notes and see others notes on the map by clicking/touching on the icon
-	User can search by note or user name
-	From the filtered list, user can click/touch on an item on the list and the note is poped up/highlighted on the map.
-	User can logout

App Features for next sprint
----------------------------

-	Register/signup with the app
-	Live update of location remarks by other users( by apollo client & graphQL subscriptions)

Solution (Full Stack Development)
--------

* Architecture: SPA with Microservices Architecture ----- Service oriented solution , cross platform, loosly coupled among the components, highly scalable, high testability. 

* Technologies choice: Angular 9, WEB API, EF, SQLITE, xUnit, MOQ ---- The combination is highly scable.

* UX/UI: Angular SPA, nice look and feel, user login, landmark (very basic). 

* Web API: ASP.NET CORE WEB API

* Design Patterns/Principles: DI, Generic Repository Pattern

* Security: API Gateway and JWT Token Authentication ----- API Gateway will give some level of security by handling outside vulnerable attempts. Due to time constraints I did not implemented API gateway and swagger (though the webAPI login verifies user with JWT Token). Better to have swagger for APIs and a single API Gateway(using Ocelot) with Identity service/server for all web API access.

* Testing: Unit Test using xUnit with MOQ ----- Due to time contraints, I have done a simple Unit test. Will need Integration Test/ Fuctional Test.


* Development Environment Readiness: 
   1. VSCode and/or VS 2019 for web api and test project
   2. Nodejs, @angular/cli, @angular-devkit/build-angular
  

* Instructions: 
   1. Open landmark-remark solution on VS studio 2019 
   2. Build project Landmark.API 
   3. Run EF migration (Add-Migration Initial,update-database) on package manager console
   4. Run project Landmark.API
   4. Open ClientAPP from src\WebAPP\Landmark.SPA\ClientApp on VS Code
   5. Run npm install @angular/cli from VS Code terminal
   6. Run npm install @angular-devkit/build-angular from VSCode terminal command
   7. Check the Environment.ts from ClientAPP and set Landmark.API appUrl if needed
   8. Run ng serve from VS Code terminal
                

Level of effort and time estimates
----------------------------------
Following is the approximate break down of time spent in man-hours for various aspects of the design and developement process.
*  Solution readiness and architecture planning - 2h
*  Design & Development basic UI - 2h
*  User can login with their Username & Password – 2h
*  On the landing page User can add notes on their current location by clicking/touching on the icon – 3h
*  Can look at their own notes and see others notes on the map by clicking/touching - 2h
*  User can search by note or user name -1.5h
*  From the filtered list, user can click/touch on an item on the list and the note is highlighted on the map - 1.5h
*  User can logout -1h 
*  JWT Token & security implementation – 1.5h
*  Toast service, pop up dialogue, time out - 2.5h
Total Hours: 19

Issues & Limitations
--------------------
There are a few issues with the app that can be improved.
 * Need more review and refactoring if needed
 * Can implement clean architetcure onion view https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures#all-in-one-applications
 * Implemetion of API Gateway using Ocelot
 * Implementation of Identity Server/Service(Responsible for Authentication and Authorization, so need to replace authcontroller from API to Identity service)
 * Swagger for Web APIs
 * Extensive Error Handling, Logging
 * Full Unit Testing (Web API)
 * Full Unit Testing (Angular by Kafka & Jasmine)
 * Functional Testing

Demo users for testing
----------------------
| username       |password|
| -------        | :-----:|
| t@gmail.com    | abc123 |
| tiger@gmail.com| abc123 |
| a@gmail.com    | abc123 |



