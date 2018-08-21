'use strict';

const dynamodb = require('./db');

module.exports.get = async (event, context) => {
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
    const data = await dynamoDb.get(params).promise();
    console.log(`Get User data=${JSON.stringify(data.Items)}`);
    return { statusCode: 200, body: JSON.stringify(data.Items) };
  } catch (error) {
    console.log(`Get User ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not query User with id ${event.pathParameters.id}: ${error.stack}`
    };
  }
};
