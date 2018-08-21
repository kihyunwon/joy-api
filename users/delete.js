'use strict';

const dynamodb = require('./db');

module.exports.delete = async (event, context) => {
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
  
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const data = await dynamoDb.delete(params).promise();
    console.log(`Delete User success`);
    return { statusCode: 200, body: JSON.stringify({}) };
  } catch (error) {
    console.log(`Get User ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not delete User with id ${event.pathParameters.id}: ${error.stack}`
    };
  }
};