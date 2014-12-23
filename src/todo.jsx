/** @jsx react.dom */

var ToDoRow = React.createClass({
	getInitialState: function(){
		return {
		 checked: this.props.todo.checked 
		};
	},
	handleChange: function(){
		var checkedState = this.refs.completed.getDOMNode().checked;
		this.setState({
			checked: checkedState
		});
	},
	render: function() {

		var todoStyles = {
			display: (this.state.checked && !this.props.displayChecked) ? 'none' : 'block'
		};

		return (
			<li style={todoStyles}>
				{this.props.todo.name} {' '}
				<input 
					type='checkbox' 
					checked={this.state.checked}
					ref='completed'
					onChange={this.handleChange}
				/>
			</li>
		);
	}
});

var ToDoList = React.createClass({
	handleChange: function(){

	},
	render: function(){
		var rows = [];
		this.props.todos.forEach(function(thisToDo) {
			rows.push(<ToDoRow todo={thisToDo} key={thisToDo.name} displayChecked={this.props.displayChecked} onUserInput={this.handleChange}/>);
		}.bind(this));
		return (
			<ul>
				{rows}
			</ul>
		);
	}
	
});

var HeaderBar = React.createClass({
	handleChange: function(){
		this.props.onUserInput(
			this.refs.displayChecked.getDOMNode().checked
		);
	},
	render: function() {
		return (
			<div>
				<input 
					type='text' 
					placeholder='Add...' 
				/>
				<p>
					<input 
						type='checkbox' ref='displayChecked' checked={this.props.displayChecked}
						onChange={this.handleChange} 
					/> 
					Display completed
				</p>
			</div>
		)
	}
});

var ToDoApp = React.createClass({
	getInitialState: function(){
		return {
			displayChecked: false
		};
	},
	handleUserInput: function(displayChecked) {
		this.setState({
		  displayChecked: displayChecked
		});
	},
	render: function() {
		return (
			<div>
				<HeaderBar 
					displayChecked={this.state.displayChecked}
					onUserInput={this.handleUserInput}
				/>
				<ToDoList 
					todos={JSON.parse(localStorage.TODOS)}
					displayChecked={this.state.displayChecked}
				/>
			</div>
		);
	}
});

// fake an API
var TODOS = [
	{"name": "Milk", "checked": false},
	{"name": "Bread", "checked": true},
	{"name": "Carrots", "checked": false}
];

if (!localStorage.TODOS) {
	console.log("hi");
	localStorage.TODOS = JSON.stringify(TODOS);
};

React.render(<ToDoApp/>, document.getElementById('mount-point') );