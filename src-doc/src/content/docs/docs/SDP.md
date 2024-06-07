---
title: Software Development Process (SDP)
description: Our Software Development Process document.
---

## **Principles**



* We are responsive with our asynchronous communication and answer within 24 hours.
* A work item needs a motivation, technical description, dependencies, and acceptance criteria before anyone can work on it.
* Project tasks should be of reasonable size, large tasks should be broken down into manageable and well-defined chunks
* The backlog will always have work items ready for the next week at a minimum.
* The Pull Request has to be reviewed by at least two team members before being merged.
* We aim to evenly distribute the workload among all team members
* We will meet weekly to discuss goals,questions, and connect with the project manager to go over progress and new needs.
* Tracking task progress is done through GitHub projects, specifically our team Kanban board
* Asynchronous communication on the project needs to take place on a dedicated Discord server
* There are no “dumb” questions or ideas, and everyone is expected to communicate ideas to better serve the project and its purpose and avoid taking on parts of the project individually


## **Process**

We are using a [GitHub kanban board](https://github.com/orgs/OregonStateUniversity/projects/1) to keep track of team progress. We have well-defined tasks that can be moved from each of five stages:



1. Backlog
2. Ready
3. In Progress
4. In review
5. Done

Our team works asynchronously due to busy schedules, and this type of development process will enable efficient work under these circumstances. If required, we can meet with team members to work together on tasks that correlate to each other. This also enables a **quick** standup meeting every week, because tasks are easily identifiable from a birds-eye view. 

Work that needs to be done is placed in the backlog until it is defined enough to be deemed ready. When a task is completed, it will be reviewed by two team members and presented to the project’s stakeholders for feedback.


## **Roles**


<table>
  <tr>
   <td><strong>Design</strong>
   </td>
   <td>Responsible for the look and feel of the application and creating the initial designs for the front end. The Frontend developers will try their best to replicate these designs as closely as possible.  
   </td>
  </tr>
  <tr>
   <td><strong>Frontend</strong>
   </td>
   <td>Responsible for writing the code that drives the client-side portion of the application. This includes efficient communication with the backend, proper data caching techniques, and ensuring that end-user data is correctly handled and not lost.
   </td>
  </tr>
  <tr>
   <td><strong>Backend</strong>
   </td>
   <td>Responsible for writing the code that drives the server-side portion of the application. This includes handling connections made from client-side code, proper handling and cold-storing of application information, and ensuring that end-user data is secure and accessible where needed.
   </td>
  </tr>
  <tr>
   <td><strong>Scrum Master</strong>
   </td>
   <td>Responsible for facilitating the communication and collaboration between team members. Also ensures the the scrum framework is being followed so that the project runs smoothly
   </td>
  </tr>
</table>


As we continue with the project timeline, roles could be switched between the team until a unique strongpoint is discovered by each member. Although the work will be different, tasks should be evenly distributed in terms of difficulty.

Currently, our roles are:


<table>
  <tr>
   <td>
   </td>
   <td><strong>Role</strong>
   </td>
   <td><strong>Members</strong>
   </td>
  </tr>
  <tr>
   <td><strong>1.</strong>
   </td>
   <td>Scrum Master
   </td>
   <td>
<ul>

<li>Alex Ulbrich
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>2.</strong>
   </td>
   <td>Back-office Frontend Team
   </td>
   <td>
<ul>

<li>Edson

<li>Ryan

<li>Jason
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>3.</strong>
   </td>
   <td>Mobile Frontend Team
   </td>
   <td>
<ul>

<li>Stephen

<li>Aidan

<li>Yang

<li>Lei
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>4.</strong>
   </td>
   <td>Backend Team
   </td>
   <td>
<ul>

<li>Stephen
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>5.</strong>
   </td>
   <td>Design Team
   </td>
   <td>
<ul>

<li>Lei
</li>
</ul>
   </td>
  </tr>
</table>



## **Tooling**


<table>
  <tr>
   <td><strong>Version Control</strong>
   </td>
   <td>GitHub
   </td>
  </tr>
  <tr>
   <td><strong>Project Management</strong>
   </td>
   <td>GitHub Issues and Projects
   </td>
  </tr>
  <tr>
   <td><strong>Documentation</strong>
   </td>
   <td>Starlight, Google Docs, GitHub README
   </td>
  </tr>
  <tr>
   <td><strong>Test Framework</strong>
   </td>
   <td>TBD
   </td>
  </tr>
  <tr>
   <td><strong>Linting and Formatting</strong>
   </td>
   <td>Prettier
   </td>
  </tr>
  <tr>
   <td><strong>CI/CD</strong>
   </td>
   <td>GitHub Actions
   </td>
  </tr>
  <tr>
   <td><strong>IDE</strong>
   </td>
   <td>Visual Studio Code
   </td>
  </tr>
  <tr>
   <td><strong>Graphic Design</strong>
   </td>
   <td>Figma
   </td>
  </tr>
  <tr>
   <td><strong>Others</strong>
   </td>
   <td>Google, StackOverflow, AI tools (Bard, ChatGPT, etc.) 
   </td>
  </tr>
</table>



## **Definition of Done (DoD)**



* Acceptance criteria are validated
* Changes are reviewed by at least 2 members on the team 
* Changes are merged (to main branch)
* Unit and integration tests are successful and meet all requirements
* Changes are implemented in the frontend, backend, database
* Limited or at best, zero regressions
* Documentation is updated
* Release notes are updated
* Breaking changes are evaluated/avoided
* Changes are deployed to staging
* Demo is prepared for next stakeholder meeting
* Tasks are moved from “To-Do” section to “Done”


## **Release Cycle**



* Merges to the main branch will automatically produce staging builds
* Merges deemed as a new release will deploy to production for end-users to interact with
* Aim for 1 or 2 new releases per month
* Use semantic versioning `MAJOR.minor.patch`
    * Increment the `minor` version for new features
    * Increment the `patch` version for bug fixes
    * Increment the `major` version for breaking API changes

_Until the API is stable,_ `major` _should be_ <code>0<em>. </em></code>


## **Environments**


<table>
  <tr>
   <td><strong>Environment</strong>
   </td>
   <td><strong>Infrastructure</strong>
   </td>
   <td><strong>Deployment</strong>
   </td>
   <td><strong>What is it for?</strong>
   </td>
   <td><strong>Monitoring</strong>
   </td>
  </tr>
  <tr>
   <td>
    <strong>Production</strong>
   </td>
   <td>Supabase (Backend) + Vercel (Web Frontend) + App Stores (Google Play Store or App Store; Mobile Frontend)
   </td>
   <td>Release
   </td>
   <td>For production of features and application
   </td>
   <td>N/A (Tools are provided by Supabase / Vercel)
   </td>
  </tr>
  <tr>
   <td>
    <strong>Staging (Test)</strong>
   </td>
   <td>Local, similar to Dev
   </td>
   <td>PR
   </td>
   <td>Initial testing for selected users 
   </td>
   <td>N/A (Tools are provided by Supabase)
   </td>
  </tr>
  <tr>
   <td>
    <strong>Dev</strong>
   </td>
   <td>Local (MacOS, Windows, iOS, Android) + Docker-ized Services (Backend)
   </td>
   <td>Commits
   </td>
   <td>Development of application and feature updates 
   </td>
   <td>N/A (Tools are provided by Supabase)
   </td>
  </tr>
</table>

