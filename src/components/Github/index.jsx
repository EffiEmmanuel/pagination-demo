import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import Pagination from "./Pagination";

function Github() {
  const [githubBasicDetails, setGithubBasicDetails] = useState([]);
  const [repositories, setRepositories] = useState([]);

  async function fetchGithubDetails() {
    await axios
      .get("https://api.github.com/users/EffiEmmanuel")
      .then((res) => {
        console.log("RES.DATA:", res.data);
        setGithubBasicDetails(res.data);
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
  }

  async function fetchRepositories() {
    await axios
      .get("https://api.github.com/users/EffiEmmanuel/repos")
      .then((res) => {
        console.log("RES.DATA:", res.data);
        setRepositories(res.data);
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
  }

  useEffect(() => {
    fetchGithubDetails();
    fetchRepositories();
  }, []);


  return (
    <div>
      <h3>{githubBasicDetails?.name}</h3>
      <h6>{githubBasicDetails?.bio}</h6>
      <hr />
      <h2>Repositories</h2>
      <ErrorBoundary>
        <Pagination data={repositories} />
      </ErrorBoundary>
    </div>
  );
}

export default Github;
