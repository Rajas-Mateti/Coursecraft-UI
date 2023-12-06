import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';


const Courses = () => {
      const [courses, setCourses] = useState([]);

      useEffect(() => {
            const getCourses = async (e) => {
                  try {
                        const response = await axios.get('http://127.0.0.1:8000/courses/');
                        for (var i = 0; i < response.length; i++) {
                              console.log(response[i])
                              setCourses([...courses, response[i]]);
                        }

                  } catch (error) {
                        console.error('Error:', error);
                  }
            };

            getCourses();
      }, [])

      return (<>
            <h1>Course Information</h1>
            <ul>
                  {courses.map((course) => (
                        <li key={course.id}>
                              <h2>{course.course_name}</h2>
                              <p>Course Code: {course.course_code}</p>
                              <p>Field: {course.field}</p>
                              <p>Instructor: {course.instructor}</p>
                              <p>Description: {course.description}</p>
                              <p>College: {course.college}</p>
                              <p>Major: {course.major}</p>
                              <p>Time Created: {course.time_created}</p>
                              <p>Time Updated: {course.time_updated || 'Not updated'}</p>
                        </li>
                  ))}
            </ul>
      </>)
};

export default Courses;