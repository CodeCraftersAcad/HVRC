import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <>
            <Spinner animation='grow' role='status' variant='info'
                     style={{width: '50px', height: '50px', margin: 'auto'}}>
            </Spinner>
            <Spinner animation='grow' role='status' variant='warning'
                     style={{width: '50px', height: '50px', margin: 'auto' }}>
            </Spinner>
            <Spinner animation='grow' role='status' variant='danger'
                     style={{width: '50x', height: '50px', margin: 'auto' }}>
            </Spinner>
        </>
    );
};

export default Loader;