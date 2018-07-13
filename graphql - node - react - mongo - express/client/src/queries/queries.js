//pkg to query as if we were into server with graphql syntax
import {gql} from 'apollo-boost';

// query getBusinessQuery
const getBusinessQuery = gql`
    {
        businesses{
            id
            name
            address
            city
            state
            postalCode
            phone  
            email
            typeOfBusiness
        }
    }
`

// query getDealsQuery
const getDealsQuery = gql`
    {
        deals{
            id
            name
            businessName
            description
            dealTime
            dealHours
        }
    }
`

// query addDeal to post 
const addDealMutation = gql`
    mutation ($name:String!,$businessName:String!,$description:String!,$dealTime:String!,$dealHours:String!,$businessId:ID!) {
        addDeal(
            name:$name,
            businessName:$businessName,
            description:$description,
            dealTime:$dealTime,
            dealHours:$dealHours,
            businessId:$businessId){
                name
                id
            }   
        }   
`

export {getBusinessQuery, getDealsQuery, addDealMutation};