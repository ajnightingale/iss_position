import './App.css';
import {useEffect, useState} from "react";
import TimestampToDateTime, { VelocityAndAltitude, LatAndLong } from "./components/IssPositionProps";
import axios from "axios";
import XMLData from './test_data/company.xml';
import CompanyDetails from "./components/xmlReader";

function App() {
    const [iss_position, setPosition] = useState('');
    const [xml, setXml] = useState('');
    useEffect(() => {
        IssRestfulCall();
        loadXMLDoc();
    }, []);

    async function IssRestfulCall() {
        // XML response header settings
        /*
        axios.get("https://api.wheretheiss.at/v1/satellites/25544", {
	    "Content-Type": "application/xml; charset=utf-8"})
         */
        const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.data;
        setPosition(data);
    }



    /*
    For demonstration purposes only, you would do a REST call
     */
    async function loadXMLDoc() {

        await axios.get(XMLData, {"Content-Type": "application/xml; charset=utf-8"})
            .then((response) => {
                console.log('Your xml file as string', response.data);
                setXml(response.data);
            });

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
        <p>Parse XML using ReactJs</p>
        <div id="companyDetails"><CompanyDetails xmlDoc={xml}/></div>
      </div>
      ))
  );
}

export default App;
