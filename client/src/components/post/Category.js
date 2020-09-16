import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from 'reactstrap';

const Categroy = ({ posts }) => {
  console.log(posts); // 넘어 오는 것 확인

  return (
    <>
      {Array.isArray(posts)
        ? posts.map(({ _id, categoryName, posts }) => (
            <div key={_id} className="mx-1 mt-1 my_category">
              <Link
                to={`/post/category/${categoryName}`}
                className="text-dark text-decoration-none"
              >
                <span className="ml-1">
                  <Button color="info">
                    {categoryName} <Badge color="light">{posts.length}</Badge>
                  </Button>
                </span>
              </Link>
            </div>
          ))
        : ''}
    </>
  );
}; // end of const Categroy = ({ posts }) => {

export default Categroy;
