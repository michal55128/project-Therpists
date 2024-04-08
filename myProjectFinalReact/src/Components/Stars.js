import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import '../Css/Stars.css';
/**
//  * @typedef {number} number
 */

const labels = {
  1: 'נחמד',
  2: 'בסדר גמור',
  3: 'מיוחד ממש',
  4: ' ממש מרוצה',
  5: 'מעולה טיפול מושלם!',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Stars() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  React.useEffect(()=>{
    console.log(value);
  })
  return (
    <div className='start'>
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
            debugger
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && hover !== -1 && (
          <Box sx={{ ml: 2 }}>{labels[hover]}</Box>
        )}
      </Box>
    </div>
  );
}
