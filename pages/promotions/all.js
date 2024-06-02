import React, { useState, useEffect } from 'react';
import { getAllPromotions } from '../../api/promotionApi';
import PromotionCard from '../../components/Cards/PromotionCard';

const AllPromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const allPromotions = await getAllPromotions();
        setPromotions(allPromotions);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <>
      <h2>All Promotions</h2>
      <div className="card-container">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} id={promotion.id} promotion={promotion} promotionName={promotion.promotionName} logo={promotion.logo} />
        ))}
      </div>
    </>
  );
};

export default AllPromotionsPage;
