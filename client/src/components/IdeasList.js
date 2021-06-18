import React from "react";
import Idea from "./Idea";
import { reorderIdeas } from "../redux/actions";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class IdeasList extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.reorderIdeas(result.source.index, result.destination.index);
  }

  render() {
    const active = this.props.active;
    const ideas = this.props.boards[active].ideas;

    const ideasList = ideas.map((idea, index) => {
      const id = idea._id;
      return (
        <Draggable key={idea + index} draggableId={idea + index} index={index}>
          {(provided, _snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Idea key={index} id={id} />
              </div>
            );
          }}
        </Draggable>
      );
    });

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="ideasList">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {ideasList}
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
  reorderIdeas,
})(IdeasList);
