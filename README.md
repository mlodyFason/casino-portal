# Casino Portal
App created as assignment Javascript test.
## Getting Started
### Requirements
```bash 
Node v18.17.0
```
To run the development server:

```bash
You should have a file .env.local with the same variables as in .env.example in your root folder
This file should be already in your project - intentionally for assignment test goals

In the root folder run:
npm install
npm run dev
npm run server (in separate terminal - it will run the API mock)
# if you use yarn / pnpm / bun - adjust command executions
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Login credentials:
```bash
username: rebecka
password: secret

username: eric
password: dad

username: stoffe
password: rock
```

To run production server:
```bash
npm run build
npm run start
``` 

## Screenshots
<img width="1111" alt="image" src="https://github.com/mlodyFason/casino-portal/assets/153199383/bc14f37a-7242-42ed-9daa-dea3645ad4d6">
<img width="468" alt="image" src="https://github.com/mlodyFason/casino-portal/assets/153199383/c2533668-0e9b-4168-9c0d-28c9910fdfe7">

### Bundle size and routes

<img width="476" alt="image" src="https://github.com/mlodyFason/casino-portal/assets/153199383/d9c12e93-c5d7-4158-a22f-a599dffe7586">

### Lighthouse score
Lighthouse score should only be measured in production mode as subsequent builds are created using a different approach (development server vs production server).

<img width="725" alt="image" src="https://github.com/mlodyFason/casino-portal/assets/153199383/09440351-a2fc-4081-a123-868240cab1fa">


### Possible improvement changes
Ideas to enchance the current app:
- implement next-auth for authentication
- implement kind of react-toastify to improve UX
- implement internationalization
- implement unit tests


