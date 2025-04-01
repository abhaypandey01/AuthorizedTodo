import React from 'react';
import { Container, AddTodo as AddtodoComponent } from "../components";

function AddTodo() {
  return (
        <Container className='py-8'>
            <AddtodoComponent />
        </Container>
  )
}

export default AddTodo;