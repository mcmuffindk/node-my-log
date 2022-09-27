"use strict";

const mysql = require('mysql');

module.exports = myLog;

var db, table, database;

function myLog(details) {

    db = mysql.createConnection({
        host: details.host,
        user: details.user,
        password: details.password,
        database: details.database,
        ssl: details.ssl || null
    });


    table = details.table;
    database = details.database;

    db.connect((err) => {
        if (err) throw err;
    });
}

function createTable() {
    db.query("CREATE TABLE `" + database + "`.`" + table + "` ( `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT , `app` VARCHAR(255) NULL DEFAULT NULL , `level` VARCHAR(255) NOT NULL , `msg` VARCHAR(255) NOT NULL , `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;", (err) => {
        if (err) {
            throw err;
        }
    });
}

function insert(lvl, msg, app) {
    db.query("INSERT INTO `" + table + "` (level, msg, app) VALUES ('" + lvl + "', '" + msg + "', " + (app ? '\'app\'' : null) + ")", (err) => {
        if (err) {
            if (err.code == 'ER_NO_SUCH_TABLE') {
                createTable();
                insert(lvl, msg, app)
            } else {
                throw err;
            }
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
    db.query("SELECT * FROM `" + table + "`" + (e.app ? ' WHERE app = \'' + e.app + '\'' : '') + " ORDER BY `time` DESC" + (e.pagination ? ' LIMIT ' + e.pagination : '') + ";", (err, res) => {
        if (err) {
            throw err;
        }
        return callback(res);
    });
}
