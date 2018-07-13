// Into this file we are going to describe the schema of graphql, object types, relationships between those objects types
const graphql = require('graphql');
const lodash = require('lodash'); 
// importing mongo models
const Deal = require('../models/deal');
const Business = require('../models/business');

// grab GraphQLObjectType from graphql
const {
    GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLNonNull} = graphql;

// define a type - BUSINESSTYPE
const BusinessType = new GraphQLObjectType({
    name:'Business',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        address:{type:GraphQLString},
        city:{type:GraphQLString},
        state:{type:GraphQLString},
        postalCode:{type:GraphQLInt},
        phone:{type:GraphQLFloat},    
        email:{type:GraphQLString},
        typeOfBusiness:{type:GraphQLString},
        deals:{
            type:new GraphQLList(DealType),
            resolve(parent,agrs){
                // return lodash.filter(deals,{businessId:parent.id})
                return Deal.find({businessId:parent.id})
            }
        }

    })
})

// define a type - DEALTYPE
const DealType = new GraphQLObjectType({
    name:'Deal',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        businessName:{type:GraphQLString},
        description:{type:GraphQLString},
        dealTime:{type:GraphQLString},    
        dealHours:{type:GraphQLString}, 
        business:{
            type:BusinessType,
            resolve(parent,args){
                // return lodash.find(business,{id:parent.businessId})
                return Business.findById(parent.businessId)
            }
        }
    })
})



// queries -> how to get into graph to grab data (route)
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        // when user ask for a particular deal
        deal:{
            type:DealType,
            // args is the param to be provided to find the book
            args:{id:{type:GraphQLID}},
            // this function actually get the book by id
            resolve(parent,args){
                // args.id
                // code to get data from db/other sources
                // return lodash.find(deals,{id: args.id})
                return Deal.findById(args.id);
            }
        },
        business:{
            type:BusinessType,
            // args is the param to be provided to find the book
            args:{id:{type:GraphQLID}},
            // this function actually get the book by id
            resolve(parent,args){
                // args.id
                // code to get data from db/other sources
                // return lodash.find(business,{id: args.id})
                return Business.findById(args.id);
            }
        },
        deals:{
            type: new GraphQLList(DealType),
            resolve(parent,args){
                // return deals;
                return Deal.find({});
            }
        },

        businesses:{
            type: new GraphQLList(BusinessType),
            resolve(parent,args){
                // return business;
                return Business.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addBusiness:{
            type:BusinessType,
            args:{
                name:{type:new GraphQLNonNull (GraphQLString)},
                address:{type:new GraphQLNonNull (GraphQLString)},
                city:{type:new GraphQLNonNull (GraphQLString)},
                state:{type:new GraphQLNonNull (GraphQLString)},
                postalCode:{type:new GraphQLNonNull (GraphQLInt)},
                phone:{type:new GraphQLNonNull (GraphQLFloat)},    
                email:{type:new GraphQLNonNull (GraphQLString)},
                typeOfBusiness:{type:new GraphQLNonNull (GraphQLString)}  
            },
            resolve(parent,args){
                // instantiating a new mongo Model 
                let business = new Business({
                    name:args.name,
                    address:args.address,
                    city:args.city,
                    state:args.state,
                    postalCode:args.postalCode,
                    phone:args.phone,    
                    email:args.email,
                    typeOfBusiness:args.typeOfBusiness
                });
                return business.save();
            }

        },
        addDeal:{
            type:DealType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                businessName:{type: new GraphQLNonNull(GraphQLString)},
                description:{type: new GraphQLNonNull(GraphQLString)},
                dealTime:{type: new GraphQLNonNull(GraphQLString)},    
                dealHours:{type: new GraphQLNonNull(GraphQLString)},
                businessId:{type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                // instantiating a new mongo Model 
                let deal = new Deal({
                    name:args.name,
                    businessName:args.businessName,
                    description:args.description,
                    dealTime:args.dealTime,    
                    dealHours:args.dealHours,
                    businessId:args.businessId, 
                });
                return deal.save();
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation   
})

// To test into GraphiQL                 

// addBusiness(name:"Pasion de Cielo",address:"45SW 7Th",city:"Tampa",state:"Florida",postalCode:33124,phone:8137541896,email:"pasioncielo@gmail.com",typeOfBusiness:"coffee shop"){
//     name
//     address
//     city
//     state
//     postalCode
//     phone  
//     email
//     typeOfBusiness
// }

// addDeal(name:"Buy 1 get 3 free @ Pasion del Cielo",businessName:"Pasion del Cielo",description:"Buy 1 get 3 free just for $100",dealTime:"Today",dealHours:"at 11pm",businessId:"5b450d6d92447f6c84add199"){
//         name
//         businessName
//         description
//         dealTime    
//         dealHours
// }