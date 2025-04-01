import React from 'react';
import { Container, ListTodos as ListTodosComponent } from "../components";

function ListTodos() {
    return (
        <Container className="py-8">
            <h1 className="text-2xl font-bold text-center mb-6">Your Todos</h1>
            <ListTodosComponent />
        </Container>
    );
}

export default ListTodos;