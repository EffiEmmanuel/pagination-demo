import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "./Pagination";
import ErrorBoundary from "../ErrorBoundary/";
import useSWR from "swr";

function Users() {
  const [users, setUsers] = useState();

  const url = "https://randomuser.me/api/?results=50";
  const fetcher = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        console.log("RES.DATA:", res.data.results);
        console.log('RES:', res);
        setUsers(res.data.results);
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
  };

  useEffect(() => {
    fetcher(url);
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <p>
        <ErrorBoundary>
          <Pagination data={users} endpoint={url} />
        </ErrorBoundary>
      </p>
    </div>
  );
}

export default Users;
