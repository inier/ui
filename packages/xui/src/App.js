import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { asyncLoad } from './components';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <React.Fragment>
                <Route path="/" exact component={asyncLoad(import('./pages/Entrance'))} />
                <Route path="/my" exact component={asyncLoad(import('./pages/About'))} />
            </React.Fragment>
        </Router>
    );
}

export default App;
