import React, { Component } from 'react';
// pkg to be able to bind apollo to react
import {graphql, compose} from 'react-apollo';
// accessing to query file
import {getBusinessQuery, addDealMutation, getDealsQuery} from '../queries/queries';

class AddDeal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            businessName:'',
            description:'',
            dealTime:'',    
            dealHours:'',
            businessId:''
        }
    }
    displayBusinesses(){
        var data = this.props.getBusinessQuery;
        if (data.loading){
            return (<option disabled>Loading Businesses ... </option>)
        } else {
            return data.businesses.map(business => {
                return (<option key={business.id} value={business.id}>{business.name}</option>)
            })
        }
    }
    submitNewDealForm(e){
        e.preventDefault();
        this.props.addDealMutation({
            variables:{
                name:this.state.name,
                businessName:this.state.businessName,
                description:this.state.description,
                dealTime:this.state.dealTime,
                dealHours:this.state.dealHours,
                businessId:this.state.businessId 
            },
            refetchQueries: [{query: getDealsQuery}]
        });
    }
    render() {
      return (
        <div>
            <form id="addDeal" onSubmit={this.submitNewDealForm.bind(this)}>
                
                <div className="field">
                    <label>Deal Name:</label>
                    <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
                </div>
 
                <div className="field">
                    <label>Business Name:</label>
                    <input type="text" onChange={(e) => this.setState({businessName:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Deal Description:</label>
                    <input type="text" onChange={(e) => this.setState({description:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Deal Time:</label>
                    <input type="date" onChange={(e) => this.setState({dealTime:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Deal Hours:</label>
                    <input type="text" onChange={(e) => this.setState({dealHours:e.target.value})}/>
                </div>

                <div className="field">
                    <label>Business:</label>
                    <select  onChange={(e) => this.setState({businessId:e.target.value})}>
                        <option>Select Business ...</option>
                        {this.displayBusinesses()}
                    </select>
                </div>
               
                <button>Add Deal</button>
            </form>   
        </div>
      );
    }
  }
  
  // this allows the DealList Component to have access to all data inside getDealsQuery
  // that data is stored in the component props
  // compose is used to bind multiple queries to the same component
  export default compose (
    graphql(getBusinessQuery,{name:"getBusinessQuery"}),
    graphql(addDealMutation,{name:"addDealMutation"})
  )(AddDeal);