import PropTypes from 'prop-types'; 
import Pet from './Pet';

const PetsList = ({ pets }) => {
  let petsDisplay;

  if (pets.length > 0) {
    petsDisplay = pets.map((pet) => {
      return <Pet key={pet.id} pet={pet} />
    });
  } else {
    petsDisplay = <h2 style={{ textAlign: "center" }}>Add some pets!</h2>
  }

  return petsDisplay;
};

PetsList.propTypes = {
  pets: PropTypes.array.isRequired
};

export default PetsList;