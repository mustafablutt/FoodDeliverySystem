import React from 'react';
import '../../styles/OrderCard/orderCard.css';
import { format } from 'date-fns';

const OrderCard = ({ order }) => {
  const { items, couponCode, finalAmount, createdAt, _id } = order;
  return (
    <div style={{ marginBottom: 50 }}>
      <div className="card">
        <div className="title">Bulut Food Sipariş Özeti</div>
        <div className="info">
          <div className="row">
            <div className="col-7">
              <span id="heading">Tarih</span>
              <br />
              <span id="details">
                {format(new Date(createdAt), 'dd MMMM yyyy')}
              </span>{' '}
            </div>
            <div className="col-5 pull-right">
              <span id="heading">Sipariş No:</span>
              <br />
              <span id="details">{_id}</span>
            </div>
          </div>
        </div>
        <div className="pricing">
          {items.map((item) => (
            <div className="row" key={item._id}>
              <div className="col-6">
                <span id="name">{item.foodName}</span>
              </div>
              <div className="col-3">
                <span id="price">x{item.quantity}</span>
              </div>
              <div className="col-3">
                <span id="price">{item.price * item.quantity} TL</span>{' '}
                {/* Fiyat */}
              </div>
            </div>
          ))}
        </div>
        <div className="total">
          <div className="row">
            <div className="col-9">
              <span>KUPON: {couponCode ? couponCode : 'UYGULANMADI'}</span>
            </div>
            <div className="col-3">
              <big>{finalAmount} TL</big>
            </div>
          </div>
        </div>

        <div className="tracking" style={{ marginTop: 20 }}>
          <div className="title">Sipariş Durumu</div>
        </div>
        <div className="progress-track">
          <ul id="progressbar">
            <li className="step0 active " id="step1">
              Sırada
            </li>
            <li className="step0 active text-center" id="step2">
              Hazırlanıyor
            </li>
            <li className="step0 active text-right" id="step3">
              Yolda
            </li>
            <li className="step0 active text-right" id="step4">
              Teslim Edildi
            </li>
          </ul>
        </div>

        <div className="footer">
          <div className="row">
            <div className="col-2">
              <img
                className="img-fluid"
                src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Eo_circle_green_white_checkmark.svg"
              />
            </div>
            <div className="col-10">
              Siparişiniz Teslim Edildi, Afiyet Olsun
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
