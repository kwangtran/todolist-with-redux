import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChangeKeyword = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    onSearchKeyword = () => {
        // this.props.onSearchKeyword(this.state.keyword);
        console.log(this.state)
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var { keyword } = this.state
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input value={keyword} name="keyword" onChange={this.onChangeKeyword} type="text" className="form-control" placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button onClick={this.onSearchKeyword} className="btn btn-primary" type="button">
                            <span className="fa fa-search mr-5" />Tìm
					 </button>
                    </span>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        keyword: state.keyword
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
