import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia, Divider, Stack, Typography,
} from '@mui/material';

export default function PromotionInfoCard({ promotion }) {
  return (
    <Card className="promotionInfo">
      <CardMedia
        style={{
          height: '25rem', maxWidth: '40%', objectFit: 'fill',
        }}
        component="img"
        image={promotion?.logo}
        alt="Promotion Logo"
      />
      <CardContent style={{ overflowY: 'auto', flex: '1 0 50%', maxHeight: '25rem' }}>
        <Stack spacing={2}>
          <Typography className="font" variant="h5" component="div">
            {promotion?.promotionName} ({promotion?.acronym})
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Based out of {promotion?.hq}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Est. in {promotion?.established}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Owned By: {promotion?.owner}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            Show Frequency: {promotion?.showFrequency}
          </Typography>
          <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
          <Typography className="font" variant="body1" component="div">
            {promotion?.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

PromotionInfoCard.propTypes = {
  promotion: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    promotionName: PropTypes.string.isRequired,
    acronym: PropTypes.string.isRequired,
    hq: PropTypes.string.isRequired,
    established: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    showFrequency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
