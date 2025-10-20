
# Rick And Morty API Rest 

This proyect use the Rick and Morty's API to get Data and save in cache for better performance, also use graphql to simplify the requested data




## Features

- GraphQL architecture
- Search characters for property
- Caché system

## Tech Stack

- Express
- GraphQUI for UI as alternative to Apollo GraphQL (Deprecated)
- Redis
- Sequalize
- Docker


## ¿How to run the project?

Have already running MYSQL in your local machine, preferably use Xammp, also have installed docker, once you have all installed, please run the below command into the root folder:

```bash
  docker-compose up --build
```

¡The project is running now!

To Install the DB, you can import the databaseInstallation.sql into PHPMyAdmin

To Run the Insert script, you can run into the container app for NodeJS in Docker

```bash
  npm run insert
```

Great!, you have ready installed and running the project and now you can navigate To

```bash
  http://localhost:4000
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_NAME=blossomTest`

`DB_USER=root`

`DB_PASS=""`

`DB_HOST=localhost`

`# DB_DIALECT='mysql'`

`PORT=4000`


