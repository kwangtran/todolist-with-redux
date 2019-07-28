import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import tasks from './mocks/data'
import { generateID } from './helpers/IDHelper'
import { connect } from 'react-redux';
import * as actions from './actions/index'
import { filter } from 'lodash'
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskEditing: null
		}
	}
	componentDidMount() {
		if (!localStorage.getItem('tasks')) {
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		this.setState((state, props) => {
			return {
				tasks: JSON.parse(localStorage.getItem('tasks'))
			}
		});

	}

	onToggleForm = () => {
		var { itemEditting } = this.props
		if (itemEditting && itemEditting.id !== '') {
			this.props.onOpenForm();
		} else {
			this.props.onToggleForm();
		}
		this.props.onClearTask({
			id: '',
			name: '',
			status: false
		});
	}
	// onShowForm = () => {
	// 	this.setState((state, props) => (
	// 		{ isDisplayForm: true }
	// 	));
	// }
	// onUpdate = (id) => {
	// 	var { tasks } = this.state;
	// 	var index = this.findIndex(id);
	// 	var taskEditing = tasks[index];
	// 	this.setState({
	// 		taskEditing: taskEditing
	// 	});
	// 	this.onShowForm();
	// 	console.log(id);
	// }
	// findIndex(id) {
	// 	var { tasks } = this.state;
	// 	var result = -1;
	// 	tasks.forEach((task, index) => {
	// 		if (task.id === id) {
	// 			result = index;
	// 		}
	// 	});
	// 	return result;
	// }
	// onSort = (sortBy, sortValue) => {
	// 	this.setState({
	// 		sortBy: sortBy,
	// 		sortValue: sortValue
	// 	})
	// }
	render() {
		var { isDisplayForm } = this.props;
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
						<TaskForm
						/>
					</div>
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button
							type="button"
							className="btn btn-primary"
							onClick={this.onToggleForm}
						>
							<span className="fa fa-plus mr-5" />Thêm Công Việc
			  			</button>
						<button onClick={this.onGenerateData} type="button" className="btn btn-danger">
							<span className="fa fa-plus mr-5" />Generate data
			  			</button>
						<Control/>
						<TaskList />
					</div>
				</div>
			</div>
		);
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
		onToggleForm: () => {
			return dispatch(actions.toggleForm())
		},
		onClearTask: (task) => {
			dispatch(actions.editTask(task));
		},
		onOpenForm: () => {
			dispatch(actions.openForm())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// function App() {
// 	return (
// 		<div className="container">
// 			<div className="text-center">
// 				<h1>Quản Lý Công Việc</h1>
// 				<hr />
// 			</div>
// 			<div className="row">
// 				<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
// 					{/* Form */}
// 					<TaskForm />
// 				</div>
// 				<div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
// 					<button type="button" className="btn btn-primary">
// 						<span className="fa fa-plus mr-5" />Thêm Công Việc
// 		  </button>
// 					<Control />
// 					<TaskList />
// 				</div>
// 			</div>
// 		</div>

// 	);
// }

// export default App;
