import React, { Component } from 'react';


/**
 * A container for holding content which floats on the screen. To overlay on top of titlebar, give "overlay" as one of the classes.
 * @param {String} containerClass | the class associated with the container.
 * @param {String} id | the id of the container.
 */
export class FloatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			containerClass: "float-container"
		}

		if (props.containerClass) {
			this.containerClass = "float-container" + ' ' + this.props.containerClass
		} else {
			this.containerClass = "float-container"
		}
	}

	componentDidMount() {
		if (this.props.containerClass) {
			this.setState({
				containerClass: "float-container" + ' ' + this.props.containerClass
			})
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.containerClass != prevProps.containerClass) {
			this.setState({
				containerClass: "float-container" + ' ' + this.props.containerClass
			})
		}
	}

	render() {
		return (
			<div className={this.state.containerClass} id={this.props.id}>
				{this.props.children}
			</div>
		);
	}
}