import React, { useState } from 'react';

import '../../styles/CouponCard/CouponCard.css';

const CouponCard = ({ coupon }) => {
  const [buttonText, setButtonText] = useState('Kodu Kopyala');

  const copyCode = () => {
    const cpnCode = coupon.code;
    navigator.clipboard.writeText(cpnCode);
    setButtonText('Kopyalandı');

    setTimeout(() => {
      setButtonText('Kodu Kopyala');
    }, 3000);
  };

  return (
    <div className="child">
      <div className="coupon-card">
        <h3>
          {coupon.code}
          <br />(<span>%{coupon.discountPercentage} İNDİRİM</span>)
        </h3>
        <div className="coupon-row">
          <span id="cpnCode">{coupon.code.split(' ')[1] || coupon.code}</span>
          <span id="cpnBtn" onClick={copyCode}>
            {buttonText}
          </span>
        </div>
        <p>
          Geçerlilik:{' '}
          {new Date(coupon.validUntil).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
    </div>
  );
};

export default CouponCard;
