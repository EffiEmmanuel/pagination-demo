import React from "react";

function RepoDetailPage({ item }) {
  return (
    <div>
      <h5 className="card-title">ID: {item.id}</h5>
      <p className="card-title">Repository: {item.name}</p>
      <p className="card-text">Description: {item.description}</p>
      <p className="card-text">Owner: {item.owner.login}</p>
      <p className="card-text">
        URL: <a href={item.url}>{item.url}</a>
      </p>
      <p className="card-text">Last commit: {item.updated_at}</p>
    </div>
  );
}

export default RepoDetailPage;
