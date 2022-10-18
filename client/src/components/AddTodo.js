import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AddTodo = () => {
 
    const [name, setName] = useState();
    const history = useNavigate()
    const handleChange = (e) => setName(() => e.target.value)
    const handleSubmit = async(e) => {
        e.preventDefault();
        var formdata = {
          name : name
        }  
        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }
        const response = await axios.post("/manageTodo", formdata, config);
        console.log(response)
        if(response.status == 201) {
          history("/");
        } else {
          console.error("error")
        }

    }
  return (
    <>
    <div className='container mt-5'>
       <h1>Add todo</h1> 
   
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Add Todo</Form.Label>
        <Form.Control type="text" placeholder="Enter Todo " name="name" onInput={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        add
      </Button>
    </Form>
    </div>
    </>
  )
}

export default AddTodo