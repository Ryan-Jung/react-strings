// Handles endpoints at messages/*

const routes = require('express').Router();
const db = require('../db');

// TODO: use logger to handle logging during 500

/* 
    Retrieves all the messages stored in the database. 
    Optional time parameter can be specified to retrieve
    messages after the specified time.

    Example:    GET   api/messages 
                OR
                GET   api/messages?time=2018-08-05T22:27:43
    Query String:
        time: "YYYY-MM-DDTHH:MM:SS" Date format. OPTIONAL.
        
    Responses:
        200 - If request succeeded.
        400 - If bad time format.
        500 - If there are issues retrieving data

*/
routes.get('/messages', (request, response) => {
  let { time } = request.query;

  time = time || '1970-01-01T00:00:00';
  const dateTime = new Date(time);
  const validDate =
    dateTime instanceof Date && !Number.isNaN(dateTime.valueOf());
  if (validDate) {
    const formattedDate = dateTime
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..*$/g, '');

    db('messages')
      .whereRaw('created_at >= ?', formattedDate)
      .select('message')
      .then(results => {
        response.json(results);
      })
      .catch(() => {
        response.sendStatus(500);
      });
  } else {
    response.sendStatus(400);
  }
});

/* 
    Receives a request with the message to be inputted to stored in the database

    Example:
        {
            "message": "This is an example"
        }
        
    Parameters: 
        message: The message to store. REQUIRED 
        
    Responses:
        200 - If request succeeded.
        400 - If request is missing message.
        500 - If message was unable to be stored. 

*/
routes.post('/messages', (request, response) => {
  const { message } = request.body;
  if (message) {
    db('messages')
      .insert({ message })
      .then(() => {
        response.sendStatus(200);
      })
      .catch(() => {
        response.sendStatus(500);
      });
  } else {
    response.sendStatus(400);
  }
});

module.exports = routes;
