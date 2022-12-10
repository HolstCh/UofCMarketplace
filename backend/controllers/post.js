import Post from "../models/post";
import Student from "../models/student";
import { getAdmin } from "./admin";
import { getStudent } from "./student";
const { ObjectId } = require("mongodb");

export const deleteAdminPost = async (req, res) => {
  try {
    const { postID } = req.body;
    const addy = await getAdmin(req, res);
    if (!addy) return res.json({ error: "Access Denied" });
    const myPost = await Post.findById(ObjectId(postID));
    if (!myPost) return res.json({ error: "No Post Found" });

    await Post.deleteOne(ObjectId(postID));
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMyPost = async (req, res) => {
  try {
    const { postID } = req.body;
    const stu = await getStudent(req, res);
    const myPost = await Post.findById(ObjectId(postID));
    if (!myPost) return res.json({ error: "No Post Found" });

    console.log("mypost= ", ObjectId(myPost.ownerID));
    console.log("mystudent= ", stu._id);

    if (!stu) return res.json({ error: "Access Denied" });
    if (myPost.ownerID != stu._id)
      return res.json({
        error: "Access Denied post owner is not student owner",
      });
    await Post.deleteOne(ObjectId(postID));
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const stu = await getStudent(req, res);
    if (!stu) return res.json({ error: "Access Denied" });
    const myPosts = await Post.find({ ownerID: stu._id });
    if (!myPosts) {
      res.json({ error: "No posts found by student" });
    }
    res.status(200).json({ msg: myPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    // const addy = await getAdmin(req, res);
    // if (!addy) return res.json({ error: "Access Denied" });
    const allPosts = await Post.find();
    if (!allPosts) {
      res.json({ error: "No posts found" });
    }
    res.status(200).json({ msg: allPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { postID } = req.body;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewPost = async (req, res) => {
  try {
    const stu = await getStudent(req, res);
    if (!stu) return res.json({ error: "Access Denied" });
    const { adType, price, description, productType, contact, title } =
      req.body;
    console.log("req user= ", req.user);
    const newPost = new Post({
      title: title,
      ownerID: stu._id,
      price: price,
      desc: description,
      productType: productType,
      contactInfo: contact ? contact : stu.email,
      adType: adType,
    });
    const postResult = await newPost.save();
    if (!postResult) {
      res.json({ error: "error saving new post" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
