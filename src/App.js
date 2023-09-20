import './App.css';
import PrimarySearchAppBar from './components/layout/AppBar';
import { CartProvider } from './context/CartContext';
import { FoodProvider } from './context/FoodContext';
import { AuthProvider } from './context/Auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { RouteList } from './routes';
import { CommentProvider } from './context/comment/CommentContext';
import { FilterProvider } from './context/Filter/FilterContext';
import { CouponProvider } from './context/coupon/CouponContext';

function App() {
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <FilterProvider>
              <FoodProvider>
                <CouponProvider>
                  <CartProvider>
                    <CommentProvider>
                      <PrimarySearchAppBar />
                      <RouteList />
                    </CommentProvider>
                  </CartProvider>
                </CouponProvider>
              </FoodProvider>
            </FilterProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
