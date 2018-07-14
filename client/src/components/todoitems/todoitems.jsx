import React, { Component } from "react";
import FlipMove from "react-flip-move";

class TodoItems extends Component {
    constructor(props) {
        super(props);
     
        this.createTasks = this.createTasks.bind(this);
      }

    createTasks(item) {
        return <li key={item.key}>
                  <span>{item.text}</span>
                  <button className="done" onClick={(e) => this.complete(e, item)}>Done</button>
                  <button className="trash" onClick={() => this.delete(item.key)}>Trash</button>
              </li>
    }
   
    delete(key) {
        this.props.delete(key);
      }

      complete(e, item) {
        item.status = !item.status;
        e.target.previousSibling.classList.toggle("striked");
        this.props.complete(item);
      }

      update(item) {
        this.props.update(item);
      }

    render() {
      var todoEntries = this.props.entries;
      var listItems = todoEntries.map(this.createTasks);
   
      return (
        <ul className="theList">
            <FlipMove duration={250} easing="ease-out">
                {listItems}
            </FlipMove>
        </ul>
      );
    }
  };

  export default TodoItems;