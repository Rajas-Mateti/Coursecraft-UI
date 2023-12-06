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
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    console.log("Here I am ");

  };

  const submitPreference = async() => {
    try {
      console.log(selected)
      let input = ""
      selected.forEach(course => {
        input += (course.label+" and")
      });
      setllmOutput("")
      input = input.substring(0,input.length-4);

      let prompt = `Give Coursework on ${input}`
      console.log(prompt); 
      //let response=""
      setShowLoader(true)
      setResponseMessage("Please Wait while we create a coursework for you");
      const response = await axios.post('http://127.0.0.1:5000/coursecraft/create-test', {"prompt": prompt});

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
  const handloutputset=()=>{
    if(show===true){
      setllmOutput("")
      setshow(false)
    }
    else{
      console.log("Heree");
      submitPreference();
      setshow(true)
    }

  }

  const handleoutputreset=()=>
  { 
  if(show===true){
    setResponseMessage("")
    setshow(false)
  }
  else
    setshow(true)

    setFormData({
      title: '',
      body: '',
    }) 
 
    setSelected([])
  }


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const option=[
    {value:"Machine Learning ", label:"Machine Learning"},
    {value:"Computer Vision ", label:"Computer Vision"},
    {value:"Data Structures", label:"Data structures"},
    {value:"Distributed System", label:"Distributed System"},
    {value:"IOT", label:"IOT"},
    {value:"System Security", label:"System Security"}
    ]
  
  return (
    <>
    <div>
    <Container style={{marginTop:30,marginLeft:100}}> 
      <Card >
        <Card.Header className='cardheader'>
          <h2>Submit a preference</h2>
        </Card.Header>
        <Card.Body className='cardbody' style={{opacity:1}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{color:"black", fontSize:"20px"}}>Select courses</Form.Label>
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
              <Form.Label style={{color:"black", fontSize:"20px"}}>Additional  requirements?</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                rows={2}
                value={formData.body}
                onChange={handleChange}
              />
            </Form.Group>
            {!show &&<Button  onClick={handloutputset}>
              Submit
            </Button>
            }
            {
              
              show &&
              <Form.Group className="mb-2">
              <Form.Label style={{color:"black", fontSize:"20px" }}>Output</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                rows={10}
                value={llmOutput}
                onChange={handleChange}
              />
              <div style={{marginTop:10}}>
                <Button  onClick={handleoutputreset}>
              ReSubmit
            </Button>
            </div>
              </Form.Group>
              
              
            }
          </Form>
          {showLoader && <>
            <div style={{textAlign:"center"}}><span className="loader"></span></div>
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
