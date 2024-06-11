import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia, Divider, Stack, Typography,
} from '@mui/material';

export default function PerformerInfoCard({ performer }) {
  return (
    <Card style={{ maxWidth: '80rem', height: '25rem' }} className="performerInfo">
      <div style={{ display: 'flex' }}>
        <CardMedia
          style={{
            maxWidth: '25%',
            height: '25rem', // fixed height
            objectFit: 'fill',
          }}
          component="img"
          image={performer?.image}
          alt="Performer Image"
          className="CardMedia"
        />
        <CardContent style={{
          flex: '1 0 50%', overflowY: 'auto', maxHeight: '25rem', margin: 0, padding: 0,
        }}
        >
          <Stack spacing={2}>
            <Typography className="font" variant="h4" component="div" align="center" style={{ color: 'white' }}>
              {performer?.ringName}
            </Typography>
            <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
            <Typography className="font" variant="h5" component="div" align="center" style={{ color: 'white' }}>
              Hometown: {performer?.hometown}
            </Typography>
            <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
            <Typography className="font" variant="h5" component="div" align="center" style={{ color: 'white' }}>
              Role: {performer?.role}
            </Typography>
            <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
            <Typography className="font" variant="h5" component="div" align="center" style={{ color: 'white' }}>
              Accolades: {performer?.accolades}
            </Typography>
            <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
            <Typography className="font" variant="h5" component="div" align="center" style={{ color: 'white' }}>
              Status: {performer?.active ? 'Active' : 'Inactive'}
            </Typography>
            <Divider orientation="horizontal" variant="middle" style={{ backgroundColor: 'lightgrey' }} flexItem />
            <Typography className="font" variant="h5" component="div" align="center" style={{ color: 'white' }}>
              Bio: {performer?.bio}
            </Typography>
          </Stack>
        </CardContent>
      </div>
    </Card>
  );
}

PerformerInfoCard.propTypes = {
  performer: PropTypes.shape({
    ringName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    hometown: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    accolades: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};
