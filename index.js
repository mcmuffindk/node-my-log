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
			if (details.update) {

				db.query("SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '" + details.database + "' AND TABLE_NAME = '" + table + "' AND COLUMN_NAME = 'app'", (err, result) => {
					if (err) {
						throw err;
					} else if (result.length < 1) {
						db.query("ALTER TABLE `" + table + "` ADD COLUMN `app` VARCHAR(255) NOT NULL AFTER `id`", (err) => {
							if (err) {
								throw err;
							}
						});
					}
				});
			}

			db.query("SHOW TABLES LIKE '" + table + "'", (err, result) => {
				if (err) {
					throw err;
				} else {
					if (result.length === 0) {
						db.query("CREATE TABLE `" + details.database + "`.`" + table + "` ( `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT , `app` VARCHAR(255) NOT NULL , `level` VARCHAR(255) NOT NULL , `msg` VARCHAR(255) NOT NULL , `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;", (err) => {
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


myLog.prototype.info = (msg, app) => {
	setTimeout(() => {
		if (!app) {
			app = null;
		}
		db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('info', '" + msg + "', '" + app + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};

myLog.prototype.debug = (msg, app) => {
	setTimeout(() => {
		if (!app) {
			app = null;
		}
		db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('debug', '" + msg + "', '" + app + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};

myLog.prototype.warning = (msg, app) => {
	setTimeout(() => {
		if (!app) {
			app = null;
		}
		db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('warning', '" + msg + ", '" + app + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};

myLog.prototype.error = (msg, app) => {
	setTimeout(() => {
		if (!app) {
			app = null;
		}
		db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('error', '" + msg + "', '" + app + "')", (err) => {
			if (err) {
				throw err;
			}
		});
	}, 150);
};
