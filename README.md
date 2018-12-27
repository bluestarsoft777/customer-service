# Customer service app

As a Sales representative I need to see a list of all customers with status Hot from the customer service.

## Setup

Start app steps:

### Step 1 - Clone repo

```sh
git clone git@github.com:davorbadrov/customer-service.git
cd customer-service
```


### Step 2 - Setup Auth0

Register single page app in Auth0 and use data to fill the .env variables below.
Add a role check described below in step 5

### Step 3 - Setup .env files

Create `client/.env` file with the following info:

```sh
REACT_APP_URL=http://localhost:3000
REACT_APP_AUTH_DOMAIN=auth0_domain
REACT_APP_AUTH_CLIENT_ID=auth0_client_id
REACT_APP_AUTH_REDIRECT_URI=http://localhost:3000/callback
```

Create `client/cypress.env.json` file with the following info:

```json
{
  "auth0Domain": "auth0_domain",
  "auth0ClientId": "auth0_client_id",
  "auth0RedirectUri": "http://localhost:3000/callback",
  "auth0SalesRepresentativeEmail": "register_sales_representative_domain_user_email",
  "auth0SalesRepresentativePassword": "register_sales_representative_domain_password",
  "auth0BasicUserEmail": "register_non_sales_representative_user_email",
  "auth0BasicUserPassword": "register_non_sales_representative_user_password"
}
```

Create `server/.env` file with the following info:

```sh
NODE_PATH = src
NODE_ENV = development
PORT = 3001
SECRET = this_is_a_super_secret
JWT_SECRET = this_is_a_jwt_secret
DB_CLIENT = sqlite3
```

### Step 4 - install deps, then start client & server apps

Client

```sh
cd client && npm i
npm run start
```

Server

```sh
cd server && npm i
npm run db:migrate
npm run db:load
npm run start:dev
```

### Step 5 - Setup Auth0 role check

Add a rule in Auth0 service

```js
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};

  const addRolesToUser = function(user) {
    // add a check to see wether user is sales representative or not
    const isSalesRepresentative = user.email.includes('@someemail.com')
    if (isSalesRepresentative) {
      return ['sales-representative'];
    } else {
      return ['basic'];
    }
  };

  const roles = addRolesToUser(user);

  user.app_metadata.roles = roles;
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function() {
      context.idToken['https://customer-service.com/roles'] = user.app_metadata.roles;
      callback(null, user, context);
    })
    .catch(function (err) {
      callback(err);
    });
}
```

## Tests

There are a few Unit and E2E tests.

### E2E

E2E tests can be run in `client/` with `npm run e2e` in a headless browser.
Or to see what's going on you can use `npm run e2e:show`.

### Unit tests

Unit tests can be run in `server/` with `npm run test`.
