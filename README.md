# Front End Developer Test

## Question 1

### Development

#### Backend

Running the server (without docker):

```
cd backend
npm ci
npm run start
```

#### Frontend

Running the server (without docker):

```
cd frontend
npm ci
npm run dev
```

Running tests:

```
npm run test
```

### Notes

1. The search field is built using React hooks and debouncing, following this [example](https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci).

2. The integration between Next.js and Redux was heavily inspired by this [article](https://dev.to/saltyshiomix/learn-the-redux-architecture-by-creating-the-minimal-todo-app-on-top-of-next-js-5bpj).
