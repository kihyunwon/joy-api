'use strict';

const dynamodb = require('./db');

// TODO: add conditional params
module.exports.search = async (event, context) => {
  const params = {
    TableName: process.env.USER_TABLE,
  };

  try {
    const data = await dynamoDb.query(params).promise();
    console.log(`Search User data=${JSON.stringify(data.Items)}`);
    return { statusCode: 200, body: JSON.stringify(data.Items) };
  } catch (error) {
    console.log(`Search User ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not search Users: ${error.stack}`
    };
  }
};