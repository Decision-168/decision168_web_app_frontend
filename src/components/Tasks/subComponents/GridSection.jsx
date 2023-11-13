import React from "react";
import { Box, Paper } from "@mui/material";
import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { kanbanColumns } from "./KanbanData";

const GridSection = () => {
  const [columns, setColumns] = React.useState(kanbanColumns);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    // <Paper sx={{ p: 2, mt: 2 }}>
    <Box sx={{ mt: 2, display: "grid", gap: 2, gridTemplateColumns: "repeat(4, 1fr)" }}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? "lightgrey" : "white",
                      padding: 16,
                      width: "100%",
                      minHeight: 500,
                      margin: "5px 0",
                      borderRadius: "0.5rem",
                    }}>
                    {/* Column Header */}
                    <KanbanColumnHeader status={column.name} color={column.color} count={column.items.length > 0 ? column.items.length : 0} />

                    {/* Column Body */}
                    <Box sx={{ mt: 2 }}>
                      {column.items.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    borderRadius: "0.5rem",
                                    margin: "0 0 8px 0",
                                    minHeight: "50px",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                  }}>
                                  <KanbanCard projectName={item.content.projectName} taskDescription={item.content.description} dueDate={item.content.dueDate} code={item.content.code} subTasksCount={item.content.subTasksCount} />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </Box>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    </Box>
    // </Paper>
  );
};

export default GridSection;
