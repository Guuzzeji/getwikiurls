const express = require('express')
const routes = express.Router()
const bodyphaser = require('body-parser')
let fetch = require('node-fetch')
const Joi = require('@hapi/joi')

routes.use(bodyphaser.json())
let schema = require('./json_schema')

// URL PATHS
// https://en.wikipedia.org/w/api.php?action=parse&page={item+search}&prop=externallinks&format=json
// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search={item+search}

//Clean parms for it to be use in fetch
function cleanup_input(type, item) {
    let new_input
    for (let x = 0; x < item.length; x++) {
        if (type == 'search') {
            new_input = item.replace(" ", `%20`)
            new_input = item.replace(" ' ", `%27`)
        } else {
            new_input = item.replace(' ', '+')
        }
    }
    return new_input
}

//routes
routes.post('/get-urls', async function(req, res){
    //console.log(req.body)
    try{
        const val = schema.validate(req.body)
        //console.log(val)

        if(val.error == undefined){
            let url_parm = cleanup_input('', req.body.parms)

            await fetch('https://en.wikipedia.org/w/api.php?action=parse&page='+ url_parm +'&prop=externallinks&format=json').then(function (res) {
                return res.json()
            }).then(function(data){
                //console.log(data.parse.externallinks)
                res.send(data.parse.externallinks)
            })
            .catch(function(err){
                //console.log(err)
                res.send({
                    error: true
                })
            }) 
        }else{
            //fail json validation
            res.send(val)
        }
    }catch{
        return
    }
})

routes.post('/get-other-terms', async function(req, res){
    try{
        const val = schema.validate(req.body)
        if(val.error == undefined){
            let url_parm = cleanup_input('search', req.body.parms)

            await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${url_parm}`).then(function (res) {
                return res.json()
            }).then(function (data) {
                //console.log(data[1])
                res.send(data[1])
            }).catch(function(err){
                //console.log(err)
                res.send({
                    error: true
                })
            })
        }else{
            //fail json validation
            res.send(val)
        }
    }catch{
        return
    }
})


module.exports = routes