import React from 'react';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Rating } from '@mui/material';

const CommentCard = ({ comment }) => {
  return (
    <div style={{ margin: 20, marginTop: -16 }}>
      <Paper style={{ padding: '40px 20px', marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt={comment.userId.firstName} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h4
                style={{
                  margin: 0,
                  color: 'red',
                }}
              >
                {comment.userId.firstName} {comment.userId.lastName}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h5 style={{ marginTop: 8 }}>{`${comment.rating} Yıldız`}</h5>
                <Rating name="read-only" value={comment.rating} readOnly />
              </div>
            </div>

            <p style={{ textAlign: 'left' }}>{comment.text}</p>
            <p style={{ textAlign: 'left', color: 'gray' }}>
              posted {new Date(comment.createdAt).toDateString()}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CommentCard;
