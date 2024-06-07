---
title: Software Design and Architecture (SDA)
description: Our Software Design and Architecture document.
---

## Introduction

The project aims to provide a better online-oriented fitness experience for the faculty and staff at Oregon State University. The FSF faculty at OSU needs a more cost-effective solution that retains the most popular programming from the previous solution.

The solution needs to be stable and easy to use from a user’s perspective. This helps drive user engagement. Solution longevity is also an important criterion as the project will be used for many years, perhaps longer.


## Architectural Goals and Principles

The top 5 architecture principles for this project would be maintainability, scalability, usability, flexibility, and security.



* Maintainability: It is extremely vital for the application to be self-sustainable before we graduate, so it must be maintainable.
* Usability: Faculty members will be unmotivated to use the application if the previous service was much easier. This will not be a robust project from the front end, but in the background, there will be many moving parts. 
* Flexibility: We want event managers to be able to make events of their own without the help of other developers.
* Security: The solution will contain lots of information regarding user activity (and consequently, their level of fitness), which may be considered personal information. It’s important we keep this data secure and accessible only to that user.
* Scalability: The solution may have thousands of users during an event, with many of those using the solution concurrently. The system needs to handle user bandwidth both small and large.


## System Overview

The backend foundation of the solution will be Supabase. They offer a pre-configured database solution that has security and stability in mind. Postgres is a very mature database software and can handle many concurrent requests with ease.

The database will be made accessible via an HTTP API, using the technology Kong. Kong speaks to an internal service called PostgREST that handles the CRUD operations behind the scenes. Kong is accessible with auth keys, which are issued by OAuth or otherwise.

The HTTP API will be accessed via the client software directly. This will be the mobile applications and the web application.


## Architectural Patterns


## Component Descriptions



* Mobile frontend: Handles end-user interactions, displays event progress, and provides navigation.
* Web frontend: Handles FSF event organizer interactions that include displaying event data, event creation tools, and announcement capabilities.   
* Backend Server: Processes requests, business logic, and interfaces with the database.
* Postgres: Stores and manages data using a relational database system.
* Kong: Exposes our backend services via an HTTP API
* PostgREST: Handles HTTP requests made to Postgres


## Data Management

**Tables**



* **Profiles Table**: Stores data regarding a single user.
* **Events Table**: This will store data regarding an event’s description, event type, start and end date.
* **Teams Table**: This will store data regarding teams, composed of one or many profiles. A many-to-many connection table will exist to enable this.
* **TeamsProfiles Table**: This table is pairing a profile’s _ProfileID _to a team’s _TeamID._
* **Activity Progress**: This table stores data on instances where a user adds progress towards some event and ties it to the Profile and Team.  

**Views**



* **Activity Progress Log View**: This View stores the individual activity log of a profile that had made progress on some event. Includes event information and profile information. 
* **EventStats View**: This view stores the eventID, event name, and the accumulated score of all teams in that event.
* **ProfileStats View**: This view stores the profileID, name, and total score of each profile. 
* **TeamStats View**: This view stores the relationship between a team and the event they are registered for. Includes information such as TeamID, Name, EventID, and total score of the team. 
* **TeamStats Breakdown**: This view defines the relationship between Teams, Profiles, and Total Score of teams. 

SQL views are created to calculate useful values. This is beneficial because it removes redundant calculation code from our two front-end codebases. This also reduces the risk of calculation error because it is being calculated at the backend.


## Interface Design

There are three main pages that the user can view 



1. A registration page
2. A page showing event descriptions and milestones
3. A page showing the current events that the user is enrolled in.
4. A page showing the user’s contributions to teams they are on.
5. A page showing the user their profile information, with the opportunity to edit details.
6. A page showing event leaderboards

The web frontend



1. A log-in page specific to FSF event organizers
2. A page showing current/past events.
3. A page showing high-level user statistics for an event (reachable by selecting an event from the events page).
4. A page allowing FSF event organizers to create a new event.
5. A page allowing FSF event organizers to create, edit, and send announcements.
6. A page showing leaderboard data for an event (past or present).
7. A page showing all teams for an individual event including their scores and members.


## Considerations


### Security



* Authentication is handled by OAuth. We can verify someone’s identity by their @oregonstate.edu email address. Certain accounts can be marked as FSF event organizers via the database, and they may mark other accounts as back office via the web front end. (The first admin account must be created via a DB edit).
* DB tables will be secured via row-level security (RLS). We may build a permissions system internal to the database. Rows can be accessed (or selected) once these permissions have been verified.
* All data transmitted is encrypted via SSL/TLS.


### Performance



* SQL Views should be cached where possible, lessening the amount of repetitive calculations that the database is required to do, where possible.
* Supabase has load balancing as part of its infrastructure. If we go self-hosted, this will be more of an issue as we will have to figure out the load-balancing issue. Postgres is naturally very fast, which is nice, and it can handle many concurrent connections.
* Our application is event based, so it’s reasonable to imagine the backend will encounter periods of high and sudden traffic. The team should think about mitigating this issue as we implement other components of our design.


### Maintenance and Support



* In a self-contained environment like Supabase, the services are very well documented and easily accessible.
* GitHub will have project history regarding issues and pull requests. Internal documentation will exist on how to perform certain operations, such as launching Supabase Docker compose scripts, or backing up the database (and restoring).
* The front end will have internal documentation, and we’ll use well-known frameworks and libraries to allow the project to be continued by the widest possible audience.
* A trail of release notes will exist to inform others of when features were implemented, and the related code commits.


## Deployment Strategy



* Early development will be using Supabase as our supporting backend. Supabase is great at handling user traffic, but we are limited by the free plan at the moment. Going self-hosted will allow us to hand-pick our computing power, memory size, and storage requirements. The Docker compose allows us the flexibility of expanding our storage by mounting virtual disks.
* This is outside my expertise, but a technology like Kubernetes could possibly be used to expand the Supabase capabilities sideways.
* The web front end will be deployed and maintained by Vercel
* The mobile front end will be deployed via the platform’s app stores (both Android and iOS).


## Testing Strategy



* The Postgres backend will be tested via pgTAP, a SQL unit testing library.
* The web front end will be tested via unit tests and (possibly) e2e tests. Cypress is a good platform for this and I am familiar with using it.
* The mobile front end will be tested via unit tests. React offers their own testing library. We feel that end-to-end testing on the mobile platform is important as well. We need to ensure all flows are functioning and invoke a happy feeling from within.
* Our GitHub repository should have automated tests for new pull requests to ensure the codebase remains stable. The most convenient and practical solution would be GitHub Actions.
* Larger tests will span the entire project (Web/Mobile) before production deployment.


## Glossary



* CRUD: Create, Read, Update, Delete.
* FSF: Faculty and Staff Fitness
* OSU: Oregon State University
* HTTP: Hypertext Transfer Protocol
* API: Application Programming Interface
* SQL: Structured Query Language
* E2E: End 2 End testing
* SSL: Secure Sockets Layer
* TLS: Transport Layer Security
* MVC: Model, View, and Controller