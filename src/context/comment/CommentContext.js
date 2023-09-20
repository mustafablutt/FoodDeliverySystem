import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useFood } from '../FoodContext';

export const CommentContext = createContext();

export const useComment = () => {
  return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const { user } = useAuth();
  const { getAllFoodsWithStats } = useFood();

  const apiEndpoint = 'http://localhost:5000';

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    getComments();
  }, []);

  const addComment = async (foodId, text, rating) => {
    try {
      const response = await fetch(`${apiEndpoint}/addcomment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodId, text, rating }),
      });

      const data = await response.json();

      if (data.succeded) {
        getComments(foodId);
        getAllFoodsWithStats();

        return { succeeded: true, message: 'Comment added successfully' };
      } else {
        return {
          succeeded: false,
          message: data.message || 'Failed to add comment',
        };
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      return {
        succeeded: false,
        message: 'An error occurred while adding the comment.',
      };
    }
  };

  const getComments = useCallback(async (foodId) => {
    try {
      const response = await fetch(`${apiEndpoint}/getcomments/${foodId}`, {});

      const data = await response.json();

      if (data.succeded) {
        setComments(data.comments);
      }
    } catch (error) {
      console.log('Error fetching comments:', error);
    }
  }, []);

  const getFoodStats = async (foodId) => {
    try {
      const response = await fetch(`${apiEndpoint}/getfoodstats/${foodId}`);

      const data = await response.json();

      if (data.succeded) {
        return data.stats;
      }
    } catch (error) {
      console.error('Error fetching food stats:', error);
    }
    return null;
  };

  return (
    <CommentContext.Provider
      value={{ comments, addComment, getComments, getFoodStats }}
    >
      {children}
    </CommentContext.Provider>
  );
};
