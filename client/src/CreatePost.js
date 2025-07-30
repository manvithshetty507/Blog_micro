import "./styles/createPost.css";
import axios from "axios";
import { useState } from "react";

const CreatePost = ({ state, dispatch }) => {
  const [data, setData] = useState();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { postTitle, postContent } = event.target;
      const { data } = await axios.post("http://localhost:5000/posts", {
        title: postTitle.value,
        content: postContent.value,
      });

      setData(data);
      console.log("Post created successfully:", data);

      dispatch({
        type: "ADD_POST",
        payload: {
          id: data.id, // ✅ directly use the response
          title: data.title,
          content: data.content,
        },
      });

      console.log("Post created!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      {/* Add form or components to create a post here */}
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="postTitle">Post Title:</label>
          <input type="text" id="postTitle" name="postTitle" required />
        </div>
        <div>
          <label htmlFor="postContent">Post Content:</label>
          <textarea id="postContent" name="postContent" required></textarea>
        </div>
        <button type="submit" className="createPostButton">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
