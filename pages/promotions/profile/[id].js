import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { UserContext } from '../../../utils/context/authContext';
import { getAPromotionAndItsPics, deletePromotionPic } from '../../../api/promotionPicApi';
import { getAPromotionAndItsShows } from '../../../api/promotionApi';
import Loading from '../../../components/Loading';
import PromotionInfoCard from '../../../components/Cards/PromotionInfoCard';
import ViewModeToggle from '../../../components/Buttons/ViewModeToggle';
import ViewShows from '../../../components/Views/ViewShows';
import PromotionPics from '../../../components/Views/PastShowPics';
import ImageModal from '../../../components/Modals/ImageModal';
import ShowForm from '../../../components/Forms/ShowForm';
import PromotionPicForm from '../../../components/Forms/PromotionPicForm';

export default function PromotionPage() {
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [shows, setShows] = useState([]);
  const [viewMode, setViewMode] = useState('upcomingShows');
  const [promotionPics, setPromotionPics] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPic, setSelectedPic] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let result;
      if (viewMode === 'upcomingShows') {
        result = await getAPromotionAndItsShows(id);
        setShows(result.shows);
      } else if (viewMode === 'pastShowImages') {
        result = await getAPromotionAndItsPics(id);
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

  const handleImageClick = (pic) => {
    setSelectedImage(pic.image);
    setSelectedPic(pic);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
    setSelectedPic({});
  };

  const handleDeleteImage = async () => {
    await deletePromotionPic(selectedPic.id);
    setPromotionPics((prevPics) => prevPics.filter((pic) => pic.id !== selectedPic.id));
    handleCloseModal();
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
      {viewMode === 'upcomingShows' && (
        <div style={{ textAlign: 'left' }}>
          {user.promotionId === promotion.id && (
            <ShowForm setShows={setShows} />
          )}
          <ViewShows shows={shows} user={user} setShows={setShows} />
        </div>
      )}
      {viewMode === 'pastShowImages' && promotionPics?.length > 0 && (
        <div style={{ textAlign: 'left' }}>
          {user.promotionId === promotion.id && (
            <PromotionPicForm setPromotionPics={setPromotionPics} />
          )}
          <PromotionPics promotionPics={promotionPics} handleImageClick={handleImageClick} />
        </div>
      )}
      {viewMode === 'pastShowImages' && promotionPics?.length === 0 && (
        <div style={{ textAlign: 'left' }}>
          {user.promotionId === promotion.id && (
          <PromotionPicForm setPromotionPics={setPromotionPics} />
          )}
          <Typography variant="body1" component="div" style={{ textAlign: 'center', marginTop: '2rem' }}>
            No past show images available.
          </Typography>
        </div>
      )}
      <ImageModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        selectedImage={selectedImage}
        showName={selectedPic.showName}
        showDate={selectedPic.showDate}
        handleDeleteImage={handleDeleteImage}
        isDeletable={user.promotionId === promotion.id}
      />
    </>
  );
}
