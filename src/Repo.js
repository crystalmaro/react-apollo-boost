import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// binds apollo to react
import { graphql } from 'react-apollo';

const GET_REPO = gql`
	query Repo($login: String!) {
		user(login: $login) {
			repositories(first: 50, isFork: false) {
				nodes {
					name
					url
				}
			}
		}
	}
`;

export default function Repo({ login }) {
	const { loading, error, data } = useQuery(GET_REPO, {
		variables: { login },
	});
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>...</div>;
	}
	if (data.user) {
		return data.user.repositories.nodes.map(({ name, url }) => (
			<a key={name} href={url} className="Repo__list" target="_blank">
				{name}
			</a>
		));
	}
}

// class Repo extends Component {
// 	state = {
// 		username: '',
// 	};
// 	handleChange = (e) => {
// 		this.setState({
// 			username: e.target.value,
// 		});
// 	};
// 	handleSubmit = (e) => {
// 		e.preventDefault();
// 		console.log('submit pressed');
// 		this.setState({
// 			username: '',
// 		});
// 	};
// 	renderRepo = () => {
// 		let data = this.props.data;
// 		if (data.loading) {
// 			return <div>Loading...</div>;
// 		}
// 		if (data.error) {
// 			return <div>Error.</div>;
// 		}
// 		if (data.user) {
// 			return data.user.repositories.nodes.map(({ name, url }) => (
// 				<a key={name} href={url} className="Repo__list-link">
// 					{name}
// 				</a>
// 			));
// 		}
// 	};
// 	render() {
// 		return (
// 			<div className="Repo">
// 				<form className="Repo__form" onSubmit={this.handleSubmit}>
// 					<input
// 						onChange={this.handleChange}
// 						className="Repo__form-input"
// 						value={this.state.username}
// 						type="text"
// 						placeholder="username"
// 					/>
// 					<button className="Repo__form-search" type="submit">
// 						Search
// 					</button>
// 				</form>
// 				<div className="Repo__list">{this.renderRepo()}</div>
// 			</div>
// 		);
// 	}
// }

// export default graphql(TEST)(Repo);
