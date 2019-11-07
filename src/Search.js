import React, { Component } from 'react';

export default class Search extends Component {
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
		// call function to update user
		this.props.searchUser(this.state.username);
		this.setState({
			username: '',
		});
	};

	render() {
		return (
			<>
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
			</>
		);
	}
}