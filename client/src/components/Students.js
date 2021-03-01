
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Student.scss';
import { BrowserRouter as Router,Switch, Route,Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/users">Students</Link>
            </li>
            <li>
              <Link to="/createclass">Create Course</Link>
            </li>
            <li>
              <Link to="/classes">Courses</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/classes">
            <DisplayClasses />
          </Route>
          <Route path="/createclass">
            <CreateClass />
          </Route>
          <Route path="/register">
            <RegisterStudent />
          </Route>
          <Route path="/users">
            <DisplayStudents />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Welcome Page</h2>;
}

function DisplayStudents(){
  const [students, setStudents] = useState(null);

  async function getStudents() {
    try {
      // const res = await axios.get('https://git.heroku.com/stark-island-50875.git/students');
      const res = await axios.get('http://localhost:8080/students');
      setStudents(res.data);
    } catch(e) {
      console.error(e, e.message);
    }
  }

  useEffect(() => {
    getStudents();
  }, [])

  const [selectedStudent, setSelectedStudent] = useState(null);

  function selectStudent(student) {
    setSelectedStudent(student)
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  }

  async function handleEditSubmit(e) {
    // e.preventDefault();
    try {
      const res = await axios.patch('http://localhost:8080/students', selectedStudent);
      console.log(res.data);
      getStudents();
    } catch(e) {
      console.error(e, e.message);
    }
  }

  async function deleteStudent(studentId) {
    try {
      const res = await axios.delete('http://localhost:8080/students/' + studentId);
      console.log(res.data);
      getStudents();
    } catch(e) {
      console.error(e, e.message);
    }
  }

  return(
    <div>
      { students && students.map(student => <Student student={ student } selectStudent={ selectStudent } deleteStudent={ deleteStudent } />)}

      <div>
        { selectedStudent && <form
          onChange={ (e) => handleEditChange(e) }
          onSubmit={ (e) => handleEditSubmit(e) }>
          <label>
            First Name:
            <input type="text" name="firstName" defaultValue={ selectedStudent.firstName } />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" defaultValue={ selectedStudent.lastName } />
          </label>
          <label>
            Age:
            <input type="text" name="age" defaultValue={ selectedStudent.age } />
          </label>
          <label>
            Grade Level:
            <input type="text" name="grade" defaultValue={ selectedStudent.grade } />
          </label>
          <label>
            School Name:
            <input type="text" name="schoolName" defaultValue={ selectedStudent.schoolName } />
          </label>
          <input type="submit" value="Edit student information" />
        </form> }
      </div>
    </div>
  )
}

function RegisterStudent() {
  const [students, setStudents] = useState(null);

  const [form, setForm] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    createStudent();
  }

  async function createStudent() {
    try {
      const res = await axios.post('http://localhost:8080/students', form);
      setStudents([students, res.data]);
    } catch(e) {
      console.error(e, e.message);
    }
  }

  return(
      <div>
        <h2>Enroll a new student!</h2>
        <form
          className="enroll-student-form"
          onChange={ (e) => handleChange(e) }
          onSubmit={ (e) => handleSubmit(e) }>
          <label>
            First Name:
            <input type="text" name="firstName" />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" />
          </label>
          <label>
            Age:
            <input type="text" name="age" />
          </label>
          <label>
            Grade Level:
            <input type="text" name="grade" />
          </label>
          <label>
            School Name:
            <input type="text" name="schoolName" />
          </label>
          <input type="submit" value="Enroll student" className="button success" />
        </form>
      </div>
  )
}

function Student({ student, selectStudent, deleteStudent }) {
  return (
    <div className="student" key={ student.id }>
      <h3 className="full-name-description">The students full name is <span className="first-name">{ student.firstName }</span> <span className="last-name">{ student.lastName }</span></h3>
      <h6>He/she is currently in grade <span className="grade-level">{ student.grade }</span></h6>
      <button className="select-student-button" onClick={ () => selectStudent(student) }>Edit student</button>
      <button onClick={ () => deleteStudent(student.id) }>Delete Student</button>
      <button>Enroll Courses</button>

      
    </div>
  )
}

function CreateClass() {
  const [classes, setClasses] = useState(null);

  const [form, setForm] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    createClass();
  }

  async function createClass() {
    try {
      const res = await axios.post('http://localhost:8080/classes', form);
      setClasses([classes, res.data]);
      console.log(classes)
    } catch(e) {
      console.error(e, e.message);
    }
  }

  return(
      <div>
        <h2>Create a new course.</h2>
        <form
          className="enroll-student-form"
          onChange={ (e) => handleChange(e) }
          onSubmit={ (e) => handleSubmit(e) }>
          <label>
            Course Name:
            <input type="text" name="className" />
          </label>
          <label>
            Course Number:
            <input type="text" name="classNumber" />
          </label>
          <input type="submit" value="Create Class" className="button success" />
        </form>
      </div>
  )
}

function DisplayClasses(){
  const [classes, setClasses] = useState(null);

  async function getClasses() {
    try {
      // const res = await axios.get('https://git.heroku.com/stark-island-50875.git/students');
      const res = await axios.get('http://localhost:8080/classes/');
      setClasses(res.data);
    } catch(e) {
      console.error(e, e.message);
    }
  }

  useEffect(() => {
    getClasses();
  }, [])

  const [selectedClass, setSelectedClass] = useState(null);

  function selectClass(student) {
    setSelectedClass(student)
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setSelectedClass({ ...selectedClass, [name]: value });
  }

  async function handleEditSubmit(e) {
    // e.preventDefault();
    try {
      const res = await axios.patch('http://localhost:8080/classes/', selectedClass);
      console.log(res.data);
      getClasses();
    } catch(e) {
      console.error(e, e.message);
    }
  }

  async function deleteClass(studentId) {
    try {
      const res = await axios.delete('http://localhost:8080/classes/' + studentId);
      console.log(res.data);
      getClasses();
    } catch(e) {
      console.error(e, e.message);
    }
  }

  return(
    <div>
      { classes && classes.map(classes => <Class classes={ classes } selectClass={ selectClass } deleteClass={ deleteClass } />)}

      <div>
        { selectedClass && <form
          onChange={ (e) => handleEditChange(e) }
          onSubmit={ (e) => handleEditSubmit(e) }>
          <label>
            First Name:
            <input type="text" name="className" defaultValue={ selectedClass.className } />
          </label>
          <label>
            Last Name:
            <input type="text" name="classNumber" defaultValue={ selectedClass.classNumber } />
          </label>
          
          <input type="submit" value="Edit Course Information" />
        </form> }
      </div>
    </div>
  )
}


function Class({ classes, selectClass, deleteClass }) {
  return (
    <div className="student" key={ classes.id }>
      <h3 className="full-name-description">Course Description: </h3>
      <h4> Department: { classes.className } </h4>
      <h4> Course Number: { classes.classNumber }</h4>
      <button className="select-student-button" onClick={ () => selectClass(classes) }>Edit Class</button>
      <button onClick={ () => deleteClass(classes.id) }>Delete Class</button>
      <button>Enroll Students</button>

    </div>
  )
}