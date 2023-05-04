# Lilac Ventures Website

  Lilac Ventures is a website that is going to help customers communicate with the business owner to facilitate mentorship and transactions for financial coaching. The website will offer analytics to the business owner to develop customized solutions for each customer. The website will allow the business owner to manage customer data and schedule appointments to ease communication. It will also allow both the owner and customer to track progress on what documents are required to complete the process. Clients will also have the ability to pay within the website for the services that they have obtained. Both a client and customer portal will be implemented, each displaying its own analytics.  

![](https://raw.githubusercontent.com/davidenzler/lilac_ventures_website/main/screen1.png)
![](https://raw.githubusercontent.com/davidenzler/lilac_ventures_website/main/screen2.png)
![](https://raw.githubusercontent.com/davidenzler/lilac_ventures_website/main/screen3.png)
![](https://raw.githubusercontent.com/davidenzler/lilac_ventures_website/main/screen4.png)


## Dependencies

Describe any dependencies that must be installed for this software to work.
This includes programming languages, databases or other storage mechanisms, build tools, frameworks, and so forth.
If specific versions of other software are required, or known not to work, call that out.

## Deployment

Required/Recommended resources:
-VS code
-Node.js

Setup instructions/deployment steps:
-Install VS code and Node.js
-Once the project is pulled from Github, run npm init at the project’s root folder.
-Run “npm start” at the root to start the project.
-Run "node ./api/server.ts" to start the ExpressJS server


## Testing Instructions
Test Suite (Testing frameworks or tools used)
To be completed in CSC191
Test Coverage (How to measure test coverage and what percentage of code is currently covered by tests)
To be completed in CSC191
Known Issues
Some components have not been connected properly with the database and so they may not have any functionality. 

## Developer Instructions

Contributing guidelines: (This should include information on how to submit a pull request, how to format code, and any other requirements for contributing to the project.)
Individual developers must create their own branch on which to work on. Once the developer has completed their tasks on their branch, they must:
Commit their changes to their branch.
Commits follow the naming scheme: LIL-# Task Description
Ex. LIL-02 Updated Login Page
Publish the branch to the main Github repository
Once the branch has been published to the main repository, developers must create a pull request to merge their code with the team's existing code.
Navigate to the “Pull requests” tab on Github
Select “New pull request”
Select the branches you are merging
IMPORTANT: The developer’s branch must be merged into the development branch and NOT the main branch. 
Complete the pull request process and request a review
Once a pull request has been created. Another developer will review the request and confirm the merge into the development branch. At the end of each sprint, the development branch will be merged into the main branch.  


## Known issues

Document any known significant shortcomings with the software.

## Getting help

Instruct users how to get help with this software; this might include links to an issue tracker, wiki, mailing list, etc.

## Timeline
Sprint 5 
Secure Login for Customer: Implement secure customer login with a login page that connects to the customer portal, the option to change a password, and login protected user information and functions. 
Interactive Forms: Complete the interactive webform functionality with form validation. 
Custom Domain and Email: Register a domain and hosting service. Setup domain email address for client.
Customer Analytics: Implement software to collect and store analytics data on customers. Create dashboard where client can view analytics data about customers (location, age, gender, etc).
Register Client name and custom email with hosting service.
Continue implementing React API services.
Continue implementing UI Components.

Sprint 6 
Payment System implementation: In this sprint we plan to work on and complete an invoicing and payment management system so that our client will have a way to bill their customers.We also plan to have all the necessary security features implemented to make the payment secure. 

Sprint 7 
Internal Messaging System: Implement an inbox system through which client and customers can communicate. Inbox should be integrated within the website and easily accessible, and allow the client and customers to communicate in real time.
Calendar View: Implement a Calendar view accessible by both client and customers allowing them to track appointments. Calendar should allow the client to create, cancel, or reschedule appointments for customers.

Sprint 8 
Document Management: Implement Database of customer documents with access control and basic file manipulation (rename, delete, etc.). 
Document Upload: Implement secure file upload feature. Feature should only be accessible to authenticated users. Documents should be stored in the database once uploaded.

Sprint 9 
Content Management System (CMS): Implement a system to allow the client to easily update/modify the website. CMS should allow the client to add, edit, or delete pages and their respective content without needing any coding knowledge. The CMS should be scalable and flexible so the client can add new features/functionality to the website as it grows.

