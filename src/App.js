import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import TimestampToDateTime, { VelocityAndAltitude, LatAndLong } from "./components/IssPositionProps";
import axios from "axios";


function App() {
    const [iss_position, setPosition] = useState('');
    useEffect(() => {
        IssRestfulCall();
    }, []);

    async function IssRestfulCall() {
        const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.data;
        setPosition(data);
    }




  return (
      (iss_position && (
    <div className="App">
      <h1>International Space Station Global Orbit Position</h1>
      <br/>
      <br/>
      <div><TimestampToDateTime timestamp={iss_position.timestamp} /></div>
      <br />
      <div><LatAndLong latitude={iss_position.latitude} longitude={iss_position.longitude} /></div>
      <br/>
      <div><VelocityAndAltitude altitude={iss_position.altitude} velocity={iss_position.velocity} /></div>
      <br/><br/>
      <div></div>
    </div>
      ))
  );
}

export default App;
