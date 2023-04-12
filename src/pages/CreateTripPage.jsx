import React from 'react';
import CreateTrip from '../modules/CreateTrip';
import s from './Pages.module.css';

const CreateTripPage = () => {
  return (
    <div className={s.container}>
      <div className={s.paper}>
        <CreateTrip />
      </div>
    </div>
  );
};

export default CreateTripPage;
