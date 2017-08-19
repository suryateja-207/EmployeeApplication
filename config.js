module.exports = {
    MONGO:{
        CONNECT_URL:process.env.MONGO_URL?process.env.MONGO_URL:"mongodb://localhost/acubtech",
        OPTIONS: {
            server: { reconnectTries: 9999, reconnectInterval: 4000 }
        }
    },
    ENV:{
        PORT:3002,
        IP:"localhost"
    }
};