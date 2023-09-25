import React, { useEffect, useState } from 'react';
import '../styles/FoodCard/FoodCardDetail.css';

import { Rating } from '@mui/material';
import AddComment from '../components/comment/AddComment';

import { Button } from '@mui/material';
import CommentCard from '../components/comment/CommentCard';
import { useComment } from '../context/Comment/CommentContext';
import { Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useFood } from '../context/Food/FoodContext';

const FoodCardDetail = ({ food }) => {
  const { id } = useParams();
  const { getFoodById } = useFood();
  const { comments, getComments } = useComment();
  const navigate = useNavigate();

  const [foodStats, setFoodStats] = useState(null);
  const { getFoodStats } = useComment();

  useEffect(() => {
    const fetchFoodStats = async () => {
      const stats = await getFoodStats(id);
      setFoodStats(stats);
    };

    fetchFoodStats();
  }, [id, getFoodStats]);

  useEffect(() => {
    if (!food && id) {
      getFoodById(id);
    }
  }, [food, id, getFoodById]);

  useEffect(() => {
    if (food) {
      getComments(food._id);
    }
  }, [food, getComments]);

  const handleClick = () => {
    navigate('/cart-detail');
  };

  if (!food) return <p>Loading...</p>;

  return (
    <>
      <div class="container" style={{ marginTop: -160 }}>
        <div class="box">
          <div class="images">
            <div
              class="img-holder active"
              style={{ width: 300, height: 400, objectFit: 'cover' }}
            >
              <img
                src={food.imageUrl}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div class="basic-info">
            <h1>{food.name}</h1>
            <p>{food.description}</p>

            <div class="description">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
                temporibus corporis repudiandae, consectetur nostrum nisi
                commodi placeat rerum molestias numquam nihil accusantium
                deleniti! Enim, nesciunt a quis amet hic officia. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Molestiae nemo
                accusantium tempora facere doloremque cum iusto, ut neque, fuga
                omnis libero laborum ullam. At dolorum qui atque labore illo
                dignissimos.
              </p>
            </div>

            <span>{food.price} TL</span>
            <div
              style={{
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={handleClick}
                variant="contained"
                style={{
                  marginRight: '30px',
                  backgroundColor: '#FF4C01',
                  '&:hover': {
                    backgroundColor: 'red',
                  },
                }}
              >
                Sepete Git
              </Button>
              <AddComment food={food}></AddComment>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: -280, padding: 100 }}>
        <div style={{ padding: 20 }}>
          <h2>Müşteri Yorumları</h2>
          <Paper style={{ padding: '40px 20px', marginBottom: 30 }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Rating
                name="read-only"
                value={foodStats?.avgRating || 0}
                precision={0.1}
                readOnly
              />
              <h5
                style={{ marginLeft: '30px' }}
              >{`Müşterilerimiz Yemek Hakkında ${
                foodStats?.commentCount || 0
              } Değerlendirmede Bulundu`}</h5>
            </Grid>
          </Paper>
        </div>
        {comments &&
          comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
      </div>
    </>
  );
};

export default FoodCardDetail;
