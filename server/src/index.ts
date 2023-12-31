import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {deleteDummyData, findTopSellingProduct, insertDummySalesData, addTargetAndCategory} from './salesData.js';

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  
  type SalesData {
    product: String,
    salesRevenue: Int,
    region: String,
    productCategory: String,
    targetSales: Int
  }
  
  type Query {
    getTopSellingProduct: [SalesData]
  }
  
  # Mutation
  type Mutation {
    insertDummyData:[SalesData]
  }
  type Mutation {
    deleteDummyData: [SalesData]
  }
  type Mutation {
    addTargetAndCategory: [SalesData]
  }
  
 
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getTopSellingProduct: async () => await findTopSellingProduct()
    },
    Mutation: {
        insertDummyData: async () => {
            await insertDummySalesData()
        },
        deleteDummyData: async () => {
            await deleteDummyData()
        },
        addTargetAndCategory: async () => {
            await addTargetAndCategory()
        }
    },
};


const server = new ApolloServer({ typeDefs, resolvers });
const handleStandAloneServer = async() => {
    const {url} = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}
handleStandAloneServer()
// console.log(`🚀  Server ready at: ${url}`);
// `startStandaloneServer` returns a `Promise` with the
// the URL that the server is listening on.
export {}