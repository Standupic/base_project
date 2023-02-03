import React from 'react';

function Bomb() {
  throw new Error('💥 KABOOM 💥');
}

const ListApplication = () => {
  return <>List application</>;
};

export default ListApplication;
