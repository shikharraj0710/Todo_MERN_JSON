import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [newValue, setNewValue] = useState("");

  const getTodos = async () => {
    const response = await axios.get("/manageTodo", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 201) {
      console.log("Todo Received!!!", response);
      setData(response.data.data);
    }
  };

  const handleDelete = async (name) => {
    const res = await axios.delete(`/manageTodo/${name}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.status === 201) {
      getTodos();
    }
  };

  const handleEdit = async (id) => {
    document.querySelectorAll(".show")[id].classList.toggle("d-none");
  };
  const handleEditSave = async (name) => {
    var formdata = {
      value: newValue,
    };
    const res = await axios.put(`/manageTodo/:${name}`, formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      getTodos();
    }
  };
  const handleDeleteThird = async () => {
    const res = await axios.delete("/manageTodo", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.status === 201) {
      getTodos();
    }
  };
  const handleUpdateSecond = async () => {
    const res = await axios.put("/manageTodo", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      getTodos();
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="container mt-2">
        <h1 className="text-center mt-2">Todos Management</h1>
        <div className="text-center ">
          <Button variant="danger" className="me-5" onClick={handleDeleteThird}>
            Remove 3rd Todo
          </Button>
          <Button
            variant="danger"
            className="me-5"
            onClick={handleUpdateSecond}
          >
            Update 2nd Position
          </Button>
          <Button variant="primary" className="me-5">
            <NavLink to="/addTodo" className="text-light text-decoration-none">
              Add Todo
            </NavLink>
          </Button>
        </div>
        {data.length > 0 && (
          <>
            <Table striped bordered hover variant="dark" className="my-5">
              <thead>
                <tr className="text-center">
                  <th>Todo</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td className="text-center">{d.name}</td>

                    <div className="d-none show">
                      <p className="text-center">
                        <input
                          type="text"
                          defaultValue={d.name}
                          onInput={(e) => setNewValue(e.target.value)}
                        />
                      </p>
                      <p>
                        <Button
                          variant="success"
                          onClick={() => handleEditSave(d.name)}
                        >
                          Save
                        </Button>
                      </p>
                    </div>

                    <td>
                      <Button variant="warning" onClick={() => handleEdit(i)}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(d.name)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
