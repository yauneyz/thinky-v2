import React from "react";
import Column from "./Column";
import { reorderColumns } from "../redux/actions";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class ColumnsList extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.reorderColumns(result.source.index, result.destination.index);
  }

  render() {
    const active = this.props.active;
    const columns = this.props.boards[active].columns;

    const columnsList = columns.map((column, index) => {
      const id = column._id;
      return (
        <Draggable key={id} draggableId={id} index={index}>
          {(provided, _snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="column"
                key={id}
              >
                <Column id={index} key={id} />
              </div>
            );
          }}
        </Draggable>
      );
    });

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable key={0} droppableId="columnsList" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="columnsList"
            >
              {columnsList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => {
  const { boards, active } = state;
  return {
    boards: boards,
    active: active,
  };
};

export default connect(mapStateToProps, {
  reorderColumns,
})(ColumnsList);
