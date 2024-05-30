/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

function PromotionCard({ promotionName, logoUrl, id }) {
  return (
    <Link href={`/promotions/${id}`}>
      <a>
        <img src={logoUrl} alt="Promotion Logo" width={350} height={200} />
        <div className="promotion-card-name"><h4>{promotionName}</h4></div>
      </a>
    </Link>
  );
}

PromotionCard.propTypes = {
  promotionName: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default PromotionCard;
