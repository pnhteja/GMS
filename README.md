<a name="readme-top"></a>

<!-- ABOUT THE PROJECT -->

## Grievance Management System

One of the reasons for spam emails is grievances. We built a platform that has a defined structure for escalation, a student/faculty can post and assign a grievance, and the app will track it to resolution. There will be a defined timeline for each stakeholder, if there is no resolution, the issue will be escalated to the next person.

<!-- ![Product Name Screen Shot](GMS.png) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Tools -->

### Built With

The following libraries and frameworks are used to build and test this project.

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Instructions on setting up the project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- Setup [MongoDB Community Server](https://www.mongodb.com/try/download/community) locally.
- npm
  ```sh
  npm install -g npm
  ```

### Installation and Setup

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Go to frontend folder and install npm packages.
   ```sh
   npm install
   ```
3. Go to backend folder and install npm packages.
   ```sh
   npm install
   ```
4. Turn on Database Server

   ```sh
   mongod --dbpath <your local databse path>

   Ex : mongod --dbpath E:\data\db
   ```

5. Go to frontend folder and start frontend server.
   ```sh
   npm start
   ```
6. Go to backend folder and seed the database. (only once after installation)
   ```sh
   node seeds/index.js
   ```
7. Go to backend folder and start backend server.
   ```sh
   node server.js
   ```
8. Open the application on local host port 3000.
   ```
   http://localhost:3000/
   ```

### Running Tests

1. Go to backend folder and run the following command.
   ```sh
   npm test
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- FEATURES -->

## Features

<details>
  <summary>Implemented</summary>
  <ol>
    <li> - [x] Display all users public grievances </li>
    <li> - [x] Display user's grievances </li>
    <li> - [x] Display user's assigned grievances </li>
    <li> - [x] Post Grievance </li>
    <li> - [x] View Grievance </li>
    <li> - [x] Comment on grievance </li>
    <li> - [x] Upvote / Downvote Grievance </li>
    <li> - [x] Update status of grievance </li>
    <li> - [x] Status Change Mail </li>
    <li> - [x] Escalate Grievance </li>
    <li> - [x] Automatic Escalation </li>
    <li>
      - [x] Escalation Mail
      <ul>
        <li> Manual </li>
        <li> Automatic </li>
      </ul>
    </li>
    <li> - [x] Delete Grievance </li>
    <li> - [x] Public and Private Grievances </li>
    <li> - [x] Handler Comments and Feedback </li>
    <li> - [x] Admin Page </li>
    <li> - [x] Modify Categories (Add / Edit / Delete) </li>
    <li> - [x] Modify Escalation Chains (Add / Edit / Delete) </li>
  </ol>
</details>

<details>
  <summary>In progress</summary>
  <ol>
    <li> - [ ] Google Authentication </li>
  </ol>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Team -->

## Team 17

[Ganatasala Naga Aneesh Ajaroy](https://github.com/AneeshAjaroy)

[Peddi Naga Hari Teja](https://github.com/pnhteja)

[Vemulapalli Aditya](https://github.com/AdityaVemulapalli)

[Nistala Praneeth](https://github.com/Praneeth-01)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
