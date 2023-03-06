import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Itinerary from '../components/Itinerary.jsx';
import { useItinerariesContext } from '../hooks/useItineraryContext.jsx';
import axios from 'axios';


const Home = () => {
  const { itineraries, dispatch } = useItinerariesContext();
  const [ modalOpen, setModalOpen ] = useState(false);

  const [ currentlyOpenItinerary, setCurrentlyOpenItinerary ] = useState([]);

  const [itinerary_name, setItineraryName] = useState('');
  const [destination, setDestination] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');

  useEffect(() => {
    axios.get('/api/itineraries/all')
      .then(response => {
        if (response.status === 200){
          dispatch({type: 'SET_ITINERARIES', payload: response});
          // setCurrentlyOpenItinerary(itineraries[0]);
        }
      });
    // the empty array below set its so that useEffect will only be done once
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Post request to add a new itinerary -> should (return data as the new itinerary
    const newItinerary = { itinerary_name, destination, start_date, end_date };

    //TODO double check endpoint if id needed
    const response = await axios.post('/api/itineraries', newItinerary, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const newData = await response.json();

    if(response.status === 200){
      setItineraryName('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      toggleModal();
      dispatch({type: 'CREATE_ITINERARIES', payload: newData});
    }


  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return(
    <>
      <Navbar />
      <div className="ItineraryList">
        {itineraries.length > 0 && itineraries.map((itinerary) => 
          <button key={itinerary._id} onClick={() => setCurrentlyOpenItinerary(itinerary)}>{itinerary.itinerary_name}</button>
        )};
        <button onClick={toggleModal}>+ Create New Itinerary</button>
      </div>
      <div className="ItineraryInformationDisplay">
        {/* If itineraries is NOT NULL, then perform what is after the && */}
        {currentlyOpenItinerary.length > 0 && 
          <Itinerary key={currentlyOpenItinerary._id} itinerary={currentlyOpenItinerary}/>
        }
      </div>
      {modalOpen &&
        <div>
          <button onClick={toggleModal}>Cancel</button>
          <form className='itineraryForm' onSubmit = {handleSubmit}>
            <label>Itinerary Name</label>
            <input type='text'
              value = {itinerary_name}
              onChange = {(e) => setItineraryName(e.target.value)}
            />

            <label>Destination</label>
            <input type='text' 
              value = {destination}
              onChange = {(e) => setDestination(e.target.value)}
            />

            <label>Start Date</label>
            <input type='date' 
              value = {start_date}
              onChange = {(e) => setStartDate(e.target.value)}
            />

            <label>End Date</label>
            <input type='date'
              value = {end_date}
              onChange = {(e) => setEndDate(e.target.value)}
            />

            <button>Add Itinerary</button>
          </form>
        </div>
      }
    </>
  );
};

export default Home;