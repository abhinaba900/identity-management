import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons

import "react-toastify/dist/ReactToastify.css";

export default function DataTableofArchived({ data }) {
  const [tasks, setTasks] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  
  useEffect(() => {
    const FormatedData = data?.map((task) => {
      return {
        ...task,
        added_date: formatDate(Number(task?.added_date)),
        archive_date: formatDate(Number(task?.archive_date)),
      };
    });
    setTasks(FormatedData);
  }, [data]);

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Task Name" field="task_name" sortable />
        <Column header="Description" field="description" sortable />
        <Column header="Added Date" field="added_date" sortable />
        <Column header="Archived Date" field="archived_date" sortable />
      </Row>
    </ColumnGroup>
  );

  function formatDate(timestamp) {
    // Convert the timestamp to milliseconds
    const date = new Date(timestamp * 1000);
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="app-container">
      <div className="p-inputgroup">
        <InputText
          type="search"
          className="p-inputtext-sm"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search by Name, Description"
        />
      </div>
      <DataTable
        value={tasks}
        paginator
        rows={5}
        globalFilter={globalFilter}
        className="p-datatable-sm"
        sortOrder={1}
        filterDisplay="menu"
        headerColumnGroup={headerGroup}
      >
        <Column field="task_name" header="Task Name" sortable filter></Column>
        <Column
          field="description"
          header="Description"
          sortable
          filter
        ></Column>
        <Column field="added_date" header="Added Date" sortable filter></Column>
        <Column
          field="archive_date"
          header="Archived Date"
          sortable
          filter
        ></Column>
      </DataTable>
    </div>
  );
}
