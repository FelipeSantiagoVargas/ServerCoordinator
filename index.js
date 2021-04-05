const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors')

let hours, minutes, seconds = 0;
let dateServer;
let servers = [];
let adjustment = [];

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname,'public')))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//start server
const server = app.listen(app.get('port'),()=>{
    setTimeServer()
    statusTime()
    console.log('Server on port', app.get('port'));
})

app.post('/register',(req,res)=>{
    req.body.ip = req.ip.split(':')[3]
    let aux = false;
    if(servers.length>0){
        aux = servers.find((element) => {
            if((element.port==req.body.port) && (element.id == req.body.id)){
                return true;
            }else{
                return false;
            }
        })
    }

    if(aux){
        return res.json({message:'Este Servidor ya esta registrado'});
    }else{
        servers.push(req.body)
                console.log(servers)
        return res.json({message:'Servidor agregado con exito'});
    }
})

function statusTime(){
    setInterval(async () => {
        adjustment = []
        await servers.forEach(element => {
            axios.post(`http://${element.ip}:${element.port}/currentTime`,{
                date: dateServer
            }).then(function (response) {
                let aux = {
                    server:element,
                    dif:response.data.difference
                }
                adjustment.push(aux)
              })
              .catch(function (error) {
                // handle error
                console.log("Fallo aca");
              })
        })
        setTimeout(() => {
            berkeley()
        }, 1000);
    }, 30000);
}


function setTimeServer(){
    setInterval(()=>{
        axios.get('http://worldtimeapi.org/api/timezone/America/Bogota')
    .then(function (response) {
        dateServer = new Date(response.data.utc_datetime);
        // console.log("Aqui funciono");
      }).catch(function (error) {
        // handle error
        // console.log("Aqui fallo");
      })
    },1000)
    
}

function berkeley(){
    let aux = 0;
    adjustment.forEach(element => {
        console.log("foreach"+element.dif)
        aux = aux+element.dif;
    });
    aux = aux/(adjustment.length+1);
    console.log("aux"+aux)

    adjustment.forEach(element => {
        console.log(((element.dif*-1)+(aux)))
        axios.post(`http://${element.server.ip}:${element.server.port}/adjust`,{
            data: ((element.dif*-1)+(aux))
        }).then(function (response) {
            console.log(response.data.message);
          })
          .catch(function (error) {
            console.log(error);
          })
    });
}

function sendTime(){
    return dateServer;
}

app.get('/date',(req,res)=>{
    res.json({date:dateServer})
})

