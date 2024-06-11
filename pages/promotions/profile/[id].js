import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { getAPromotionAndItsShows } from '../../../api/promotionApi';
import { UserContext } from '../../../utils/context/authContext';
import Loading from '../../../components/Loading';
import { getAPromotionAndItsPics } from '../../../api/promotionPicApi';
import PromotionInfoCard from '../../../components/Cards/PromotionInfoCard';
import ViewModeToggle from '../../../components/Buttons/ViewModeToggle';
import ViewShows from '../../../components/Views/ViewShows';
import PromotionPics from '../../../components/Views/PastShowPics';
import ImageModal from '../../../components/Modals/ImageModal';

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
      <PromotionInfoCard promotion={promotion} />
      <br />
      <br />
      <ViewModeToggle viewMode={viewMode} handleViewModeChange={handleViewModeChange} />
      {viewMode === 'upcomingShows' && shows?.length > 0 && (
        <ViewShows shows={shows} user={user} setShows={setShows} />
      )}
      {viewMode === 'pastShowImages' && promotionPics?.length > 0 && (
        <PromotionPics promotionPics={promotionPics} handleImageClick={handleImageClick} />
      )}
      {viewMode === 'pastShowImages' && promotionPics?.length === 0 && (
        <Typography variant="body1" component="div" style={{ textAlign: 'center', marginTop: '2rem' }}>
          No past show images available.
        </Typography>
      )}
      <ImageModal open={openModal} handleClose={handleCloseModal} selectedImage={selectedImage} />
    </>
  );
}
