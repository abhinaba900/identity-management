import React, { useCallback, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import { IoArchive } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

const App = ({ data, userId, setTriggerPoint, triggerPoint }) => {
  const [tasks, setTasks] = useState(data);

  const [globalFilter, setGlobalFilter] = useState("");
  const [modalData, setModalData] = useState({});
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [archiveShow, setArchiveShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback((userId, taskId) => {
    setModalData({ userId, taskId });
    setShow(true);
  }, []);

  const handleEditClose = useCallback(() => setEditShow(false), []);
  const handleEditShow = useCallback((userId, taskId, rowData) => {
    setModalData({ userId, taskId, rowData });
    setEditShow(true);
  }, []);

  const handleAddClose = useCallback(() => setAddShow(false), []);
  const handleAddShow = useCallback(() => {
    setAddShow(true);
  }, []);

  const handleArchiveClose = useCallback(() => setArchiveShow(false), []);
  const handleArchiveShow = useCallback((userId, taskId) => {
    setModalData({ userId, taskId });
    setArchiveShow(true);
  }, []);

  useEffect(() => {
    const FormatedData = data?.map((task) => {
      return {
        ...task,
        added_date: formatDate(Number(task?.added_date)),
      };
    });
    setTasks(FormatedData);
  }, [data]);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment key={rowData.id}>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Button
            className="p-button-rounded p-button-success mr-2"
            onClick={() => openEditDialog(rowData?.id, rowData)}
          >
            <TiEdit size={16} />
          </Button>
          <Button
            className="p-button-rounded p-button-warning mr-2"
            onClick={() => deleteTask(rowData.id)}
          >
            <MdDelete size={16} />
          </Button>
          <Button
            className="p-button-rounded p-button-help"
            onClick={() => handleArchiveShow(userId, rowData.id)}
          >
            <IoArchive size={16} />
          </Button>
        </div>
      </React.Fragment>
    );
  };

  const openEditDialog = (task, rowData) => {
    handleEditShow(userId, task, rowData);
  };

  const deleteTask = (id) => {
    handleShow(userId, id);
  };

  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Task Name" field="name" sortable />
        <Column header="Description" field="description" sortable />
        <Column header="Added Date" sortable field="addedTime" />
        <Column header="Actions" field="addedTime" />
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
          placeholder="Search by Name , Description"
        />

        <Button
          type="button"
          className="add-task-button"
          onClick={handleAddShow}
        >
          Add Task
          <span className="p-button-icon p-button-icon-right ml-2">
            <i className="pi pi-plus"></i>
          </span>
        </Button>
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
        <Column field="added_date" header="Added Time" sortable filter></Column>
        <Column body={actionBodyTemplate} header="Actions"></Column>
      </DataTable>
      <OpenDeleteModal
        show={show}
        handleClose={handleClose}
        modalData={modalData}
        setTriggerPoint={setTriggerPoint}
        userId={modalData?.userId}
        taskId={modalData?.taskId}
        triggerPoint={triggerPoint}
      />

      <EditFunctionHandaling
        show={editShow}
        handleClose={handleEditClose}
        modalData={modalData}
        setTriggerPoint={setTriggerPoint}
        userId={modalData?.userId}
        taskId={modalData?.taskId}
        triggerPoint={triggerPoint}
        rowData={modalData?.rowData}
      />

      <AddTaskModal
        show={addShow}
        handleClose={handleAddClose}
        setTriggerPoint={setTriggerPoint}
        triggerPoint={triggerPoint}
        userId={userId}
      />

      <ArchiveModal
        show={archiveShow}
        handleClose={handleArchiveClose}
        userId={modalData?.userId}
        taskId={modalData?.taskId}
        setTriggerPoint={setTriggerPoint}
        triggerPoint={triggerPoint}
      />
    </div>
  );
};

function OpenDeleteModal({
  show,
  handleClose,
  userId,
  taskId,
  setTriggerPoint,
  triggerPoint,
}) {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/delete-task?user_id=${userId}&task_id=${taskId}`
      );
      toast.success("Task deleted successfully");

      setTriggerPoint({
        ...triggerPoint,
        getTasks: Math.random() + Math.random(),
      });
      handleClose();
    } catch (error) {
      toast.error("Failed to delete Task");
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Task?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            type="button"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="danger" className="btn btn-danger" type="submit">
            Delete
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

function EditFunctionHandaling({
  show,
  handleClose,
  modalData,
  triggerPoint,
  setTriggerPoint,
  userId,
  taskId,
  rowData,
}) {
  const [editTaskData, setEditTaskData] = useState({});
  const handleTaskEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("task_id", taskId);
      formData.append("task_name", editTaskData?.task_name);
      formData.append("description", editTaskData?.description);
      await axios.post(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/update-task`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Task updated successfully");
      setTriggerPoint({
        ...triggerPoint,
        getTasks: Math.random() + Math.random(),
      });
      handleClose();
    } catch (error) {
      toast.error("Failed to update Task");
      console.error(error);
    }
  };

  useEffect(() => {
    setEditTaskData(rowData);
  }, [rowData]);
  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleTaskEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="mukta-semibold password-label">Task Name</label>
          <div className="input-container">
            <input
              type="text"
              className="password-input mukta-semibold"
              value={editTaskData?.task_name || ""}
              onChange={(e) =>
                setEditTaskData((prev) => ({
                  ...prev,
                  task_name: e.target.value,
                }))
              }
            />
          </div>
          <label className="mukta-semibold password-label">Description</label>
          <div className="input-container">
            <input
              type="text"
              className="password-input mukta-semibold"
              value={editTaskData?.description || ""}
              onChange={(e) =>
                setEditTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            type="button"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="warning"
            className="btn btn-warning"
            type="submit"
            disabled={!editTaskData?.task_name || !editTaskData?.description}
          >
            Edit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

function AddTaskModal({
  show,
  handleClose,
  setTriggerPoint,
  triggerPoint,
  userId,
}) {
  const [newTaskData, setNewTaskData] = useState({
    task_name: "",
    description: "",
  });

  const handleTaskAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("task_name", newTaskData?.task_name);
      formData.append("description", newTaskData?.description);
      await axios.post(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/add-task`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Task added successfully");
      setTriggerPoint({
        ...triggerPoint,
        getTasks: Math.random() + Math.random(),
      });
      handleClose();
      setNewTaskData({ task_name: "", description: "" });
    } catch (error) {
      toast.error("Failed to add Task");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleTaskAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="mukta-semibold password-label mr-2">
            Task Name{" "}
          </label>
          <div className="input-container">
            <input
              type="text"
              className="password-input mukta-semibold"
              value={newTaskData.task_name}
              onChange={(e) =>
                setNewTaskData((prev) => ({
                  ...prev,
                  task_name: e.target.value,
                }))
              }
            />
          </div>
          <label className="mukta-semibold password-label mr-2">
            Description{" "}
          </label>
          <div className="input-container">
            <input
              type="text"
              className="password-input mukta-semibold"
              value={newTaskData.description}
              onChange={(e) =>
                setNewTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            type="button"
            onClick={() => handleClose()}
          >
            Close
          </Button>
          <Button
            variant="success"
            className="btn btn-success"
            type="submit"
            disabled={!newTaskData.task_name || !newTaskData.description}
          >
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

function ArchiveModal({
  show,
  handleClose,
  userId,
  taskId,
  setTriggerPoint,
  triggerPoint,
}) {
  const handleArchive = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/archive-task?user_id=${userId}&task_id=${taskId}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Task archived successfully");

      setTriggerPoint({
        ...triggerPoint,
        getTasks: Math.random() + Math.random(),
      });
      handleClose();
    } catch (error) {
      toast.error("Failed to archive Task");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <form onSubmit={handleArchive}>
        <Modal.Header closeButton>
          <Modal.Title>Archive Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to archive this Task?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={() => handleClose()}
          >
            Close
          </Button>
          <Button variant="warning" className="btn btn-warning" type="submit">
            Archive
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default App;
