import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      // console.log("Appwrite service :: create account error :: ", error);
      return error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch (error) {
      // console.log("Appwrite service :: login error :: ", error);
      return error;
    }
  }
  async getCurrUser() {
    try {
      return this.account.get();
    } catch (error) {
      // console.log("Appwrite service :: get current user error :: ", error);
      return error;
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      // console.log("Appwrite service :: logout error :: ", error);
      return error;
    }
  }
}

const authService = new AuthService();

export default authService;
