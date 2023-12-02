<h1 align="center"> Lilac Ventures Website - Algo Avengers</h1> <br>
<p align="center">
  <a href="./imgs/ReadMeTop.jpg">
    <img alt="Logo of Lilac Ventures" title="Lilac Venture Website" src="./imgs/ReadMeTop.jpg">
  </a>
</p>
## Table of Contents
- [Project Synopsis](#project-synopsis)
- [Software Images](#software-images)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [Testing Instructions](#testing-instructions)
- [Developer Instructions](#developer-instructions)
- [Timeline](#timeline)
## Project Synopsis
  Lilac Ventures is a website that is going to help customers communicate with the business owner to facilitate mentorship and transactions for financial coaching. The website will offer analytics to the business owner to develop customized solutions for each customer. The website will allow the business owner to manage customer data and schedule appointments to ease communication. It will also allow both the owner and customer to track progress on what documents are required to complete the process. Clients will also have the ability to pay within the website for the services that they have obtained. Both a client and customer portal will be implemented, each displaying its own analytics.  
## Software Images
### Logo
<img alt="Logo of Lilac Ventures" title="Lilac Venture Website Logo" src="./imgs/logo.png" width="100" height="100"/>
### ERD

![](https://raw.githubusercontent.com/davidenzler/lilac_ventures_website/main/imgs/image.png)


### Product Images


![image](https://github.com/davidenzler/lilac_ventures_website/assets/73456941/df677072-8779-4589-bf69-7c055a8a0e66)
![image](https://github.com/davidenzler/lilac_ventures_website/assets/73456941/01c94154-cce7-4227-941a-d5a8efa4495b)
![image](https://github.com/davidenzler/lilac_ventures_website/assets/73456941/a9ef670a-fb5e-4fe3-8e03-f6406fd74572)
![image](https://github.com/davidenzler/lilac_ventures_website/assets/73456941/bcbb22a6-109c-48cd-9b4b-08cfb5094b07)


## Dependencies
Dependencies are listed in package.json. They can be installed using any dependency manager. The team recommends and uses npm. The command to install all
dependencies using npm is
```
npm install
```
## Deployment

Required/Recommended resources:

[VsCode][https://code.visualstudio.com/] 

[Node.js](https://nodejs.org/en/download)

Setup instructions/deployment steps:
1. Install VS code and Node.js
1. Install VS code and Node.js - follow the link above for downlaod and install instructions for both Node and VsCode
2. Once the project is pulled from Github, run npm init at the project’s root folder.
3. Run ```npm start``` at the root to start the React server
4. Run ```node ./api/server.ts``` to start the ExpressJS server
5. The website can is hosted on localhost//3000/ by default

## Testing Instructions
### Test Suite: 
* Most testing was done through UI/UX testing. Every feature was identified and testing involved developing start, intermediate, and final steps for interacting with the UI of the deployed site. This includes both invalid and invalid input to check for error handling.
* The project is configured for Jest testing if that is desired in the future. Jest tests are done by running ```npm test```. The test are in the `./test` directory. New tests should be added here. Each new test file should follow the format of `<filename>.test.ts`.
  
### Test Coverage: how we measure test coverage and what percentage of code is currently covered by tests
* Some components have not been connected properly with the database and so they may not have any functionality. 
* ~90% of the front-end was tested. Every page on the site was listed, and features were mapped out for each page- this includes navigation throughout the site. For each feature, tests were developed to emulate user use of the site. Funactionality for valid inputs were tested and several edge cases with invalid input.
* Example: Testing the Messaging service
*   Recieving messages
*   Checking Inbox, trash, and sent inboxes
*   Sending Messages
*   Replying to messages
*   Deleting messages

## Developer Instructions

### Contributing guidelines 
* Individual developers must create their own branch on which to work on. Once the developer has completed their tasks on their branch, they must:
  * Commit their changes to their branch.
    * Commits follow the naming scheme: ``` LIL-# Task Description ```
    * Ex. ``` LIL-02 Updated Login Page ```
  * Publish the branch to the main Github repository
* Once the branch has been published to the main repository, developers must create a pull request to merge their code with the team's existing code:
  * Navigate to the ```Pull requests``` tab on Github
  * Select ```New pull request```
  * Select the branches you are merging
    * <b>IMPORTANT</b>: The developer’s branch must be merged into the <u>development branch</u> and NOT the main branch. 
  * Complete the pull request process and request a review
* Once a pull request has been created. Another developer will review the request and confirm the merge into the development branch. At the end of each sprint, the development branch will be merged into the main branch.  
### Troubleshooting
Run ```npm install``` at the root to start the project to install any missing dependencies
