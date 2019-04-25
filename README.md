# dailydrinks
A drinks order web.

## Setup the develop environment
### 1. Clone the repository
```bash
$ git clone git@github.com:kelp404/dailydrinks.git
$ cd dailydrinks
$ npm install
```
### 2. Run the develop server
```bash
$ npm start
# then go to http://localhost:8000
```

## Features
+ Supports RWD.
+ Easy to integrate with backend server.  
  This app use [mock server](/src/mock-server.js). Just remove the mock server. It will send real HTTP requests.
+ Use my project [capybara-router](https://github.com/kelp404/capybara-router) to define routs.  
  I implemented loading effect to all pages. When this app work with backend server, the HTTP request needs process time.  
  I also defined the error page for HTTP request failed.  
  I found some issues about router. I will refactor capybara router avoid circular reference issue.
+ Use [why-did-you-update](https://github.com/maicki/why-did-you-update) to find performance issues.  
  There are some issue about [informed](https://github.com/joepuzzo/informed). I need more time to fix that.
+ Use [informed](https://github.com/joepuzzo/informed) to do form validations.
+ This app is without [redux](https://github.com/reduxjs/redux).  
  I think redux takes too much time to build actions and reducers.

## Live demo
[https://kelp404.github.io/dailydrinks](https://kelp404.github.io/dailydrinks)
