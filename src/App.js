import React from 'react';

import { Container } from 'reactstrap';

import FormComp from './components/FormComp';

function App() {
  return (
    <Container fluid={true} className='mainContainer d-flex justify-content-center'>
      <FormComp/>
    </Container>
  );
}

export default App;
