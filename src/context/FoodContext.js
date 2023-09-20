import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const FoodContext = createContext();

export const useFood = () => {
  return useContext(FoodContext);
};

export const FoodProvider = ({ children }) => {
  const [Foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const token = localStorage.getItem('authToken');

  const apiEndpoint = 'http://localhost:5000';

  const getAllFoodsWithStats = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/getallfoodswithstats`);
      setFoods(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFoodsWithStats();
  }, []);

  const getFoodById = async (id) => {
    try {
      const response = await axios.get(`${apiEndpoint}/getfoodbyid/${id}`, {});
      setSelectedFood(response.data.food);
    } catch (error) {
      console.log('Error fetching food by ID:', error);
    }
  };

  return (
    <FoodContext.Provider
      value={{ Foods, selectedFood, getFoodById, getAllFoodsWithStats }}
    >
      {children}
    </FoodContext.Provider>
  );
};
