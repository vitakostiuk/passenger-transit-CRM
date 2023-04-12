import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTrip } from '../../redux/trips/tripsOperations';
import s from '../Auth/Auth.module.css';

const CreateTrip = () => {
  const [carNumber, setCarNumber] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [endingPoint, setEndingPoint] = useState('');
  const [passengerCount, setPassengerCount] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      carNumber,
      startingPoint,
      endingPoint,
      passengerCount,
    };

    dispatch(createTrip(data));

    setCarNumber('');
    setStartingPoint('');
    setEndingPoint('');
    setPassengerCount('');
  };

  const isDisabledBtn =
    !carNumber || !startingPoint || !endingPoint || !passengerCount;
  return (
    <div>
      <div>Create Trip</div>
      <form onSubmit={handleSubmit}>
        <label className={s.label} htmlFor="car_number">
          Car number
        </label>
        <input
          id="car_number"
          className={s.input}
          name="car_number"
          type="text"
          placeholder="Enter car number"
          value={carNumber}
          onChange={e => setCarNumber(e.target.value)}
        />

        <label className={s.label} htmlFor="start">
          Starting point
        </label>
        <input
          id="start"
          className={s.input}
          name="start"
          type="text"
          placeholder="Enter the starting point"
          value={startingPoint}
          onChange={e => setStartingPoint(e.target.value)}
        />
        <label className={s.label} htmlFor="end">
          Ending point
        </label>
        <input
          id="end"
          className={s.input}
          name="end"
          type="text"
          placeholder="Enter the ending point"
          value={endingPoint}
          onChange={e => setEndingPoint(e.target.value)}
        />

        <label className={s.label} htmlFor="passenger_count">
          Passenger count
        </label>
        <input
          id="passenger_count"
          className={s.input}
          name="passenger_count"
          type="number"
          placeholder="Enter passenger count"
          value={passengerCount}
          onChange={e => setPassengerCount(e.target.value)}
          max={4}
          min={0}
        />

        <button disabled={isDisabledBtn} type="submit">
          Create Trip
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;
