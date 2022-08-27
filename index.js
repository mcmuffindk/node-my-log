"use strict";

const mysql = require('mysql');

module.exports = myLog;

var db, table;

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
// TODO: consider if DB call should be in own function to save bytes
myLog.prototype.info = (msg, app) => {
    db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('info', '" + msg + "', '" + (app || null) + "')", (err) => {
        if (err) {
            throw err;
        }
    });
};

myLog.prototype.debug = (msg, app) => {
    db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('debug', '" + msg + "', '" + (app || null) + "')", (err) => {
        if (err) {
            throw err;
        }
    });
};

myLog.prototype.warning = (msg, app) => {
    db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('warning', '" + msg + "', '" + (app || null) + "')", (err) => {
        if (err) {
            throw err;
        }
    });
};

myLog.prototype.error = (msg, app) => {
    db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('error', '" + msg + "', '" + (app || null) + "')", (err) => {
        if (err) {
            throw err;
        }
    });
};
