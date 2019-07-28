import React, { Component } from 'react'
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import { filter } from 'lodash'
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    handleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'fitlerStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)
        this.setState({
            [name]: value
        });
    }
    render() {
        var { tasks, filterTable, keyword, sort } = this.props;
        //search by keyword
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword) !== -1
        })

        //sort 
        if (sort.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                return 0;
            })
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                return 0;
            })
        }

        //Filtertable
        if (filterTable.name) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1
            })

        }
        tasks = tasks.filter((task) => {
            if (filterTable.status === -1) {
                return task;
            }
            else {
                return task.status === (filterTable.status === 1 ? true : false)
            }
        })
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem
                key={index}
                task={task}
                index={index}
                onUpdate={this.props.onUpdate}
            />
        })
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover mt-40">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td />
                                <td>
                                    <input
                                        onChange={(event) => this.handleChange(event)}
                                        // value={this.state.filterName}
                                        name="filterName"
                                        type="text"
                                        className="form-control" />
                                </td>
                                <td>
                                    <select
                                        onChange={(event) => this.handleChange(event)}
                                        name="fitlerStatus"
                                        className="form-control">
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td />
                            </tr>
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);