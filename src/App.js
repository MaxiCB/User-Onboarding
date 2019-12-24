import React, {useState, useEffect} from 'react';

import { Container } from 'reactstrap';

import FormComp from './components/FormComp';

function App() {

  const [userInfo, setUserInfo] = useState([]);

  //This is where I will need to store the users and pass data into a table.
  const test = data => {

    let users = [...userInfo];
    users.push(data);
    setUserInfo(users);
    // console.log(data);
  }

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  return (
    <Container fluid={true} className='mainContainer d-flex justify-content-center'>
      <FormComp test={test} userData={userInfo}/>
    </Container>
  );
}

export default App;
