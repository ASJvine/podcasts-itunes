# TOP 100 iTunes Podcasts
---------------
---------------

## Installation
---------------
  Go to the terminal

  install node: https://nodejs.org/en/

  To install all the depedencies, within the *podcasts* directory, run `npm install`

  Then you've few options:

**Development BUILD**
  - To run the *start* (webpack-dev-server + proxy-server (using concurrently)), run `npm start`


  OR

  
  - In one Tab:  run the *start1* (development build), run `npm run start1`
  - In another Tab:  run the *server* (development build), run `npm run server`


**Production BUILD**
  - Before running the production build, please run *prebuild*, run `npm run prebuild`
  - To run the *build* (production build), run `npm run build`
  - To run the *clean* (production build removed), run `npm run clean`

  The compiled source is in the build/ folder.

**Development tools LINTERS**
  - To run the *lint*, run `npm run lint`
  - To run the *lint:fix* (fix some eslint errors), run `npm run lint:fix`



## Author
---------------

* **Alexandre Serra Jaumot**
