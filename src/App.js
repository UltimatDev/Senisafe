import './App.css';
import icon from './icon.png';
import MemoryGame from './memory';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Medicinal from "./Medicinal";
import Timer from './components/timerdata';
import { Support } from './components/support';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className="header">
                                    <div className="title">
                                        <img src={icon} alt="Senisafe" className="logo" />
                                    </div>
                                </div>
                                
                                <div className="greeting">
                                    Hello!!! We are here to help you.
                                </div>

                                
                                <div className="content">
                                    <div className="card">
                                    <Link to="/timer" style={{textDecoration:'none',color:'black'}}>
                                        <img src="https://static.thenounproject.com/png/7773-200.png" className='desc-logo' alt="Medicine" />
                                        <div>Medications</div>
                                    </Link>
                                    </div>

                                    <div className="card">
                                        <Link to="/medical-records" style={{textDecoration:'none',color:'black'}}>
                                            <img className='desc-logo' src="https://cdn.iconscout.com/icon/premium/png-512-thumb/medical-history-5716432-4814239.png?f=webp&w=512" alt="Medical Record" />
                                            <div><p className='dash-text'>Records</p></div>
                                        </Link>
                                    </div>


                                    <div className="card">
                                        <img className='desc-logo' src="https://img.icons8.com/ios/50/000000/treatment-plan.png"  alt="Health History" />
                                        <div><p className='dash-text'>History</p></div>
                                    </div>
                                </div>

                                
                                <Link to="/memory-game" style={{textDecoration:'none',color:'black'}}>
                                        <div className="card">
                                            <img src='https://static.thenounproject.com/png/4545700-200.png' className='desc-logo' style={{height:'50px',width:'50px'}}alt="Memory Games" />
                                            <div>Memory Games</div>
                                        </div>
                                    </Link>

                                <div className="footer">
                                    <button><img src='https://cdn-icons-png.flaticon.com/128/2869/2869649.png'></img></button>
                                    <button><img style={{height:'80px',width:'80px'}} src='https://cdn.iconscout.com/icon/premium/png-256-thumb/friend-call-4357469-3613684.png?f=webp'/></button>
                                    <Link to="/support"><button>Support</button></Link>
                                </div>
                            </>
                        }
                    />

                    <Route path="/medical-records" element={<Medicinal />} />
                    <Route path="/timer" element={<Timer />} />
                    <Route path="/memory-game/*" element={<MemoryGame />} /> 
                    <Route path='/support' element={<Support/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
