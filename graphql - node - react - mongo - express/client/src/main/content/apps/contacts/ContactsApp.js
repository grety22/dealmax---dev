import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import ContactsList from 'main/content/apps/contacts/ContactsList';
import ContactsHeader from 'main/content/apps/contacts/ContactsHeader';
import ContactsSidebarContent from 'main/content/apps/contacts/ContactsSidebarContent';
import _ from 'lodash';
import {Button, Icon} from '@material-ui/core';
import ContactDialog from 'main/content/apps/contacts/ContactDialog';
// pkg to be able to bind apollo to react
import {graphql} from 'react-apollo';
// accessing to query file
import {getDealsQuery } from '../../queries/queries';

class DealList extends Component {
    displayDeals(){
      var data = this.props.data;
      if (data.loading){
        return (<div>Loading Deals ...</div>)
      } else {
        // if stop loading teh we can access data
        return data.deals.map(deal => {
          return (
            <li key={deal.id}>{deal.name}</li>
            // <li key={deal.id}>{deal.businessName}</li>
            // <li key={deal.id}>{deal.description}</li>
            // <li key={deal.id}>{deal.dealTime}</li>
            // <li key={deal.id}>{deal.dealHours}</li>
          );
        })
      }
    };
    render() {
        console.log(this.props);
       
      return (
        <div>
          <ul id="deallist">
            {this.displayDeals()}    
          </ul>  
        </div>
      );
    }
  }
  
  // this allows the DealList Component to have access to all data inside getDealsQuery
  // that data is stored in the component props
  export default graphql(getDealsQuery)(DealList);
  
