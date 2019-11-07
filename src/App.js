import React, { Component } from 'react';
// import { render } from 'react-dom';
import './App.css';
import Repo from './Repo';
import Search from './Search';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { githubToken } from './token';

const httpLink = createHttpLink({
	uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = githubToken;
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

class App extends Component {
	state = {
		username: '',
	};

	searchUser = (username) => {
		this.setState({ username });
	};

	render() {
		return (
			<ApolloProvider client={client}>
				<div className="Repo">
					Search repo by username 🔍
					<Search searchUser={this.searchUser} />
					<Repo login={this.state.username} />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
