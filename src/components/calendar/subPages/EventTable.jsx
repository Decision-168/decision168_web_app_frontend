import React from "react";
import { MaterialReactTable } from "material-react-table";

const EventTable = ({ data, columns }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      options={{
        search: false, // Set to true if you want to enable search
        sorting: true, // Set to true if you want to enable sorting
        paging: true, // Set to true if you want to enable pagination
        pageSize: 10, // Adjust the page size as needed
      }}
      emptyMessage="No upcoming events"
    />
  );
};

export default EventTable;
