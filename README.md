# Overview of project

Hello 👋,

Thanks for taking the time to this project.

The goal of this exercise is to demonstrate my backend skills in developing lean microservices in JavaScript (Node.js, ExpressJS, 3rd-party integration, and testing).

Using and Express.js I created a REST endpoint that talks to a relational database

## The Challenge

- API must allow two things and must return JSON:

  1. Allow users to request for available cleaners.
  2. Allow users to see the ratings of a cleaner.
  3. Allow users to rate a cleaner.
  4. Allow users to pay for a cleaner's service.
  
- The following must be behind HTTP Bearer Authentication. Use any credentials of your choice:

  1. Allow cleaners to see how much they've made in a day, month....
  2. Allow cleaners to task that needs to be completed.
  3. Allow cleaners to see list of completed task.

- Code must be tested using any framework

## Design Decisions and Thoughts

Below will be a list of design decisions and thoughts that I had while working on this project. I will also include some of the things that I would have liked to have done if I had more time.

### File Structure and Organization

I decided to use a file structure that is similar to what I have used in the past. I have a `prisma` folder that contains the `schema.prisma` file and a `seed.js` file. The `schema.prisma` file is used to define the database schema and the `seed.js` file is used to seed the database with some initial data. I also have a `src` folder that contains the `index.js` file. This file is used to start the server and define the routes. I have a `routes.js` file that is used to define the routes for the server. I also have a `package.json` file that is used to define the dependencies for the project.

```txt
.
├── prisma
│   ├── schema.prisma
│   └── seed.js
├── src
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── routes.js
└── yarn.lock
```

## Routes

I decided to define the routes in a separate file called `routes.js`. I have used this approach in the past and I find it to be a very clean and organized way to define the routes for the server. I used the `express.Router` to define the routes for the `User` and `Post` models. I used the `express.Router` to define the `GET`, `POST`, routes for themodels.

## Dependencies

Below will be a list of the dependencies that I used for this project.

- `express`: I used Express to create the server and define the routes.
- `prisma`: I used Prisma to define the database schema and relationships between models.
- `@prisma/client`: I used Prisma Client to interact with the database.
- `dotenv`: I used dotenv to load environment variables from a `.env` file.
- `nodemon`: I used nodemon to automatically restart the server when changes are made to the code.
- `jest`: I used jest to write and run tests for the project.
- `supertest`: I used supertest to test the server and routes.
- `sqlite3`: I used sqlite3 as the database for the project.
- `nodemon`: I used nodemon to automatically restart the server when changes are made to the code.

## Testing

- I used Jest to write and run tests for the project.
- I used supertest to test the server and routes.
- I used Postman to manually test the server and routes. The test collection can be found in the tests folder.

## Database Schema

I decided to use Prisma to define the database schema. I have chosen Prisma because it is an ORM and makes it easy to define the database schema and relationships between models. I used Prisma to define the `User`, `Booking`, `Rating`, `Tasks`, `Payments` and `Cleaners` models. I also used Prisma to define the relationships between the models.  I used Prisma to define the relationship between the `User` and `Booking` models with a `User` having many `Bookings` and a `Bookings` belonging to a `User`. A similar workflow was created for the `Rating`, `Payments`, `Tasks` and `Cleaners` models.

Below are a list of Pro's and Con's of using Prisma and SQLite3.

| Pro's | Con's |
| ----- | ----- |
| Prisma makes it easy to define the database schema and relationships between models. | Prisma has a learning curve and can be difficult to get started with. |
| Prisma makes it easy to interact with the database using Prisma Client. | Prisma does not support all databases and is limited to a few databases. (but the most commonly used ones are available) |
| Prisma makes it easy to define the database schema using Prisma Migrate. | Prisma.validator can be very difficult to use on its own and is best combined with form input validation  |

## How To Run

Below will be a list of the steps to run the project.

1. Run `npm install` to install the dependencies for the project.
2. Run `npm run init` or `npx prisma migrate dev --name init` to create the database and run the migrations.
3. Run (optional, database will seed with previous command) `npx prisma db seed` to seed the database with some initial data.
4. Run `npm start` to start the server.

Should you have any issues, please feel free to reach out to me. I will be happy to help or to create a video call to walk you through the process.

## Assumptions

Below will be a list of the assumptions that I made while working on this project.

- Allow users to request for available cleaners, means returning all the bookings a cleaner has, and the user requests for an unbooked time slot.
- Allow users to see the ratings of a cleaner, means returning the average rating of a cleaner by their ID.
- Cleaners can see open and closed tasks based on their cleaner ID.
- Payments only pay for a booking and do not pay a cleaner directly. Thus in a real-world scenario, the cleaner would be paid by the company and the company would be paid by the user.
- Date ranges are obtained via the body of the get request and can be used to select multiple ranges based on the cleaners ID. The sum operation is not applied and funds are listed for each booking, but this is easy to implement, similar to the Rating Aggregate which uses the `avg` to provide a rating.

## Functionality

- [X] Allow users to request for available cleaners.
- [X] Allow users to see the ratings of a cleaner.
- [X] Allow users to rate a cleaner.
- [X] Allow users to pay for a cleaner's service.
- [X] Allow cleaners to see how much they've made in a day, month....
- [X] Allow cleaners to task that needs to be completed.
- [X] Allow cleaners to see list of completed task.

## Things I Would Have Liked to Have Done

Below will be a list of the things that I would have liked to have done:

- More extensive testing, as all tests are passing on Postman, but more edge cases could be tested. The Jest based tests have had to be deleted due to time constraints and a refactored database.
- More input validation, as the current input validation is minimal and does not use REGEX.
- More JWT authentication, the token can be used in a more extensive way to provide more security.
