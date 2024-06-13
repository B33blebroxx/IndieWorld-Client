import PropTypes from 'prop-types';
import PerformerCard from '../Cards/PerformerCard';

function PerformerList({
  performers,
  handleRemove,
  showPromotionId,
  userPromotionId,
}) {
  return (
    <div className="performer-card-container">
      {performers.map((performer) => (
        <PerformerCard
          key={performer.id}
          performer={performer}
          onRemove={handleRemove}
          showPromotionId={showPromotionId}
          userPromotionId={userPromotionId}
        />
      ))}
    </div>
  );
}

PerformerList.propTypes = {
  performers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ringName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleRemove: PropTypes.func.isRequired,
  showPromotionId: PropTypes.number.isRequired,
  userPromotionId: PropTypes.number.isRequired,
};

export default PerformerList;
