import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { UserContext } from '../../../utils/context/authContext';
import { getAPerformerAndTheirPics, deletePerformerPic } from '../../../api/performerPicApi';
import { getAPerformerAndTheirShows } from '../../../api/performerApi';
import Loading from '../../../components/Loading';
import PerformerInfoCard from '../../../components/Cards/PerformerInfoCard';
import ViewModeToggle from '../../../components/Buttons/ViewModeToggle';
import ViewShows from '../../../components/Views/ViewShows';
import PromotionPics from '../../../components/Views/PastShowPics';
import ImageModal from '../../../components/Modals/ImageModal';
import PerformerPicForm from '../../../components/Forms/PerformerPicForm';

export default function PerformerProfile() {
  const [performer, setPerformer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [shows, setShows] = useState([]);
  const [viewMode, setViewMode] = useState('upcomingShows');
  const [performerPics, setPerformerPics] = useState([]);
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
        result = await getAPerformerAndTheirShows(id);
        setShows(result.shows);
      } else if (viewMode === 'pastShowImages') {
        result = await getAPerformerAndTheirPics(id);
        setPerformerPics(result.performerPics);
      }

      setPerformer(result);
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
    await deletePerformerPic(selectedPic.id);
    setPerformerPics((prevPics) => prevPics.filter((pic) => pic.id !== selectedPic.id));
    handleCloseModal();
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <>
      <PerformerInfoCard performer={performer} />
      <br />
      <br />
      <ViewModeToggle viewMode={viewMode} handleViewModeChange={handleViewModeChange} />
      {viewMode === 'upcomingShows' && (
        <div style={{ textAlign: 'left' }}>
          <ViewShows shows={shows} user={user} setShows={setShows} />
        </div>
      )}
      {viewMode === 'pastShowImages' && performerPics?.length > 0 && (
        <div style={{ textAlign: 'left' }}>
          {user.performerId === performer.id && (
            <PerformerPicForm setPerformerPics={setPerformerPics} />
          )}
          <PromotionPics promotionPics={performerPics} handleImageClick={handleImageClick} />
        </div>
      )}
      {viewMode === 'pastShowImages' && performerPics?.length === 0 && (
        <div style={{ textAlign: 'left' }}>
          {user.performerId === performer.id && (
          <PerformerPicForm setPerformerPics={setPerformerPics} />
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
        isDeletable={user.performerId === performer.id}
      />
    </>
  );
}
