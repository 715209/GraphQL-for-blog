export default {
    Query: {
        fields: {
            user: {
                where: (table, args) => `${table}.id = ${args.id}`
            },
             post: {
                where: (table, args) => `${table}.id = ${args.id}`
            }
        }
    },

    User: {
        sqlTable: "users",
        uniqueKey: "id",
        fields: {
            posts: {
                sqlColumn: "posts",
                sqlJoin: (userTable, postTable, args) => `${userTable}.id = ${postTable}.UserId`
            },
        }
    },

    Post: {
        sqlTable: "posts",
        uniqueKey: "id",
        fields: {
            author: {
                sqlColumn: "users",
                sqlJoin: (postTable, userTable, args) => `${postTable}.UserId = ${userTable}.id`
            },
        }
    },
}