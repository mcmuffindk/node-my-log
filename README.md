# node-my-log
[![npm version](https://img.shields.io/npm/v/node-my-log.svg)](https://www.npmjs.com/package/node-my-log)
[![Known Vulnerabilities](https://snyk.io/test/npm/node-my-log/badge.svg)](https://snyk.io/test/npm/node-my-log?tab=dependencies)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://www.npmjs.com/package/node-my-log)
[![npm downloads](https://img.shields.io/npm/dt/node-my-log.svg?style=flat)](https://www.npmjs.com/package/node-my-log)

**node-my-log** is a npm package used to make logging easier with the ability to store the log in MySQL

### Updates
If you are already using this package you can add `update: true` to the constructor to make the script update the database

### Installation
`npm install node-my-log`


### How to use
**node-my-log** is very easy to use. The only thing you need to do is to make a database for the package

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

It is possible to add the name of the app:

```
log.info('The name of this app is','node-my-log');
```
