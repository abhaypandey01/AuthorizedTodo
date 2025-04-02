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
    this.handleTabClose(); // Attach event listener
  }

  // Listen for tab close and logout user
handleTabClose() {
  window.addEventListener("beforeunload", async () => {
    try {
      await this.logout(); // Call logout when tab is closed
    } catch (error) {
      console.error("Error logging out on tab close:", error);
    }
  });
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
      if (useraccount) {
        return this.login({email, password})
      } else {
        return useraccount;
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
