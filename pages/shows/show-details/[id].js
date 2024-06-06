import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Card, CardContent, CardMedia, Stack, Typography,
} from '@mui/material';
import Loading from '../../../components/Loading';
import { getAShowAndItsPerformers } from '../../../api/showApi';
import { UserContext } from '../../../utils/context/authContext';
import PerformerCard from '../../../components/Cards/PerformerCard';
import { addPerformerToShow, removePerformerFromShow } from '../../../api/performerApi';
import PerformerSelectionModal from '../../../components/Modals/PerformerSelectionModal';

export default function ShowDetails() {
  const [showDetails, setShowDetails] = useState({});
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(UserContext);
  const currentPerformers = performers.map((performer) => performer.id);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAShowAndItsPerformers(id);
      setShowDetails(result);
      setPerformers(result?.performers);
      setLoading(false);
    };
    fetchData();
  }, [user, id, performers]);

  const handleSave = (selectedPerformers) => {
    selectedPerformers.forEach((performer) => {
      addPerformerToShow(showDetails.id, performer);
    });
  };

  const handleRemove = (performerId) => {
    removePerformerFromShow(showDetails.id, performerId);
  };

  if (loading) {
    return <div><Loading /></div>;
  }
  return (
    <>
      <Card className="showInfo">
        <CardMedia
          style={{ maxWidth: '50%', objectFit: 'fill' }}
          component="img"
          image={showDetails?.showImage}
          alt="Show Logo"
          className="CardMedia"
        />
        <CardContent style={{ flex: '1 0 50%', maxHeight: 'fit' }}>
          <Stack spacing={2}>
            <Typography variant="h5" component="div">
              {showDetails?.showName}
            </Typography>
            <Typography variant="body1" component="div">
              Date: {showDetails?.showDate}
            </Typography>
            <Typography variant="body1" component="div">
              Time: {showDetails?.showTime}
            </Typography>
            <Typography variant="body1" component="div">
              Location: {showDetails?.location}
            </Typography>
            <Typography variant="body1" component="div">
              Door Price: ${showDetails?.price}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <br />
      <br />
      <div className="text-center">
        <h4>Performers:</h4>
      </div>
      <br />
      <br />
      {user.promotionId === showDetails.promotionId && (
        <Button type="button" variant="outlined" size="small" onClick={() => setShowModal(true)}>
          Add Performers
        </Button>
      )}
      <PerformerSelectionModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        performers={performers}
        handleSave={handleSave}
        currentPerformers={currentPerformers}
      />
      <br />
      <br />
      <div className="performer-card-container">
        {performers.map((performer) => (
          <PerformerCard key={performer.id} performer={performer} onRemove={handleRemove} showPromotionId={showDetails.promotionId} userPromotionId={user.promotionId} />
        ))}
      </div>
    </>
  );
}
