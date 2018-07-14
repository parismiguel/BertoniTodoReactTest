import React, { Component } from 'react';
import TodoItems from "./../todoitems/todoitems.jsx";

import './todolist.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
            items: []
          };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
        // this.updateItem = this.updateItem.bind(this);
      }

      componentDidMount() {
        fetch('api/tasks')
        .then(res => res.json())
        .then(items => this.setState({items}, () => console.log(`Tasks fetched: ${items.length}`)));
      }

      addItem(e) {
        if (this._inputElement.value !== "") {

          var newItem = {
            text: this._inputElement.value,
            key: Date.now(),
            status: false
          };

          fetch('/api/tasks', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newItem)
           })
           .then(res => res.json())
           .then((item) => {
              newItem = item;

              this.setState((prevState) => {
                return { 
                  items: prevState.items.concat(newItem) 
                };
              });
             
              this._inputElement.value = "";

              console.log("Task added");
           });
                 

        }
         
        console.log(this.state.items);
           
        e.preventDefault();
      }

      deleteItem(key) {

        fetch(`/api/tasks/${key}`, {
          method: 'delete',
          headers: {'Content-Type':'application/json'}
         })
         .then(res => res.json())
         .then((item) => {
          var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
          });

          this.setState({
            items: filteredItems
          });

          console.log("Task deleted");
         });
       
      }

      completeItem(item) {

        fetch(`/api/tasks/${item.key}`, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(item)
         })
         .then(res => res.json())
         .then((item) => {
            const index = this.state.items.indexOf(item);

            if (index !== -1) {
              this.setState.items[index] = item;
            }

            console.log("Task completed");

            console.log(this.state.items);
         });
       
      }

      updateItem(item) {

        fetch(`/api/tasks/${item.key}`, {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(item)
         })
         .then(res => res.json())
         .then((item) => {

            const index = this.state.items.indexOf(item);

            if (index !== -1) {
              this.setState.items[index] = item;
            }

            console.log("Task updated");
         });
       
      }

   render() {

    return (
        <div className="todoListMain">
          <div className="header">
            <form onSubmit={this.addItem}>
              <input ref={(a) => this._inputElement = a} 
                  placeholder="Enter a task...">
              </input>
              <button type="submit">Add</button>
            </form>
          </div>

         <TodoItems entries={this.state.items}
                 delete={this.deleteItem}
                 complete={this.completeItem}
                 update={this.updateItem}
                 />

      </div>
    );
   }
}

export default TodoList;