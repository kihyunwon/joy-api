'use strict';

const uuid = require('uuid');
const dynamodb = require('./db');

module.exports.create = async (event, context) => {
  let _parsed;

  try {
    _parsed = JSON.parse(event.body);
  } catch (err) {
    console.error(`Could not parse requested JSON ${event.body}: ${err.stack}`);
    return {
      statusCode: 500,
      error: `Could not parse requested JSON: ${err.stack}`
    };
  }

  const { email, first_name, last_name } = _parsed;

  if (typeof email !== 'string' || typeof first_name !== 'string'
      || typeof last_name !== 'string') {
    console.error('Validation Failed');
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the User.',
    };
  }

  const timestamp = new Date().getTime();

  const params = {
    TableName: process.env.USER_TABLE,
    Item: {
      id: uuid.v1(),
      email: email,
      first_name,
      last_name,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    const data = await dynamoDb.put(params).promise();
    console.log(`Create new User data=${JSON.stringify(data)}`);
    return { statusCode: 200, body: JSON.stringify(params.Item) };
  } catch (error) {
    console.log(`Create new User ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not create new User: ${error.stack}`
    };
  }
};
