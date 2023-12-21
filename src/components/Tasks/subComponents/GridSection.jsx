import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PerfectScrollbar from "react-perfect-scrollbar";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../common/Loader";
import { filterDataByStatus } from "../../../helpers/filterDataByStatus";
import NoGridTaskFound from "./NoGridTaskFound";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import {
  changeSubtaskStatusDND,
  changeTaskStatusDND,
  getDashboardAlltaskGridView,
} from "../../../api/modules/taskModule";
import { toast } from "react-toastify";

const GridSection = () => {
  const [columns, setColumns] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUserDetails);
  // const regId = user?.reg_id;
  const regId = 1; // for testing

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDashboardAlltaskGridView(regId);
      setRows(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [regId]);

  useEffect(() => {
    // Update columns when rows change
    const filteredDataTodo = filterDataByStatus(rows, "to_do");
    const filteredDataInProgress = filterDataByStatus(rows, "in_progress");
    const filteredDataInReview = filterDataByStatus(rows, "in_review");
    const filteredDataDone = filterDataByStatus(rows, "done");

    const updatedColumns = {
      [uuidv4()]: {
        name: "To Do",
        value: "to_do",
        color: "#FFC0CB",
        items: filteredDataTodo,
      },
      [uuidv4()]: {
        name: "In Progress",
        value: "in_progress",
        color: "#9370DB",
        items: filteredDataInProgress,
      },
      [uuidv4()]: {
        name: "In Review",
        value: "in_review",
        color: "#FFD700",
        items: filteredDataInReview,
      },
      [uuidv4()]: {
        name: "Done",
        value: "done",
        color: "#98FB98",
        items: filteredDataDone,
      },
    };

    setColumns(updatedColumns);
  }, [rows]);

  // Task Status
  const updateTaskStatus = async (taskId, taskAssignee, newStatus) => {
    try {
      const newdata = { tid: taskId, tassignee: taskAssignee, status_but: newStatus };
      // Assuming changeTaskStatusDND returns a Promise
      const response = await changeTaskStatusDND({ user_id: regId, data: newdata });

      // Log specific properties for debugging
      console.log("Task Status Response:", response);

      return response; // Return the response for checking the status code
    } catch (error) {
      // Log error details for debugging
      console.error("Error updating task status:", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };

  // Subtask Status
  const updateSubtaskStatus = async (subtaskId, subtaskAssignee, newStatus) => {
    try {
      const newdata = { stid: subtaskId, stassignee: subtaskAssignee, status_but: newStatus };
      // Assuming changeSubtaskStatusDND returns a Promise
      const response = await changeSubtaskStatusDND({ user_id: regId, data: newdata });

      // Log specific properties for debugging
      console.log("Subtask Status Response:", response);

      return response; // Return the response for checking the status code
    } catch (error) {
      // Log error details for debugging
      console.error("Error updating subtask status:", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };

  const handleStatusChange = async (removed, destColumn) => {
    const { tid, tassignee } = removed?.content || {};

    if (removed?.content?.type === "task") {
      console.log("This is a task");
      try {
        const response = await updateTaskStatus(tid, tassignee, destColumn?.value);
        if (response.status === 200) {
          toast.success(`${response.data?.message}`);
        } else {
          toast.error(`Failed to update task status. Please try again.`);
        }
      } catch (error) {
        toast.error(`${error?.response?.data?.message}`);
        console.error("Error handling the task status:", error);
      }
    } else {
      console.log("This is a subtask");
      try {
        const response = await updateSubtaskStatus(tid, tassignee, destColumn?.value);
        if (response.status === 200) {
          toast.success(`${response.data?.message}`);
        } else {
          toast.error(`Failed to update subtask status. Please try again.`);
        }
      } catch (error) {
        toast.error(`${error?.response?.data?.message}`);
        console.error("Error handling the subtask status:", error);
      }
    }
  };

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

      handleStatusChange(removed, destColumn);
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
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(4, 1fr)",
            overflowX: "auto",
          }}
        >
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
                        }}
                      >
                        {/* Column Header */}
                        <KanbanColumnHeader
                          status={column.name}
                          color={column.color}
                          count={column.items.length > 0 ? column.items.length : 0}
                        />

                        {/* Column Body */}
                        <Box sx={{ mt: 2, height: "400px", overflow: "auto" }}>
                          <PerfectScrollbar>
                            <Box sx={{ mr: 2 }}>
                              {column?.items?.length > 0 ? (
                                column?.items?.map((item, index) => {
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
                                            }}
                                          >
                                            <KanbanCard
                                              cardData={item.content}
                                              fetchData={fetchData}
                                            />
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })
                              ) : (
                                <NoGridTaskFound status={column?.name} />
                              )}
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
        </Box>
      )}
    </>
  );
};

export default GridSection;
