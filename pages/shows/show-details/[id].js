import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { AddBoxOutlined } from '@mui/icons-material';
import Loading from '../../../components/Loading';
import { getAShowAndItsPerformers } from '../../../api/showApi';
import { UserContext } from '../../../utils/context/authContext';

import { addPerformerToShow, removePerformerFromShow } from '../../../api/performerApi';
import PerformerSelectionModal from '../../../components/Modals/PerformerSelectionModal';
import ShowInfoCard from '../../../components/Cards/ShowInfoCard';
import PerformerList from '../../../components/Views/PerformerListView';

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
      <ShowInfoCard showDetails={showDetails} />
      <br />
      <br />
      <div className="text-center">
        <h4 style={{ textAlign: 'left', color: 'white' }}>Performers:</h4>
      </div>
      <br />
      <br />
      {user.promotionId === showDetails.promotionId && (
        <Button
          className="font"
          type="button"
          variant="outlined"
          style={{
            marginBottom: '1rem',
            backgroundColor: 'rgba(104, 101, 101, 0.4)',
            border: '1.5px solid rgba(255, 255, 255, 0.129)',
            boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
            backdropFilter: 'blur( 7px )',
          }}
          size="small"
          onClick={() => setShowModal(true)}
        >
          <AddBoxOutlined size="small" style={{ color: 'white' }} />
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
      <PerformerList performers={performers} handleRemove={handleRemove} showPromotionId={showDetails.promotionId} userPromotionId={user.promotionId} />
    </>
  );
}
