# node-my-log
[![npm version](https://badge.fury.io/js/node-my-log.svg)](https://www.npmjs.com/package/node-my-log)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://www.npmjs.com/package/node-my-log)

**node-my-log** is a npm package used to make logging easier with the ability to store the log in MySQL


### Installation
`npm install node-my-log`


### How to use
**node-my-log** is very easy to use. The only thing you need to do is to make a database for the package.

**_Do NOT make the table your self as the package will do it on it's own!_**

#### Constructor
- `host` The hostname of your MySQL database
- `user` The MySQL username
- `password` The password for the user
- `database` The database you want the log table to be in
- `table` The name of the table

```
const myLog = require('node-my-log');

const log = new myLog({
	host: 'localhost',
	user: 'logging',
	password: 'verySecurePassword',
	database: 'logging',
	table: 'my-log'
});

```

#### Logging

At this moment there are four ways of logging: `.info`, `.debug`, `.warning` and `.error`

```
log.error('This an error description');
```
