import React, { useState, useEffect } from 'react';
import BasicCard from '../components/food/FoodCard';
import NavTabs from '../components/filterTab/FilterTab';
import { useFood } from '../context/Food/FoodContext';
import { useFilter } from '../context/Filter/FilterContext';

const ShowCard = () => {
  const { Foods } = useFood();
  const { filter } = useFilter();

  const [sortedFoodsList, setSortedFoodsList] = useState([]);

  useEffect(() => {
    let sortedFoods = [...(Foods.foods || [])];

    switch (filter) {
      case 'likes':
        sortedFoods.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case 'comments':
        sortedFoods.sort((a, b) => b.commentCount - a.commentCount);
        break;
      case 'asc':
        sortedFoods.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'desc':
        sortedFoods.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setSortedFoodsList(sortedFoods);
  }, [filter, Foods.foods]);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <NavTabs />
      {sortedFoodsList.map((food) => (
        <BasicCard
          key={food._id}
          id={food._id}
          name={food.name}
          price={food.price}
          imageUrl={food.imageUrl}
          description={food.description}
          avgRating={food.avgRating}
          commentCount={food.commentCount}
        />
      ))}
    </div>
  );
};

export default ShowCard;
