import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia, Divider, Stack, Typography,
} from '@mui/material';

export default function ShowInfoCard({ showDetails }) {
  return (
    <Card className="showInfo">
      <CardMedia
        style={{ width: '50%', height: '25rem', objectFit: 'fill' }}
        component="img"
        image={showDetails?.showImage}
        alt="Show Logo"
        className="CardMedia"
      />
      <CardContent style={{ flex: '1 0 50%', overflowY: 'auto', maxHeight: '25rem' }}>
        <Stack spacing={2}>
          <Typography className="font" variant="h5" component="div">
            {showDetails?.showName}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Date: {showDetails?.showDate}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Time: {showDetails?.showTime}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Location: {showDetails?.location}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Door Price: ${showDetails?.price}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

ShowInfoCard.propTypes = {
  showDetails: PropTypes.shape({
    showName: PropTypes.string,
    showDate: PropTypes.string,
    showTime: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    showImage: PropTypes.string,
  }).isRequired,
};
