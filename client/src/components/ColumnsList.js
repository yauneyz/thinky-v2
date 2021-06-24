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

    // Split the columns up into groups of 4
    //
    // The size of chunks to use
    const chunk = 4;

    // Split the list of columns into chunks
    let column_chunks = [];
    for (let i = 0, j = columns.length; i < j; i += chunk) {
      column_chunks.push(columns.slice(i, i + chunk));
    }
    console.log(column_chunks);

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {column_chunks.map((chunk, index) => (
            <Droppable key={`${index}`} droppableId={`${index}`}>
              {(provided, _snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="row"
                >
                  {chunk.map((column, offset) => {
                    const column_index = index * 4 + offset;
                    return (
                      <Draggable
                        key={column._id}
                        draggableId={column._id}
                        index={column_index}
                      >
                        {(provided, _snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="column"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <Column key={column._id} id={column_index} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
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
