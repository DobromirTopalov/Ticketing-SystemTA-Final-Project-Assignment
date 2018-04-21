'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Statuses", deps: []
 * createTable "Labels", deps: []
 * createTable "Roles", deps: []
 * createTable "Companies", deps: []
 * createTable "Users", deps: [Companies, Roles]
 * createTable "Notifications", deps: [Users]
 * createTable "Teams", deps: [Users, Companies]
 * createTable "Tickets", deps: [Teams, Statuses, Labels, Users, Users, Users]
 * createTable "Commentaries", deps: [Users, Tickets]
 * createTable "Logs", deps: [Users, Tickets]
 * createTable "TeamUser", deps: [Teams, Users]
 * createTable "TicketUser", deps: [Tickets, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2018-04-21T15:51:01.272Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Statuses",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Labels",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Roles",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Companies",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "companyImgUrl": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "sector": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "webpage": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "validate": {
                        "isEmail": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "avatarImgUrl": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "CompanyId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "RoleId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Roles",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Notifications",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "content": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "NotificationImgUrl": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "wasRead": {
                    "type": Sequelize.BOOLEAN,
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Teams",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "teamImgUrl": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "TeamLeaderId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "CompanyId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Companies",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Tickets",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "deadline": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "TeamId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Teams",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "StatusId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Statuses",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "LabelId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Labels",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "RequesterId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "AssigneeId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "EscalationContactId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Commentaries",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "content": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "date": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "TicketId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Tickets",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Logs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "changes": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "wasRead": {
                    "type": Sequelize.BOOLEAN,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "TicketId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Tickets",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "TeamUser",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "TeamId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Teams",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "TicketUser",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "TicketId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Tickets",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
