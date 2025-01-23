import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
  return (
    <div>
      <h1>Choose a Category</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index} style={{ margin: '10px 0' }}>
            <Link
              to={`/category/${index}`}
              style={{
                textDecoration: 'none',
                color: '#007BFF',
                fontWeight: 'bold',
              }}
            >
              {category.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
