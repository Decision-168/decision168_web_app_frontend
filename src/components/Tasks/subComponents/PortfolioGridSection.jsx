import React, { useState, useEffect, memo } from "react";
import { Box, Card, CardContent, Paper } from "@mui/material";
import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PerfectScrollbar from "react-perfect-scrollbar";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { getPortfolioTasksSubtasksGridView } from "../../../api/modules/taskModule";
import { filterDataByStatus } from "../../../helpers/filterDataByStatus";
import Loader from "../../common/Loader";
import NoGridTaskFound from "./NoGridTaskFound";
import {
  changeSubtaskStatusDND,
  changeTaskStatusDND,
} from "../../../api/modules/taskModule";
import { toast } from "react-toastify";

const PortfolioGridSection = ({ rows, setRows }) => {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = React.useState({});
  const user = useSelector(selectUserDetails);
  // const regId = user?.reg_id;
  // const portfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const regId = 1;
  const portfolioId = 2;

  const fetchData = async () => {
    setLoading(true);
    try {
      // Introduce a delay of 1 second (1000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getPortfolioTasksSubtasksGridView(
        portfolioId,
        regId
      );
      setRows(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [portfolioId, regId]);

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
      const newdata = {
        tid: taskId,
        tassignee: taskAssignee,
        status_but: newStatus,
      };
      // Assuming changeTaskStatusDND returns a Promise
      const response = await changeTaskStatusDND({
        user_id: regId,
        data: newdata,
      });

      return response; // Return the response for checking the status code
    } catch (error) {
      throw error; // Rethrow the error for handling in the calling function
    }
  };

  // Subtask Status
  const updateSubtaskStatus = async (subtaskId, subtaskAssignee, newStatus) => {
    try {
      const newdata = {
        stid: subtaskId,
        stassignee: subtaskAssignee,
        status_but: newStatus,
      };
      // Assuming changeSubtaskStatusDND returns a Promise
      const response = await changeSubtaskStatusDND({
        user_id: regId,
        data: newdata,
      });

      return response; // Return the response for checking the status code
    } catch (error) {
      throw error; // Rethrow the error for handling in the calling function
    }
  };

  const handleStatusChange = async (removed, destColumn) => {
    const { tid, tassignee } = removed?.content || {};

    if (removed?.content?.type === "task") {
      try {
        const response = await updateTaskStatus(
          tid,
          tassignee,
          destColumn?.value
        );
        if (response.status === 200) {
          fetchData();
          toast.success(`${response.data?.message}`);
        } else {
          toast.error(`Failed to update task status. Please try again.`);
        }
      } catch (error) {
        fetchData();
        toast.error(`${error?.response?.data?.message}`);
      }
    } else {
      try {
        const response = await updateSubtaskStatus(
          tid,
          tassignee,
          destColumn?.value
        );
        if (response.status === 200) {
          fetchData();
          toast.success(`${response.data?.message}`);
        } else {
          toast.error(`Failed to update subtask status. Please try again.`);
        }
      } catch (error) {
        fetchData();
        toast.error(`${error?.response?.data?.message}`);
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
          }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#DEE1E6"
                            : "#FFFFFF",
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
                          count={
                            column.items.length > 0 ? column.items.length : 0
                          }
                        />

                        {/* Column Body */}
                        <Box sx={{ mt: 2, height: "400px", overflow: "auto" }}>
                          <PerfectScrollbar>
                            <Box sx={{ mr: 2 }}>
                              {column?.items?.length > 0 ? (
                                column?.items?.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
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

export default memo(PortfolioGridSection);
