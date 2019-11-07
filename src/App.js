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
	// const token = '6e18050068b398ff5dc1efcb91ec0c4b56a0c24d';
	// const token = 'ecfaa59de43d93facc7f9119e69d0205382e18ed';
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
					<Search searchUser={this.searchUser} />
					<Repo login={this.state.username} />
				</div>
			</ApolloProvider>
		);
	}
}

export default App;

{
	/* <form className="Repo__form" onSubmit={this.handleSubmit}>
<input
  onChange={this.handleChange}
  className="Repo__form-input"
  value={this.state.username}
  type="text"
  placeholder="username"
/>
<button className="Repo__form-search" type="submit">
  Search
</button>
</form> */
}
