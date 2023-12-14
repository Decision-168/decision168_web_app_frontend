import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PerfectScrollbar from "react-perfect-scrollbar";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../common/Loader";
import { filterDataByStatus } from "../../../helpers/filterDataByStatus"
import NoGridTaskFound from "./NoGridTaskFound";


const GridSection = ({ rows, loading }) => {

  const [columns, setColumns] = useState({});

  useEffect(() => {
    // Update columns when rows change
    const filteredDataTodo = filterDataByStatus(rows, "to_do");
    const filteredDataInProgress = filterDataByStatus(rows, "in_progress");
    const filteredDataInReview = filterDataByStatus(rows, "in_review");
    const filteredDataDone = filterDataByStatus(rows, "done");

    const updatedColumns = {
      [uuidv4()]: {
        name: "To Do",
        color: "#FFC0CB",
        items: filteredDataTodo,
      },
      [uuidv4()]: {
        name: "In Progress",
        color: "#9370DB",
        items: filteredDataInProgress,
      },
      [uuidv4()]: {
        name: "In Review",
        color: "#FFD700",
        items: filteredDataInReview,
      },
      [uuidv4()]: {
        name: "Done",
        color: "#98FB98",
        items: filteredDataDone,
      },
    };

    setColumns(updatedColumns);
  }, [rows]);


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
    <>
      {loading ? <Loader /> : <Box sx={{ mt: 2, display: "grid", gap: 2, gridTemplateColumns: "repeat(4, 1fr)", overflowX: "auto" }}>
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
                        background: snapshot.isDraggingOver ? "#DEE1E6" : "#FFFFFF",
                        padding: 14,
                        width: "100%",
                        minHeight: 500,
                        margin: "5px 0",
                        borderRadius: "0.5rem",
                      }}>
                      {/* Column Header */}
                      <KanbanColumnHeader status={column.name} color={column.color} count={column.items.length > 0 ? column.items.length : 0} />

                      {/* Column Body */}
                      <Box sx={{ mt: 2, height: "400px", overflow: "auto" }}>
                        <PerfectScrollbar>
                          <Box sx={{ mr: 2 }}>
                            {column?.items?.length > 0 ? column?.items?.map((item, index) => {
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
                                        <KanbanCard cardData={item.content} />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            }) : <NoGridTaskFound status={column?.name} />}
                            {provided.placeholder}
                          </Box>
                        </PerfectScrollbar>
                      </Box>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </DragDropContext>
      </Box>}
    </>

  );
};

export default GridSection;
