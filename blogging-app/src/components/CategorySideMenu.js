import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { getCategories } from '../services/category-service';

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(categories => {
      setCategories(categories);
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <ListGroup>
      <ListGroupItem action={true} tag={Link} to="/">
        All Blogs
      </ListGroupItem>
      {
        categories &&
        categories.map(category => (
          <ListGroupItem action={true} key={category.categoryId} tag={Link} to={"/categories/"+category.categoryId}>
            {category.categoryTitle}
          </ListGroupItem>
        ))
      }
    </ListGroup>
  )
}

export default CategorySideMenu;