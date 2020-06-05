import React from "react";

export default ({ comments }) => {
  const renderedComments = Object.values(comments).map((comment) => {
    return (
      <li key={comment.id}>
        {comment.content} <i> {comment.status} </i>
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};
