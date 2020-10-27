let express = require('express');
let bp = require('body-parser');
let jsonParser = bp.json();

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let {UserList} = require('./model');

let app = express();

app.use(express.static('public'));


//Aquí van los end points

app.post("/registerWorkplace",jsonParser,(req,res) => {
    let { name,jobTitle,jobDescription,startDate, endDate} = req.body;

    let newUser = {name,jobTitle,jobDescription,startDate, endDate};

    UserList.register(newUser)
    .then (
        user => {
            return res.status(201).json(user);
        
        }

    ) .catch(
        error => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status(500).json({
                message: "Something went wrong with the DB",
                status: 500
            })
        }
    )


})


app.get("/getWorkplace/:name",jsonParser,(req,res) => {
    UserList.get()
    .then (
        user => {
            return res.status(200).json(user);
        
        }

    ) .catch(
        error => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status(500).json({
                message: "Something went wrong with the DB",
                status: 500
            })
        }
    )


})


let server;

function runServer(port, databaseUrl) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, response => {
            if (response) {
                return reject(response);
            }
            else {
                server = app.listen(port, () => {
                    console.log("App is running on port " + port);
                    resolve();
                })
                    .on('error', err => {
                        mongoose.disconnect();
                        return reject(err);
                    })
            }
        });
    });
}

function closeServer() {
    return mongoose.disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log('Closing the server');
                server.close(err => {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
}

runServer(3000, "mongodb://localhost/mydb")
    .catch(err => {
        console.log(err);
    });

module.exports = { app, runServer, closeServer };