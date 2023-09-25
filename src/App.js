import './App.css';
import PrimarySearchAppBar from './components/layout/AppBar';
import { CartProvider } from './context/Cart/CartContext';
import { FoodProvider } from './context/Food/FoodContext';
import { AuthProvider } from './context/Auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { RouteList } from './routes';
import { CommentProvider } from './context/Comment/CommentContext';
import { FilterProvider } from './context/Filter/FilterContext';
import { CouponProvider } from './context/Coupon/CouponContext';
import { OrderProvider } from './context/Order/OrderContext';

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
                    <OrderProvider>
                      <CommentProvider>
                        <PrimarySearchAppBar />
                        <RouteList />
                      </CommentProvider>
                    </OrderProvider>
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
