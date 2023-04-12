import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTrip } from '../../redux/trips/tripsOperations';

import { Button, Form } from 'bootstrap-4-react';
import s from './CreateTrip.module.css';

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
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.title}>Create Trip</div>
        <Form onSubmit={handleSubmit} className={s.form}>
          <Form.Group>
            <label className={s.label} htmlFor="car_number">
              Car number
            </label>
            <Form.Input
              id="car_number"
              name="car_number"
              type="text"
              placeholder="Enter car number"
              value={carNumber}
              onChange={e => setCarNumber(e.target.value)}
              className={s.input}
            />

            <label className={s.label} htmlFor="start">
              Starting point
            </label>
            <Form.Input
              id="start"
              name="start"
              type="text"
              placeholder="Enter the starting point"
              value={startingPoint}
              onChange={e => setStartingPoint(e.target.value)}
              className={s.input}
            />
            <label className={s.label} htmlFor="end">
              Ending point
            </label>
            <Form.Input
              id="end"
              name="end"
              type="text"
              placeholder="Enter the ending point"
              value={endingPoint}
              onChange={e => setEndingPoint(e.target.value)}
              className={s.input}
            />

            <label className={s.label} htmlFor="passenger_count">
              Passenger count
            </label>
            <Form.Input
              id="passenger_count"
              name="passenger_count"
              type="number"
              placeholder="Enter passenger count"
              value={passengerCount}
              onChange={e => setPassengerCount(e.target.value)}
              className={s.input}
            />

            <Button
              primary
              lg
              disabled={isDisabledBtn}
              type="submit"
              variant="outline-success"
              className={s.button}
            >
              Create Trip
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default CreateTrip;
