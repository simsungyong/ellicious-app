const options = {
    

    uri: "http://3.134.176.171:4000"

}
export default options;

// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
// import { ApolloLink, split } from 'apollo-link';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';

// const httpLink = new HttpLink({
//     uri: 'http://3.134.176.171:4000/'
// });

// const wsLink = new WebSocketLink({
//     uri: `ws://3.134.176.171:4000/`,
//     options: {
//         reconnect: true
//     }
// });

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.forEach(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//           ),
//         );
//       if (networkError) console.log(`[Network error]: ${networkError}`);
//     }),
//     split(
//         // split based on operation type
//         ({ query }) => {
//           const definition = getMainDefinition(query);
//           return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//           );
//         },
//         wsLink,
//         httpLink
//       )
//   ]),
//   cache: new InMemoryCache()
// });

// export default client