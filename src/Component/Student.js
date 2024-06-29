import React, { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import CreateStudentModal from "./CreateStudentModal";
import EditStudentModal from "./EditStudentModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../API/StudentAPI";
import "./CSS/Student.css"

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowEditModal = (student) => {
    setStudentToEdit(student);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleSaveStudent = async (newStudent) => {
    try {
      const savedStudent = await createStudent(newStudent);
      setStudents([...students, savedStudent]);
      handleCloseCreateModal();
    } catch (error) {
      console.error(
        "Error creating student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      const savedStudent = await updateStudent(updatedStudent);
      setStudents(
        students.map((student) =>
          student._id === savedStudent._id ? savedStudent : student
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error(
        "Error updating student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteStudent(studentToDelete._id);
      setStudents(
        students.filter((student) => student._id !== studentToDelete._id)
      );
      handleCloseDeleteModal();
    } catch (error) {
      console.error(
        "Error deleting student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Students</h2>
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "200px", marginRight: "10px" }}
          />
          <Button variant="primary" onClick={handleShowCreateModal}>
            Add Student
          </Button>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Enroll Number</th>
            <th>Date of Admission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.enrollNumber}</td>
              <td>{new Date(student.dateOfAdmission).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowEditModal(student)}
                  className="btn-edit"
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleShowDeleteModal(student)}
                  className="btn-edit"
                >
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateStudentModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleSave={handleSaveStudent}
      />
      <EditStudentModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleSave={handleUpdateStudent}
        student={studentToEdit}
      />
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default StudentTable;
