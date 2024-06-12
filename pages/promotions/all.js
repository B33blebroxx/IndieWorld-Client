import React, { useState, useEffect } from 'react';
import { getAllPromotions } from '../../api/promotionApi';
import PromotionCard from '../../components/Cards/PromotionCard';

export default function AllPromotions() {
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
      <br />
      <br />
      <h2 style={{
        textAlign: 'center',
        color: 'white',
        paddingBottom: '10px',
        marginBottom: '1rem',
        backgroundColor: 'rgba(104, 101, 101, 0.4)',
        border: '1.5px solid rgba(255, 255, 255, 0.129)',
        boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
        backdropFilter: 'blur( 7px )',
        width: 'fit-content',
        padding: '.5rem',
        margin: 'auto',
      }}
      >All Promotions
      </h2>
      <br />
      <br />
      <div className="card-container">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} id={promotion.id} promotion={promotion} promotionName={promotion.promotionName} logo={promotion.logo} />
        ))}
      </div>
    </>
  );
}
