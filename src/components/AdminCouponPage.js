import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./AdminCouponPage.css";

function CouponPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:13889/coupon");
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        setCoupons(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="coupon-page-container">
      <div className="button-row-container">
        <button onClick={() => navigate(`/admin/${userId}`)} className="back-button-coupon">Back</button>
        <button onClick={() => navigate('/CreateCouponPage')} className="create-button-coupon">Create</button>   
      </div>
      <h1 className="header-text">Coupons!</h1>
      <div className="coupon-section">
        {coupons.map((coupon, index) => (
          <div key={index} className="coupon-container">
            <div className="coupon-header">{coupon.discount_details}</div>
            <div className="coupon-code">{coupon.coupon_code}</div>
            {coupon.coupon_condition && (
              <div className="coupon-conditions">{coupon.coupon_condition}</div>
            )}
            <button className="edit-button-coupon">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CouponPage;
