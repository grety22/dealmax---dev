import React, { Component } from 'react';
// Apollo Client
import ApolloClient from 'apollo-boost';
// Apollo Provider is to allows react works with apollo
import {ApolloProvider} from 'react-apollo';
// Components
import DealList from './components/dealList';
import AddDeal from './components/addDeal';


// apollo client setup
const client = new ApolloClient({
  // the endpoint that we are gonna be making requests, handling all our request to graphql
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>DealMax - Dashboard</h1>
          <DealList/>
          <AddDeal/>
        </div>
      </ApolloProvider>  
    );
  }
}

export default App;
