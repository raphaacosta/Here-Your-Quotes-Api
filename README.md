<h1 align="center">
  Here Your Quotes - API
</h1>
<h4 align="center">
  Mobile App here -> <a source="https://github.com/raphaacosta/Here-Your-Quotes-Mobile">mobile</a>
</h4>

## 📌 Technologies

  - [Node.js](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Babel](https://babeljs.io/)
  - [Knex](http://knexjs.org/)

## 📚 About the project
  > I built this project to practice typescript and the process of building an API. The 'Here Your Quotes' is an application to help people storing quotes that they like or will need for articles or something.

## ⚙ Status codes

| Status   | Description           |
| ---      | ---                   |
| 200      | OK                    |
| 400      | BAD REQUEST           |
| 401      | UNAUTHORIZED          |
| 404      | NOT FOUND             |
| 500      | INTERNAL SERVER ERROR |

## 🚀 Getting Started

  Clone this repository:
```bash
  $ git clone https://github.com/raphaacosta/Here-Your-Quotes-Api.git
```
  Go to the directory and run:
```bash
  $ yarn install
  or
  $ npm install
```

  To install all dependencies, then run:
```bash
  $ npx knex migrate:latest --knexfile knexfile.ts migrate:latest
```
  to run the migrations to the databasse, then run: `$ yarn dev` or `$ npm dev` to run the API.

  ## 👍 Contribute

- Fork this repository.
- Create a branch with your resource: `git checkout -b my-feature`
- Submit changes: `git commit -m "feat: My new feature"`
- Push your branch: `git push origin my-feature`