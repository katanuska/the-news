# The News

This is the sample full stack app for displaying news fetched from [News API](https://newsapi.org/docs/endpoints/top-headlines). Application is implemented in React, Sass and Node.js

To create user you need to signup and verify email addres. In development mode verification email is generated and can be accessed via url printed in server console log.

Only artices from known sources and with all available informations are displayed in the application.

Anybody can read articles, but only authenticated user can bookmark them.

## Run application

To run application in development mode you need to set environment variables, then start server and client

```bash
npm install --prefix ./server
npm install --prefix ./client
npm install
npm start
```

## API documentation

### Authentication

- `POST /auth/signup`

Example request body:

```json
{
  "email": "test@email.com",
  "password": "complex pasword",
  "firstName": "Test",
  "lastName": "User"
}
```

Example response:

```json
{
  "email": "test@email.com",
  "firstName": "Test",
  "lastName": "User"
}
```

- `POST /auth/signin`

Example request body:

```json
{
  "email": "test@email.com",
  "password": "complex pasword"
}
```

Example response:

```json
{
  "email": "test@email.com",
  "firstName": "Test",
  "lastName": "User"
}
```

- `GET /auth/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### Articles

- `GET /articles?category=general&search=query`

Request paraemters:

**category**: Optional parameter. Comma-seperated string of identifiers for the news sources or blogs you want headlines from. Possible options: `business`, `entertainment`, `general`, `health`, `science`, `sports`, `technology`

**search**: Optional parameter. Keywords or a phrase to search for.

Example response:

```json
[
  {
    "url": "https://www.washingtonpost.com/politics/2024/11/26/trump-transition-agreement-ethics-pledge-security-clearances/",
    "sourceId": "the-washington-post",
    "author": "Lisa Rein, Isaac Arnsdorf",
    "publishedAt": "2024-11-27T04:25:14Z",
    "title": "Trump signs transition agreement with Biden, but it lacks key guardrails - The Washington Post",
    "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HSXNYXTXE2OCNQU4JALWZB3BDQ_size-normalized.jpg&w=1440",
    "category": "general"
  },
  {
    "url": "https://www.aljazeera.com/economy/2024/11/27/us-stock-market-surges-to-record-high-despite-trumps-tariff-threats",
    "sourceId": "al-jazeera-english",
    "author": "Al Jazeera",
    "publishedAt": "2024-11-27T02:27:50Z",
    "title": "US stock market surges to record high despite Trump’s tariff threats - Al Jazeera English",
    "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/11/AP24331473820936-1732670768.jpg?resize=1920%2C1440",
    "category": "general"
  }
]
```

### Favorites

Only authenticated users can access these APIs.

- `GET /favorites`
- `POST /favorites`

Example body:

```json
{
  "url": "https://www.aljazeera.com/economy/2024/11/27/us-stock-market-surges-to-record-high-despite-trumps-tariff-threats",
  "sourceId": "al-jazeera-english",
  "author": "Al Jazeera",
  "publishedAt": "2024-11-27T02:27:50Z",
  "title": "US stock market surges to record high despite Trump’s tariff threats - Al Jazeera English",
  "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2024/11/AP24331473820936-1732670768.jpg?resize=1920%2C1440",
  "category": "general"
}
```

- `DELETE /favorites`

Example body:

```json
{
  "url": "https://www.aljazeera.com/economy/2024/11/27/us-stock-market-surges-to-record-high-despite-trumps-tariff-threats"
}
```

## Server environment variables:

- **NODE_ENV:** Current environment - development or production - default is development
- **APP_URL:** This application URL. Used for user verification link.
- **JWT_SECRET:** Secret for generating JWT token.
- **JWT_EXPIRES_IN:** Expressed in string describing a time span vercel Eg: "2 days", "10h", "7d"
- **EMAIL_HOST:** Email hostname or IP address to connect to - in development mode default is 'smtp.ethereal.email'
- **EMAIL_PORT:** Email port to connect to - default is 587
- **EMAIL_USER:** User used for mail provider authentication - auto generated in development mode
- **EMAIL_PASS:** Password used for mail provider authentication - auto generated in development mode

## Functionalities that are not implemented

- Fetching articles should be done with better api. News API Latest news is returnin only few articles from known source.
- Fetch latest news, and implement infinite scroll for latest news
- Support mobile view
