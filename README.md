# Gestion_Absence_ExpressJs_Api

## Overview

Welcome to the `Gestion_Absence_ExpressJs_Api` repository! This is a simple project that focuses on building an API using Express.js for the purpose of managing absences.

## Features

- **Absence Management**: Easily create, read, update, and delete absence records.
- **User Authentication**: Secure your API with user authentication to control access.
- **Express.js Framework**: Utilizes the popular and robust Express.js framework for building the API.
- **RESTful Endpoints**: Follows RESTful design principles for clear and efficient communication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bydevmar/Gestion_Absence_ExpressJs_Api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Gestion_Absence_ExpressJs_Api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   The following libraries are used and installed as dependencies:

   - `body-parser`: ^1.19.0
   - `cors`: ^2.8.5
   - `express`: ^4.17.1
   - `joi`: ^17.4.0
   - `joi-objectid`: ^3.0.1
   - `lodash`: ^4.17.21
   - `mongoose`: ^5.12.10
   - `mongoose-delete`: ^0.5.3
   - `nodemon`: ^2.0.7

4. Set up your database configuration in the appropriate configuration file.

5. Run the application:

   ```bash
   npm start
   ```

   The API will be accessible at `http://localhost:3000` by default.

## API Endpoints

### Affectations

- `GET /affectations`: Retrieve a list of all affectations.
- `GET /affectations/:id`: Retrieve details of a specific affectation.
- `POST /affectations`: Create a new affectation.
- `PUT /affectations/:id`: Update an existing affectation.
- `DELETE /affectations/:id`: Delete a specific affectation.

### Utilisateurs

- `GET /utilisateurs`: Get a list of all utilisateurs.
- `GET /utilisateurs/:id`: Get details of a specific utilisateur.
- `POST /utilisateurs`: Create a new utilisateur.
- `PUT /utilisateurs/:id`: Update an existing utilisateur.
- `DELETE /utilisateurs/:id`: Delete a specific utilisateur.

### Formateurs

- `GET /formateurs`: Get a list of all formateurs.
- `GET /formateurs/:id`: Get details of a specific formateur.

### Absences

- `GET /absences`: Retrieve a list of all absences.
- `GET /absences/:id`: Retrieve details of a specific absence.
- `POST /absences`: Create a new absence.
- `PUT /absences/:id`: Update an existing absence.
- `DELETE /absences/:id`: Delete a specific absence.

### Filiers

- `GET /filiers`: Get a list of all filiers.
- `GET /filiers/:id`: Get details of a specific filier.
- `POST /filiers`: Create a new filier.
- `PUT /filiers/:id`: Update an existing filier.
- `DELETE /filiers/:id`: Delete a specific filier.

### Groupes

- `GET /groupes`: Get a list of all groupes.
- `GET /groupes/:id`: Get details of a specific groupe.
- `POST /groupes`: Create a new groupe.
- `PUT /groupes/:id`: Update an existing groupe.
- `DELETE /groupes/:id`: Delete a specific groupe.

### Niveaux

- `GET /niveaux`: Get a list of all niveaux.
- `GET /niveaux/:id`: Get details of a specific niveau.
- `POST /niveaux`: Create a new niveau.
- `PUT /niveaux/:id`: Update an existing niveau.
- `DELETE /niveaux/:id`: Delete a specific niveau.

### Stagiaires

- `GET /stagiaires`: Get a list of all stagiaires.
- `GET /stagiaires/:id`: Get details of a specific stagiaire.
- `POST /stagiaires`: Create a new stagiaire.
- `PUT /stagiaires/:id`: Update an existing stagiaire.
- `DELETE /stagiaires/:id`: Delete a specific stagiaire.



## Contact

For any questions or feedback, feel free to contact the project maintainers:

- Your Name: BOUHLALI Abdelfattah 
- Your Email: bouhlali99abdelfattah@gmail.com

Thank you for using and contributing to `Gestion_Absence_ExpressJs_Api`! Happy coding!
