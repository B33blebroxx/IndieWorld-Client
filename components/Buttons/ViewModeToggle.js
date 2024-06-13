import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function ViewModeToggle({ viewMode, handleViewModeChange }) {
  return (
    <div className="text-center">
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewModeChange}
        aria-label="view mode"
        size="medium"
        style={{
          marginBottom: '1rem',
          backgroundColor: 'rgba(33, 33, 33, 0.65)',
          opacity: '.85',
          border: '1px solid rgba(255, 255, 255, 0.129)',
          boxShadow: '0 8px 32px 0 rgba(30, 30, 30, 0.603)',
        }}
      >
        <ToggleButton
          style={{
            color: viewMode === 'upcomingShows' ? 'white' : 'black',
            backgroundColor: viewMode === 'upcomingShows' ? 'black' : 'white',
            backdropFilter: 'blur( 7px )',
          }}
          value="upcomingShows"
          aria-label="upcoming shows"
          className="font"
        >
          Upcoming Shows
        </ToggleButton>
        <ToggleButton
          style={{
            color: viewMode === 'pastShowImages' ? 'white' : 'black',
            backgroundColor: viewMode === 'pastShowImages' ? 'black' : 'white',
          }}
          value="pastShowImages"
          aria-label="past show images"
          className="font"
        >
          Past Show Images
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

ViewModeToggle.propTypes = {
  viewMode: PropTypes.string.isRequired,
  handleViewModeChange: PropTypes.func.isRequired,
};
