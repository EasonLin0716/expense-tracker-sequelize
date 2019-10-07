# Expense-Tracker-Sequelize
Expense-Tracker-Sequelize (老爸的私房錢)

A expense tracker for daddys to record their private or secret expenses.

## Features
1. You can create your own account
2. You can create, edit and delete your expenses
3. Use filter button to see your different kind of expenses

## Preview
![Cover](https://github.com/EasonLin0716/expense-tracker-sequelize/blob/master/public/img/Cover.JPG)


## Environment set up
1. Node.js
2. MySQL

## Install me now!
1. Open your terminal and enter: 

```
   https://github.com/EasonLin0716/expense-tracker-sequelize.git
```

2. Register your own secret key at Facebook and Google:
   
   https://developers.facebook.com/ 

3. create a file named `.env` at `\expense-tracker-sequelize` , get your secret keys and paste the following code: 

```
   FACEBOOK_ID = <Your FB ID>
   FACEBOOK_SECRET = <Your FB SECRET>
```

4. Back to the terminal, and enter:

```
   npm install
```

5. cd back to the root, enter `npm run dev` and see it on http://localhost:3000/ 

## Dependencies
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "express-session": "^1.16.2",
    "method-override": "^3.0.0",
    "mysql2": "^1.7.0",
    "sequelize": "^5.19.2",
    "sequelize-cli": "^5.5.1",
    "passport": "^0.4.0",
    "passport-facebook": "^3.0.0",
    "passport-local": "^1.0.0"
