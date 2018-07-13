const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// we are gonna use mongoose to connect with the db
const mongoose = require('mongoose');
// cors to allow cross-origin requests
const cors = require('cors');

const app = express();

// cors middleware
app.use(cors());

// connect with mlab db
mongoose.connect('mongodb://admin:DealMax2018@ds131551.mlab.com:31551/dealmax_db',{ useNewUrlParser: true });
mongoose.connection.once('open',()=>{
    console.log('connected to DealMax database');
})

// middleware 
// Just one endpoint for graphql
app.use('/graphql',graphqlHTTP({
    schema,
    // graphiql is a testing tool, the line below activate that tool
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Dealmax server running on port 4000')
});