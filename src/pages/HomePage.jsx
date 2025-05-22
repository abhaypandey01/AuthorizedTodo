import React from "react";
import { Container } from "../components"

function HomePage() {
    return (
        <Container className="text-white text-2xl font-semibold">
        <div>
            <h2>
            This is a simple website for adding, updating and deleting personalized
            todos. Please Log in or Sign Up to add your todos.</h2>
        </div>
        </Container>
    );
}

export default HomePage;
