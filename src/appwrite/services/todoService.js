import { Client, Databases, ID } from "appwrite";
import configure from "../../configure/configure";

export class TodoService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(configure.url) // Your API Endpoint
      .setProject(configure.projectId); // Your Project ID
    this.databases = new Databases(this.client);
  }

  // ✅ Create Todo
  async createTodo({ userId, text }) {
    if (!userId || !text) {
      throw new Error("Invalid input: userId and text are required.");
    }
    try {
      return await this.databases.createDocument(
        configure.databaseId,
        configure.collectionId,
        ID.unique(),
        { userId, text, completed: false },
      );
    } catch (error) {
      console.error("Error in createTodo:", error);
      throw error;
    }
  }

  // ✅ Get Todos for Logged-in User
  async getTodos(userId) {
    if (!userId) {
      throw new Error("Invalid input: userId is required.");
    }
    try {
      return await this.databases.listDocuments(
        configure.databaseId,
        configure.collectionId,
        [`equal("userId", "${userId}")`, `orderDesc("createdAt")`],
      );
    } catch (error) {
      console.error("Error in getTodos:", error);
      throw error;
    }
  }

  // ✅ Update Todo (Mark Complete or Edit Text)
  async updateTodo(todoId, updates) {
    if (!todoId || !updates) {
      throw new Error("Invalid input: todoId and updates are required.");
    }
    try {
      return await this.databases.updateDocument(
        configure.databaseId,
        configure.collectionId,
        todoId,
        updates,
      );
    } catch (error) {
      console.error("Error in updateTodo:", error);
      throw error;
    }
  }

  // ✅ Delete Todo
  async deleteTodo(todoId) {
    if (!todoId) {
      throw new Error("Invalid input: todoId is required.");
    }
    try {
      return await this.databases.deleteDocument(
        configure.databaseId,
        configure.collectionId,
        todoId,
      );
    } catch (error) {
      console.error("Error in deleteTodo:", error);
      throw error;
    }
  }
}

const todoservice = new TodoService();
export default todoservice;
