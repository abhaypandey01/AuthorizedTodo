/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import configure from "../../configure/configure";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(configure.url) // Your API Endpoint
      .setProject(configure.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      // Create the user account
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      // Attempt to log in the user
      try {
        return await this.login({ email, password });
      } catch (loginError) {
        // If login fails, delete the newly created account
        await this.account.delete(useraccount.$id);
        throw new Error(
          "Account creation succeeded, but login failed. The account has been rolled back.",
          loginError,
        );
      }
    } catch (error) {
      throw error; // Re-throw the error for the caller to handle
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getcurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
