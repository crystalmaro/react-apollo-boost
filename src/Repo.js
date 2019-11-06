import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// binds apollo to react
import { graphql } from 'react-apollo';

const TEST = gql`
	{
		user(login: "crystalmaro") {
			repositories(first: 50, isFork: false) {
				nodes {
					name
					url
				}
			}
		}
	}
`;

// const TEST = gql`
// 	{
// 		rates(currency: "USD") {
// 			currency
// 			rate
// 		}
// 	}
// `;

// function Repo() {
// 	console.log('hi');
// 	const { loading, error, data } = useQuery(TEST);
// 	console.log(data);
// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error :(</p>;
// 	return data.viewer.map(({ login, name }) => (
// 		<div key={login}>
// 			<p>
// 				{login}: {name}
// 			</p>
// 		</div>
// 	));
// }
// export default graphql(TEST)(Repo);

class Repo extends Component {
	state = {
		username: '',
	};
	handleChange = (e) => {
		this.setState({
			username: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit pressed');
		this.setState({
			username: '',
		});
	};
	render() {
		var data = this.props.data;
		if (true) {
			console.log(data.user);
		}
		return (
			<div className="Repo">
				<form className="Repo__form" onSubmit={this.handleSubmit}>
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
				</form>
				<div className="Repo__list">
					<a className="Repo__list-link">repo name and link</a>
				</div>
			</div>
		);
	}
}

// class Repo extends Component {
// 	render() {
// 		console.log(this.props);
// 		return <div>test repo</div>;
// 	}
// }

export default graphql(TEST)(Repo);
// export default Repo;
