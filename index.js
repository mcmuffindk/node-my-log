"use strict";

const mysql = require('mysql');

module.exports = myLog;

var db;
var table;

function myLog(details) {

	db = mysql.createConnection({
		host: details.host,
		user: details.user,
		password: details.password,
		database: details.database
	});

	table = details.table;

	db.connect((err) => {
		if (err) {
			throw err;
		} else {
			db.query("SHOW TABLES LIKE '" + details.table + "'", (err, result) => {
				if (err) {
					throw err;
				} else {
					if (result.length === 0) {
						db.query("CREATE TABLE `" + details.database + "`.`" + details.table + "` ( `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT , `level` VARCHAR(255) NOT NULL , `msg` VARCHAR(255) NOT NULL , `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;", (err) => {
							if (err) {
								throw err;
							}
						});
					}
				}
			});
		}
	});
}


myLog.prototype.info = (msg) => {
	setTimeout(() => {
		db.query("INSERT INTO `" + table + "` (level, msg) VALUES ('info', '" + msg + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};

myLog.prototype.debug = (msg) => {
	setTimeout(() => {
		db.query("INSERT INTO `" + table + "` (level, msg) VALUES ('debug', '" + msg + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};

myLog.prototype.warning = (msg) => {
	setTimeout(() => {
		db.query("INSERT INTO `" + table + "` (level, msg) VALUES ('warning', '" + msg + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};

myLog.prototype.error = (msg) => {
	setTimeout(() => {
		db.query("INSERT INTO `" + table + "` (level, msg) VALUES ('error', '" + msg + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};
