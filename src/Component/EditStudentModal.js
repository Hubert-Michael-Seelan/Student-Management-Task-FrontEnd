// EditStudentModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditStudentModal = ({ show, handleClose, handleSave, student }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [enrollNumber, setEnrollNumber] = useState("");
  const [dateOfAdmission, setDateOfAdmission] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setPhoneNumber(student.phoneNumber);
      setEnrollNumber(student.enrollNumber);
      setDateOfAdmission(
        new Date(student.dateOfAdmission).toISOString().split("T")[0]
      );
    }
  }, [student]);

  const onSave = () => {
    const updatedStudent = {
      ...student,
      name,
      email,
      phoneNumber,
      enrollNumber,
      dateOfAdmission,
    };
    handleSave(updatedStudent);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEnrollNumber" className="mt-3">
            <Form.Label>Enroll Number</Form.Label>
            <Form.Control
              type="text"
              value={enrollNumber}
              onChange={(e) => setEnrollNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDateOfAdmission" className="mt-3">
            <Form.Label>Date of Admission</Form.Label>
            <Form.Control
              type="date"
              value={dateOfAdmission}
              onChange={(e) => setDateOfAdmission(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStudentModal;
