import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';


const SubmitRequest = () => {
  const [selected, setSelected] = useState([]);
  const [llmOutput, setllmOutput] = useState("");
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  const [show, setshow] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [textareaValue, setTextareaValue] = useState("");

  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    console.log("Here I am ");

  };

  const submitPreference = async () => {
    try {
      console.log(selected)
      let input = ""
      selected.forEach(course => {
        input += (course.label + " and")
      });
      setllmOutput("")
      input = input.substring(0, input.length - 4);

      let prompt = `Give Coursework on ${input}`
      console.log(prompt);
      //let response=""
      setShowLoader(true)
      setResponseMessage("Please Wait while we create a coursework for you");
      const response = await axios.post('http://127.0.0.1:5000/coursecraft/create-test', { "prompt": prompt });

      console.log(response)
      console.log('POST Request Response:', response.data.message)
      setShowLoader(false)

      // Set the response message to display
      setllmOutput(response.data.message)
      setResponseMessage("");
    } catch (error) {
      console.error('Error:', error);
      // Handle errors, e.g., show an error message to the user.
      setllmOutput("")
      setResponseMessage('An error occurred.');
    }
  }

  const submitIR = async () => {
    try {
      console.log(selected)
      let input = "Give me coursework for the following courses combined:"

      selected.forEach(course => {
        input += (course.label + " and ")
      });

      input += textareaValue
      setllmOutput("")
      input = input.substring(0, input.length - 4);

      let prompt = `Give Coursework on ${input}`
      console.log(prompt);
      
      //let response=""

      setShowLoader(true)
      setResponseMessage("Please Wait while we create a coursework for you");
      console.log(prompt)
      // const response = await axios.post('http://127.0.0.1:5000/coursecraft/create-test-for-ir', { "prompt": prompt });

      // console.log(response)
      // console.log('POST Request Response:', response.data.message)
    
      // Set the response message to display
      // setllmOutput(response.data.message)
      
      setShowLoader(false)
      setllmOutput("Test Response")
      setResponseMessage("");
    } catch (error) {
      console.error('Error:', error);
      // Handle errors, e.g., show an error message to the user.
      setllmOutput("")
      setResponseMessage('An error occurred.');
    }
  }
  const handloutputset = () => {
    if (show === true) {
      setllmOutput("")
      setshow(false)
    }
    else {
      console.log("Heree");
      submitPreference();
      setshow(true)
    }
  }

  const handloutputsetir = () => {
    if (show === true) {
      setllmOutput("")
      setshow(false)
    }
    else {
      console.log("Heree");
      submitIR();
      setshow(true)
    }
  }

  const handleoutputreset = () => {
    if (show === true) {
      setResponseMessage("")
      setshow(false)
    }
    else
      setshow(true)

    setFormData({
      title: '',
      body: '',
    })
    setTextareaValue("")
    setSelected([])
  }


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const option = [
    { value: "Machine Learning ", label: "Machine Learning" },
    { value: "Computer Vision ", label: "Computer Vision" },
    { value: "Data Structures", label: "Data structures" },
    { value: "Distributed System", label: "Distributed System" },
    { value: "IOT", label: "IOT" },
    { value: "System Security", label: "System Security" }
  ]

  return (
    <>
      <div>
        <Container style={{ marginTop: 30, marginLeft: 100 }}>
        {/* <Card.Header className='cardheader'> */}
              <h3 className='d-flex justify-content-center'>Create Your Coursework</h3>
            {/* </Card.Header> */}
          <Card rounded={false} style={{boxShadow: '0 0.1rem 0.1rem rgba(0, 0, 0, 0.5), 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3)'}}>
            
            <Card.Body className='cardbody' style={{ opacity: 1 }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "black", fontSize: "20px" }}>Select courses</Form.Label>
                  <div>
                    <Select options={option}
                      value={selected}
                      onChange={setSelected}
                      isMulti
                      isSearchable
                      defaultValue={"Pease select"}
                    />

                  </div>

                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "black", fontSize: "20px" }}>Additional  requirements?</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="body"
                    rows={2}
                    value={textareaValue}
                    onChange={handleTextareaChange}
                  />
                </Form.Group>
                {!show && <div className='d-flex justify-content-center'><Button style={{backgroundColor:"rgb(33,37,41)"}} onClick={handloutputset}>
                  Create Your Course
                </Button><Button style={{backgroundColor:"rgb(33,37,41)"}} className='mx-5' onClick={handloutputsetir}>
                    Find 
                  </Button></div>
                }
                {

                  show &&
                  <Form.Group className="mb-2">
                    <Form.Label style={{ color: "black", fontSize: "20px" }}>Output</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="body"
                      rows={8}
                      value={llmOutput}
                      onChange={handleChange}
                    />
                    <div className='d-flex justify-content-center' style={{ marginTop: 10 }}>
                      <Button style={{backgroundColor:"rgb(33,37,41)"}} onClick={handleoutputreset}>
                        Reset
                      </Button>
                    </div>
                  </Form.Group>


                }
              </Form>
              {showLoader && <>
                <div style={{ textAlign: "center" }}><span className="loader"></span></div>
              </>}
              {/* <div className="mt-3">
            <p>{responseMessage}</p>
          </div> */}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default SubmitRequest;
