# tinyhouse

![Node.js CI](https://github.com/marcusholmgren/tinyhouse/workflows/Node.js%20CI/badge.svg)

Fullstack React home sharing application, https://www.newline.co/tinyhouse

## Getting started

Install all dependencies with yarn or npm.
```cli
yarn install
```

### Configure your environment variables

Create a environment variable, `.env` file in the `\server` folder:

```env
PORT=9000
DB_USER=<username>
DB_USER_PASSWORD=<password>
DB_CLUSTER=<mongodb cluster>
```

After you have configured your variables you can seed with some mock data

```cli
yarn seed
```

### Run & build

Start the server with yarn.
```cli
yarn start
```

Create a production build with yarn.
```cli
yarn build
```

