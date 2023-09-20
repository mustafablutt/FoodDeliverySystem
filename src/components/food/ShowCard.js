import React from 'react';
import BasicCard from './FoodCard';

import { useFood } from '../../context/FoodContext';

const ShowCard = () => {
  const { Foods } = useFood();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {Foods.foods &&
        Foods.foods.map((food) => (
          <BasicCard
            key={food._id}
            id={food._id}
            name={food.name}
            price={food.price}
            imageUrl={food.imageUrl}
            description={food.description}
          />
        ))}
    </div>
  );
};

export default ShowCard;
