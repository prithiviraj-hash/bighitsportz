const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const port = 4000;
const schema = require('../schemas/schema');

app.use('/graphql', graphqlHTTP ({
    schema,
    graphiql: true,
    customFormatErrorFn: (error) => ({
        message: error.message
    })
}));


app.listen(port,()=>{console.log(`Server Running On Port ${port}`)});

module.exports = app;
