import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Categories.css";
import { useTranslate } from "../../translate/LanguageContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const translate = useTranslate();
  useEffect(() => {
    // Fetch categories from the backend API
    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <>
      <div className="title">{translate('categories')}</div>
      <div className="grid-container">
        {categories.map((category) => (
          <div className="grid-item" key={category.id}>
            <Link to={`Category/${category.name}`}>
              <img src={category.image} alt={category.name} />
            </Link>
            <p className="name">{category.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
