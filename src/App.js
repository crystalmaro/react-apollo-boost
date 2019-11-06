import React from 'react';
// import { render } from 'react-dom';
import './App.css';
import Repo from './Repo';
import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

// const client = new ApolloClient({
// 	uri: 'https://api.github.com/graphql',
// 	// uri: 'https://48p1r2roz4.sse.codesandbox.io',
// });

const httpLink = createHttpLink({
	// uri: '/graphql',
	uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = '6e18050068b398ff5dc1efcb91ec0c4b56a0c24d';
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const App = () => (
	// The ApolloProvider is similar to React's Context.Provider
	<ApolloProvider client={client}>
		<div>
			<Repo />
			<h2>My first Apollo app</h2>
		</div>
	</ApolloProvider>
);

export default App;
