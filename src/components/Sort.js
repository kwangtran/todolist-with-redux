import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/index'
 class Sort extends Component {
    constructor(props) {
        super(props);

    }
    onClick = (sortBy,sortValue) => {
        // this.props.onSort(this.state.sort)
        this.props.onSort({
            by: sortBy,
            value:sortValue
        })
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick("name", 1)}>
                            <a
                                role="button"
                                className={(this.props.sort.by === 'name' && this.props.sort.value === 1) ? 'sort-selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                  </span>
                            </a>
                        </li>
                        <li onClick={() => this.onClick("name", -1)}>
                            <a
                                role="button"
                                className={(this.props.sort.by === 'name' && this.props.sort.value === -1) ? 'sort-selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                  </span>
                            </a>
                        </li>
                        <li role="separator" className="divider" />
                        <li onClick={() => this.onClick("status", 1)}>
                            <a role="button"
                                className={(this.props.sort.by === 'status' && this.props.sort.value === 1) ? 'sort-selected' : ''}
                            >Trạng Thái Kích Hoạt</a>
                        </li>
                        <li onClick={() => this.onClick("status", -1)}>
                            <a
                                className={(this.props.sort.by === 'status' && this.props.sort.value === -1) ? 'sort-selected' : ''}
                                role="button">Trạng Thái Ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        sort: state.sort,
        by: state.sort.by,
        value: state.sort.value
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sort)