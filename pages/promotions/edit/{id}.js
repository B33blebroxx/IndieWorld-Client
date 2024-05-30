import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPromotion } from '../../../api/promotionApi';
import PromotionForm from '../../../components/Forms/PromotionForm';

export default function EditPromotion() {
  const [editPromotion, setEditPromotion] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getPromotion(id).then(setEditPromotion);
  }, [id]);

  return (
    <div className="form-container">
      <PromotionForm promotionObj={editPromotion} />
    </div>
  );
}
