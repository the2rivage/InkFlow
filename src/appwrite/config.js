import conf from "../conf/conf";
import { Client, Storage, TablesDB, ID, Query } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userID,
    username,
  }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage: featuredImage || "placeholderImage123",
          status,
          userID,
          username,
        },
      });
    } catch (error) {
      console.log("Appwrite servise :: create post :: error ", error);
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite servise :: update post :: error ", error);
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite servise :: delete post :: error ", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite servise :: get post :: error ", error);
      return false;
    }
  }
  async listPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries: queries,
      });
    } catch (error) {
      console.log("Appwrite servise :: list posts :: error ", error);
      return false;
    }
  }
  // file upload method
  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite servise :: upload file :: error ", error);
      return false;
    }
  }
  async deleteFile(id) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: id,
      });
      return true;
    } catch (error) {
      console.log("Appwrite servise :: delete file :: error ", error);
      return false;
    }
  }
  getFilePreview(id) {
    return this.bucket.getFileView({
      bucketId: conf.appwriteBucketId,
      fileId: id,
    });
  }
}

const service = new Service();
export default service;
