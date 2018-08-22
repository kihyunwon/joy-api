'use strict';

const dynamodb = require('./db');

module.exports.search = async (event, context) => {
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

  let expr = [];
  let names = {};
  let values = {};
  const keys = ["email", "first_name", "last_name"];

  for (let key of keys) {
    if (key in _parsed && typeof _parsed[key] === 'string') {
      names["#" + key] = key;
      values[":" + key] = _parsed[key];
      expr.push("#" + key + " = :" + key);
    }  
  }

  expr = expr.join(" and ");

  const params = {
    TableName: process.env.USER_TABLE,
  };

  if (names.length > 0) {
    params.KeyConditionExpression = expr;
    params.ExpressionAttributeNames = names;
    params.ExpressionAttributeValues = values;
  }

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