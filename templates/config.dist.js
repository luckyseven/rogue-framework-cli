module.exports = {
    main: {
        port    : 4000,
        debug   : false
    },
    routes: {
        '/api/v1' : 'default'
    },
    modules : {
        logger: {
            enabled: true,
            format: 'dev',
            filename: 'access.log',
            interval: '1d'
        },
        mongoose: {
            enabled      : false,    // Switch to false if you don't use MongoDB for this project
            host         : 'localhost',
            db_name      : 'rogue_sample',
            credentials  : false
            /* If your MongoDB server uses credentials you can specify them this way:
             credentials         : { username: 'your_username', password: 'your_password' }
             */
        }
    }
    /* You can add here any custom parameter. */
};
