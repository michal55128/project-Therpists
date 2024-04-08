import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels= {
  1: 'נחמד',
  2: 'בסדר גמור',
  3: 'מיוחד ממש',
  4: ' ממש מרוצה',
  5: 'מעולה טיפול מושלם!',
};
export default function Starss(props) {
  const value = props.numStars;


  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 0,fontSize: '14px' }}>{labels[value]}</Box>
    </Box>
  );
}