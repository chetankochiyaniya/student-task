import React, { useState } from 'react';
import './main.css';
import studentData from "../data/student.json";

const Main = () => {
  const [students, setStudents] = useState(studentData);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [editing, setEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    name: '',
    email: '',
    phone: '',
    marks: '',
    pass: '',
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (id, updatedStudent) => {
    setEditing(false);
    setStudents(students.map((student) => (student.id === id ? updatedStudent : student)));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const editRow = (student) => {
    setEditing(true);
    setCurrentStudent({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      marks: student.marks,
      pass: student.pass,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!editing) {
      const id = Math.floor(Math.random() * 10000) + 1;
      addStudent({ id, ...currentStudent });
    } else {
      updateStudent(currentStudent.id, currentStudent);
    }
    setCurrentStudent({
      name: '',
      email: '',
      phone: '',
      marks: '',
      pass: '',
    });
  };

  const onChange = (e) => {
    setCurrentStudent({ ...currentStudent, [e.target.name]: e.target.value });
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const renderStudents = currentStudents.map((student, index) => (
    <tr key={index}>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.phone}</td>
      <td>{student.marks}</td>
      <td>{student.pass ? 'Pass' : 'Fail'}</td>
      <td>
        <button onClick={() => editRow(student)}>Edit</button>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </td>
    </tr>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(students.length / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button key={number} onClick={() => paginate(number)}>
      {number}
    </button>
  )
);

return (
  <div>
    <h3 className='center_css'>Student Information List</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Marks</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{renderStudents}</tbody>
    </table>
    <div className='center_css'>
      {renderPageNumbers}
    </div>
    <h2>{editing ? 'Edit Student' : 'Add Student'}</h2>
    <form onSubmit={onSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={currentStudent.name} onChange={onChange} required />
      <label>Email:</label>
      <input type="email" name="email" value={currentStudent.email} onChange={onChange} required />
      <label>Phone:</label>
      <input type="tel" name="phone" value={currentStudent.phone} onChange={onChange} required />
      <label>Marks:</label>
      <input type="number" name="marks" value={currentStudent.marks} onChange={onChange} required />
      <label>Status:</label>
      <select name="pass" value={currentStudent.pass} onChange={onChange} required>
        <option value="">--Please Select--</option>
        <option value="true">Pass</option>
        <option value="false">Fail</option>
      </select>
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
    </form>
  </div>
);
};

export default Main;

