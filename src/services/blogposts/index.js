import express from "express"
import createHttpError from "http-errors"
import BlogsModel from "./schema.js"

const blogsRouter = express.Router()

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new BlogsModel(req.body) 
    const { _id } = await newBlog.save() 
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await BlogsModel.find()
    res.send(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId

    const blog = await BlogsModel.findById(blogId)
    if (blog) {
      res.send(blog)
    } else {
      next(createHttpError(404, `blog with id ${blogId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId
    const updatedBlog = await BlogsModel.findByIdAndUpdate(blogId, req.body, {
      new: true, 
    })
    if (updatedBlog) {
      res.send(updatedBlog)
    } else {
      next(createHttpError(404, `blog with id ${blogId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId
    const deletedBlog = await BlogsModel.findByIdAndDelete(blogId)
    if (deletedBlog) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `blog with id ${blogId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default blogsRouter;