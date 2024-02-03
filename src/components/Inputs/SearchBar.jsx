import React, { Component } from 'react';

/**
 * Input component which takes a search function with an optional key and returns filtered data.
 * @param {Function} FilterFunction | the function called on change.
 * @param {String} searchKey | the key used when searching.
 * @param {String} filterType | the filter type used.
 * @param {String} searchClass | the class of the search bar.
 * @param {String} id | id of the searchbar.
 * @param {String} type | the HTML input type.
 */
export class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

        if (props.searchClass) {
            this.searchClass = "search-bar" + " " + props.searchClass
        } else {
            this.searchClass = "search-bar"
        }
    }

    /**
     * Change event handler
     * Can optionally pass data using props.data
     */
    handleChange(e) {
        this.props.FilterFunction(e, this.props.searchKey, this.props.filterType)
    }

    render() {
        return (
            <input
                onChange={this.handleChange}
                className={this.searchClass}
                id={this.props.id}
                type={this.props.type}
                placeholder={this.props.placeholder}
            >
            </input>
        );
    }
}