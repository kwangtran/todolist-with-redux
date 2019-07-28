import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from '../actions/index'
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = JSON.parse(value)
        }
        this.setState({
            [name]: value
        });
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state)
        //Cancel and close form
        this.onClear()
        this.onCloseForm();
    }
    onClear = () => {
        this.setState((state, props) => ({
            name: '',
            status: false
        }));
    }
    componentWillMount() {
        // if (this.props.task) {
        //     this.setState({
        //         id: this.props.task.id,
        //         name: this.props.task.name,
        //         status: this.props.task.status,
        //     });
        // }
        if (this.props.itemEditting) {
            this.setState({
                id: this.props.itemEditting.id,
                name: this.props.itemEditting.name,
                status: this.props.itemEditting.status,
            });
        } else {
            this.onClear();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditting) {
            this.setState({
                id: nextProps.itemEditting.id,
                name: nextProps.itemEditting.name,
                status: nextProps.itemEditting.status,
            });
        } else{
            this.onClear();
        }
    }
    render() {
        var { id } = this.state;
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id !== '' ? 'Cập nhật công việc' : 'Thêm Công Việc'}
                        <span style={{ float: "right" }} onClick={this.onCloseForm} className="fa fa-times-circle"></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">{id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
                     <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditting: state.itemEditting
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);