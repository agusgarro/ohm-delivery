const shortid = require('shortid')
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Utils = require('./utils');
const utils = require ('./utils');
const {updateOhm} = require ('./utils');
app.use(bodyParser.json())

    function serve() { 
        //to see if the get method is working
       app.get ('/', function (req,res){
           res.send ('Hello from server')
       })
   
       //find ohm
       app.get('/ohms/:trackingId', (req, res, next) => {
           const ohm =  Utils.getOhmByTrackingId(req.params.trackingId)
           .then ( ohm => {
               if ( !ohm ) {
                 console.log('ohm not found');
                 return res.status(404);
               } else {
                 return res.status(200).json(ohm);
                 
               }
             })
             .catch(err => {
               return res.status(500).json({error: 'There was a problem and soon will be fixed. Thank you for your patience'});
             })
         });
   
        //update ohm status
         
       app.put('/ohms/:trackingId/status', (req, res, next) => {
               const ohm = Utils.getOhmByTrackingId(req.params.trackingId)
               .then (ohm => {
               if (utils.letStatusChange(ohm.status, req.body.ohm.status)) {
                   const historyUpdated = [...req.body.ohm.history, {state: req.body.ohm.status, at: Date.now()}]
                   Utils.updateOhm(req.params.trackingId, {...req.body.ohm, history: historyUpdated})
                   return res.send (true)
               } else {
                   console.log('ups, invalid transition');
                   return res.status(404);
                   
               }
           })
            .catch (err => {
               return res.status(500).json({ error: 'error updating ohm'});
           })
       });

    app.listen(3000, () => console.log('listening on port 3000'));
}

serve();