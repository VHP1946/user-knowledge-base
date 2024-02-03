import React, { Component } from 'react';

/**
 * A container for holding content.
 * @param {String} containerClass | the class associated with the container.
 * @param {String} id | the id of the container.
 */
export class AppContainer extends Component {
    constructor(props) {
        super(props)

        if (props.containerClass) {
            this.containerClass = "app-container" + ' ' + this.props.containerClass
        } else {
            this.containerClass = "app-container"
        }
    }

    render() {
        return (
            <div className={this.containerClass} id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
}