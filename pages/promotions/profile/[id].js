import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardContent, CardMedia, ImageList, ImageListItem, Stack, ToggleButton, ToggleButtonGroup, Typography, Dialog, DialogContent, IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from 'react-bootstrap';
import { getAPromotionAndItsShows } from '../../../api/promotionApi';
import ShowForm from '../../../components/Forms/ShowForm';
import { UserContext } from '../../../utils/context/authContext';
import Loading from '../../../components/Loading';
import ShowCard from '../../../components/Cards/ShowCard';
import { getAPromotionAndItsPics } from '../../../api/promotionPicApi';

export default function PromotionPage() {
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [shows, setShows] = useState([]);
  const [viewMode, setViewMode] = useState('upcomingShows');
  const [promotionPics, setPromotionPics] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let result;
      if (viewMode === 'upcomingShows') {
        result = await getAPromotionAndItsShows(id);
        console.log('Fetched shows:', result.shows);
        setShows(result.shows);
      } else if (viewMode === 'pastShowImages') {
        result = await getAPromotionAndItsPics(id);
        console.log('Fetched pics:', result.promotionPics);
        setPromotionPics(result.promotionPics);
      }

      setPromotion(result);
      setLoading(false);
    };

    if (id) {
      fetchData();
    }
  }, [id, viewMode]);

  const handleViewModeChange = (e, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <>
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
      <br />
      <br />
      <div className="text-center">
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          aria-label="view mode"
          size="large"
          style={{
            marginBottom: '1rem',
            backgroundColor: 'rgba(33, 33, 33, 0.65)',
            opacity: '.9',
            border: '1px solid rgba(255, 255, 255, 0.129)',
            boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
            backdropFilter: 'blur( 7px )',
          }}
        >
          <ToggleButton
            style={{
              color: viewMode === 'upcomingShows' ? 'white' : 'black',
              backgroundColor: viewMode === 'upcomingShows' ? 'black' : 'grey',
            }}
            value="upcomingShows"
            aria-label="upcoming shows"
            className="font"
          >
            Upcoming Shows
          </ToggleButton>
          <ToggleButton
            style={{
              color: viewMode === 'pastShowImages' ? 'white' : 'black',
              backgroundColor: viewMode === 'pastShowImages' ? 'black' : 'grey',
            }}
            value="pastShowImages"
            aria-label="past show images"
            className="font"
          >
            Past Show Images
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {viewMode === 'upcomingShows' && shows?.length > 0 && (
      <>
        <div style={{ textAlign: 'left' }}>
          <ShowForm setShows={setShows} />
        </div>
        <div className="show-cards-container">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} userObj={user} setShows={setShows} />
          ))}
        </div>
      </>
      )}
      {viewMode === 'pastShowImages' && promotionPics?.length > 0 && (
        <ImageList sx={{ width: '100%', height: 600, gap: 3 }} variant="quilted" cols={3} rowHeight={121}>
          {promotionPics.map((pic) => (
            <ImageListItem key={pic.id} cols={pic.cols || 1} rows={pic.rows || 1}>
              <Image
                src={pic.promotionImage}
                alt="Past Show Images"
                fluid
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(pic.promotionImage)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      {viewMode === 'pastShowImages' && promotionPics?.length === 0 && (
        <Typography variant="body1" component="div" style={{ textAlign: 'center', marginTop: '2rem' }}>
          No past show images available.
        </Typography>
      )}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        <DialogContent style={{ position: 'relative', background: 'black' }}>
          <IconButton
            style={{
              color: 'white', position: 'absolute', right: 0, top: 0,
            }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Image src={selectedImage} alt="Selected" style={{ width: '100%' }} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
