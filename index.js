"use strict";

const mysql = require('mysql');

module.exports = myLog;

var db, table;

function myLog(details) {

    db = mysql.createConnection({
        host: details.host,
        user: details.user,
        password: details.password,
        database: details.database,
		ssl: details.ssl || null
    });


    table = details.table;

    db.connect((err) => {
        if (err) {
            throw err;
        } else {
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

function insert(lvl, msg, app) {
	db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('" + lvl + "', '" + msg + "', '" + (app || null) + "')", (err) => {
        if (err) {
            throw err;
        }
    });
}

myLog.prototype.info = (msg, app) => {
    insert('info', msg, app);
};

myLog.prototype.debug = (msg, app) => {
    insert('debug', msg, app);
};

myLog.prototype.warning = (msg, app) => {
    insert('warning', msg, app);
};

myLog.prototype.error = (msg, app) => {
    insert('error', msg, app);
};

myLog.prototype.get = (e, callback) => {
	console.log("SELECT * FROM `" + table + "`" + (e.app ? ' WHERE app = \'' + e.app + '\'' : '') + " ORDER BY `time` DESC" + (e.pagination ? ' LIMIT ' + e.pagination : '') + ";");
	db.query("SELECT * FROM `" + table + "`" + (e.app ? ' WHERE app = \'' + e.app + '\'' : '') + " ORDER BY `time` DESC" + (e.pagination ? ' LIMIT ' + e.pagination : '') + ";", (err, res) => {
        if (err) {
            throw err;
        }
		return callback(res);
    });
}
