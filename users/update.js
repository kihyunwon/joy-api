'use strict';

const dynamodb = require('./db');

module.exports.update = async (event, context) => {
  if (!("pathParameters" in event) || !(event.pathParameters)) {
    return {
      statusCode: 404,
      error: `No pathParameters`
    };
  }

  if (!(event.pathParameters.id)) {
    return {
      statusCode: 404,
      error: `No user id in Query String: ${JSON.stringify(event.pathParameters)}`
    };
  }

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
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':email': email,
      ':first_name': first_name,
      ':last_name': last_name,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET email = :email, first_name = :first_name, last_name = :last_name, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  try {
    const data = await dynamoDb.update(params).promise();
    console.log(`Update User data=${JSON.stringify(data)}`);
    return { statusCode: 200, body: JSON.stringify(params.Item) };
  } catch (error) {
    console.log(`Update User ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not update existing User with id ${event.pathParameters.id}: ${error.stack}`
    };
  }
};
