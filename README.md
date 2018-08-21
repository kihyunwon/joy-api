# Joy API

## Use-case

Test your service locally, without having to deploy it first.

## Setup

### Run service offline from one terminal

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate
```

## Usage

You can create, get, update, search, or delete users with the following commands:

### Create a User

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/users --data '{ "email": "test@joy.com", "first_name": "joy", "last_name": "ful" }'
```

Example Result:
```bash
{"email":"test@joy.com","first_name":"joy","last_name":"ful","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"updatedAt":1479138570824}
```

### List all Users

```bash
curl -H "Content-Type:application/json" http://localhost:3000/users
```

Example output:
```bash
[{"email":"test@joy.com","first_name":"joy","last_name":"ful","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"updatedAt":1479138570824}]
```

### Get one User

```bash
curl -H "Content-Type:application/json" http://localhost:3000/users/<id>
```

Example Result:
```bash
{"email":"test@joy.com","first_name":"joy","last_name":"ful","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"updatedAt":1479138570824}
```

### Update a User

```bash
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/users/<id> --data '{ "email": "change@joy.com" }'
```

Example Result:
```bash
{"email":"change@joy.com","first_name":"joy","last_name":"ful","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"updatedAt":1479138570824}
```

### Delete a User

```bash
curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/users/<id>
```
