# DRT - Ticketing System
**Angular2+ Project developed by team DR**

# Team DR
| Team member         | Username                                                                    |
| -------------       | :--------:                                                                  |
| Dobromir Topalov    | [**DobromirTopalov**](https://github.com/DobromirTopalov)                   |
| Rusi Rusev          | [**roruroru**](https://github.com/roruroru)                                 |

## Video:
   * https://www.youtube.com/watch?v=lHaZ3lQ1KJM&feature=youtu.be

## Guide to try it out
  * download the repository
  * run it in VS Code
  * open both directories in different terminals and don't forget to 'npm install'
  ### Run server
  * change dir to '.\server' folder, find 'database\config\config', and change 'development' settings or try to match the same
  * if you use different OS, change paths strings in 'database\models\index' , example: use correct slashes('\' or '/')
  * go to 'package.json' and look at 'scripts', there you will find commands, you might have some issues with paths again so try to change them if needed.
  * use commands in terminal in such order: go to 'database' folder and '../node_modules/.bin/sequelize db:migrate', as you are already in the correct folder use the next command '../node_modules/.bin/sequelize db:seed:all', then 'npm start' to run the server
  ### Run client
  * change dir to '.\client' and type 'ng serve -o' as a command in the terminal
  * wait a few moments
  * browser should open and app be ready to use, remember - you should start both the server and the angular app
  
## Project Description
Welcome to DRT - Ticketing System, your new ticketing system app! Register and you will have full access to our features - create teams, add members, create tickets and assign them to your colleagues. Our applications will help you be more productive and organized.
Start optimizing your tasks now - join us and enjoy!

# Project Description
A large corporation consists of multiple teams which develop products and provide services both for internal user and for end clients. For example, a database management team may request new instances from the company cloud infrastructure team, while a software developer may request commit rights to a repo from the team lead, or an employee can request a new PC keyboard. To track requests, corporations use request portals (aka Ticketing Systems) where users create requests and the responsible teams are notified.
Your task is to create such system using Angular. The system should allow creating tickets with informationfor the issue, assigning tickets to the responsible person, attaching comments to the tickets with questions and progress updates, as well as reassigning the ticket and marking its current status until it reaches “COMPLETED”.

## Public Part
The public part of your projects should be visible without authentication.
  *	Application MUST have public homepagе
  *	Application MUST have register functionality
  *	Application MUST have login functionality


## Private Part (Users only)
Registered users MUST have private area in the web application accessible after successful login, where they could see all tickets assigned to them, all tickets where the user is the requester, a list of all the teams the user is part of and optionally a list of pending team invitations (if no other notification method was implemented).
  *	Users MUST be able to create teams consisting of other users (company employees). A team MUST have a queue containing the team’s tickets.
  *	Team members SHOULD be able to invite other users into the team and each individual user SHOULD be able to leave the team. The invited users SHOULD receive notification (pop up, email, desktop notification, static list of invitations from the user’s private area – all are fine).
  *	A user MUSTbe presented with a UI which allows him to create a ticket for a team he is a member in, enter the required ticket information and then “SUBMIT” the ticket.The newly created ticket is added to the responsible team’s queue and is visible on the assignee’s and requester’s private areas.
  *	Each ticket MUST have id, title, description, labels, status, estimated time for finishing the job, requester (normally the creator of the ticket), assignee and comment section.
  *	The tickets COULD have attachments functionality (upload screenshots, files, etc.).
  *	The team members MUST be able to view the newly created ticket and its data, post comments, change its status (e.g. to COMPLETE), all or assign(requester or leader) it to themselves or another team member or to the requester (asking them to add more info).The assignee SHOULD receive a notification.
  *	A user COULD be able to search for а ticket in the team’s queue by: title, label and assignee.
  *	Once the ticket’s status has been changed to COMPLETE, the requester SHOULD receive a notification, after which they can either reopen the ticket - which changes its state to REOPENED and reassigns it to the last team member it was assigned to or close it - which takes it out of the team’s queue.The requester SHOULD be able to close a ticket at any time.A closed ticket MUST NOT be able to be reopened
  *	The tickets COULD have “escalation” contact who gets notified in case of problems or complaints regarding the ticket. If the outstanding ticket approaches the estimated deadline, the escalation contact SHOULD receive anotification
  *	Users COULD be able to create a ticket “on behalf of” someone else as requester

## Administration Part (Optional requirement)
System administrators should have administrative access to the system and permissions to administer all major information objects in the system.
  *	Administrators COULD view all tickets and teams.
  *	Administrators COULD be able to close any ticket.
  *	Administrators COULD be able to add and remove any user from any team.
  *	Administrators COULD be able to see all teams’ queues.
  *	Administrators COULD be able to create other administrators.
  *	Any changes to ticketstatus, assignee,ticket information (title and/or description) edits, user registration and user password changeCOULD be reflected in an audit log visible to administrators which MUST NOT be editable or modifiable.

## Development Requirements
Your Web application should use the following technologies, frameworks and development techniques:
  *	Use Angular and preferably Visual Studio Code 
  *	Create beautiful and responsive UI
    o	Implement responsive UI using Bootstrap 3 or 4, or Materialize or don’t use a framework at all
    o	You may change the standard theme and modify it to apply own web design and visual styles
  *	Use modules to split your application logic
    o	Core, Shared and Feature modules
  *	Create several different pipes and use them
  *	Create several different directives and use them
  *	Create several modules and use them in the routing
  *	Use lazy loading for the routing 
    o	Decide on the strategy used 
  *	Use guards to prevent the user to access the routes 
  *	All of the data should be loaded from a web server using services
    o	You can either use Firebase, Kinvey or any other back-end service.
    o	Or you can use your own server written in Node.js, ASP.NET WebAPI or any other technology
  *	Unit test a few components
  *	Your project should pass the default TS linting configuration without any errors
  *	You can use Angular CLI
    o	Or Webpack, SystemJS and any other module loader/bundler
  *	Your application should compile, work and produce an adequate result
  *	Use GitHub and take advantage of the branches for writing your features.
  *	Documentation of the project and project architecture (as .md file, including screenshots)

## Optional Requirements
  *	Write integration tests 
  *	Use reactive forms
  *	Originality of the implementation (uniqueness)
  *	Host your application in the web (any public hosting provider of your choice)
  *	Not every user in an enterprise has the same access rights. Your application COULD allow different actions to different classes of users. For example, only a certain role of users COULD have the ability to create teams, create tickets or change ticket’s status.For the purpose of your project, users can simply specify their roles/entitlements when signing up (user, team lead and project owner).You COULD extend your application so that only the team lead can invite and remove users from the team, the project owner could have full control over the team’s tickets (open, reopen, close).
  *	BONUS: “Progressify” your app (aka extend your app into a PWA – Progressive Web App)
    o	There should not be any failed PWA audits in Google’s Lighthouse.
    o	Opening your app on a mobile device should prompt the user to add it to the home screen.
    o	Your app should display something (something simple like the logo and some text) when no network connectivity.
    o	Your new and shiny PWA app should send desktop notifications in addition to the normal notifications you have implemented so far as a part of this assignment. 

## Deliverables
Put the following in a ZIP archive and submit it:
  *	The source code (everything except /bin/, /obj/, /packages/)
  *	The project documentation
  *	Screenshots of your application
  *	If hosted online - the URL of the application

## Public Project Defense
Each student must make a public defense of its work to the trainers, Partner and students (~30-40 minutes). It includes:
  *	Live demonstration of the developed web application (please prepare sample data)
  *	Explain application structure and its source code
  *	Show the commit logs in the source control repository to prove a contribution from all team members
Many projects in the enterprise suffer from degradation of design and increasing complexity over time, leading them to develop defects and gradually become unmanageable.
We value greatly teams who are able to do their job cleanly with a logical and maintainable design, without either unnecessary abstraction or ad hoc hacks.
You need to understand the system you have created. Any defects or incomplete functionality must be properly documented and secured. It’s OK if the proof of concept of your application has flaws or is missing one or two MUST’s. What’s not OK is if you don’t know what’s working and what isn’t and if you present an incomplete project as functional.
Some things you need to be able to explain during your project presentation:
  *	What are the most important things you’ve learned while working on this project?
  *	What are the worst “hacks” in the project, or where do you think it needs more work?
  *	What would you do differently if you were implementing the system again?

