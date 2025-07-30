import CreatePost from "./CreatePost";
import PostReducer from "./utils/reducer";
import React, { useReducer, useEffect } from "react";
import axios from "axios";

const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

const initialState = {
  posts: [],
};

const App = () => {
  const [state, dispatch] = useReducer(PostReducer, initialState);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchPosts();
      dispatch({ type: "SET_POSTS", payload: posts });
    };
    loadPosts();
  }, []);

  return (
    <div>
      <h1>Blog App</h1>
      <CreatePost state={state} dispatch={dispatch} />
      <hr />
      <h2>Posts</h2>
      {state.posts.length > 0 ? (
        <ul>
          {state.posts.map((post, index) => (
            <li key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default App;
