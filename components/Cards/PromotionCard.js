/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Image } from 'react-bootstrap';

function PromotionCard({ promotionName, logo, id }) {
  return (
    <Link href={`/promotions/profile/${id}`} passHref>
      <Card className="promotion-card m-2">
        <Image src={logo} alt="Promotion Logo" width={385} height={255} />
        <div className="promotion-card-name"><h4>{promotionName}</h4></div>
      </Card>
    </Link>
  );
}

PromotionCard.propTypes = {
  promotionName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default PromotionCard;
