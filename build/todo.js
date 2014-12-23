/** @jsx react.dom */

var ToDoRow = React.createClass({displayName: "ToDoRow",
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
			React.createElement("li", {style: todoStyles}, 
				this.props.todo.name, " ", ' ', 
				React.createElement("input", {
					type: "checkbox", 
					checked: this.state.checked, 
					ref: "completed", 
					onChange: this.handleChange}
				)
			)
		);
	}
});

var ToDoList = React.createClass({displayName: "ToDoList",
	handleChange: function(){

	},
	render: function(){
		var rows = [];
		this.props.todos.forEach(function(thisToDo) {
			rows.push(React.createElement(ToDoRow, {todo: thisToDo, key: thisToDo.name, displayChecked: this.props.displayChecked, onUserInput: this.handleChange}));
		}.bind(this));
		return (
			React.createElement("ul", null, 
				rows
			)
		);
	}
	
});

var HeaderBar = React.createClass({displayName: "HeaderBar",
	handleChange: function(){
		this.props.onUserInput(
			this.refs.displayChecked.getDOMNode().checked
		);
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("input", {
					type: "text", 
					placeholder: "Add..."}
				), 
				React.createElement("p", null, 
					React.createElement("input", {
						type: "checkbox", ref: "displayChecked", checked: this.props.displayChecked, 
						onChange: this.handleChange}
					), 
					"Display completed"
				)
			)
		)
	}
});

var ToDoApp = React.createClass({displayName: "ToDoApp",
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
			React.createElement("div", null, 
				React.createElement(HeaderBar, {
					displayChecked: this.state.displayChecked, 
					onUserInput: this.handleUserInput}
				), 
				React.createElement(ToDoList, {
					todos: JSON.parse(localStorage.TODOS), 
					displayChecked: this.state.displayChecked}
				)
			)
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

React.render(React.createElement(ToDoApp, null), document.getElementById('mount-point') );