import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/index'
class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }
    onChangeStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);;
    }
    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center" onClick={this.onChangeStatus}>
                    <span className={task.status === true ? 'label label-success' : 'label label-danger'}>
                        {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button onClick={this.onEditTask} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5" />Sửa
                    </button>&nbsp;
                 <button onClick={this.onDelete} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5" />Xóa
                </button>
                </td>
            </tr>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deletetask(id))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);