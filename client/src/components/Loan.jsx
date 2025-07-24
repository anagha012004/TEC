import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from '../utils/url';
import './styles/Loan.scss';
import Header from './Header';
const Loan = () => {
  const [user, setUser] = useState();
  const [dollars, setDollars] = useState();
  const [confirm, setConfirm] = useState(false);
  const [loan, setLoan] = useState();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/user/loan`, {
        amount: dollars
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.status === 200) {
        toast.success('Transaction Successful');
        setTimeout(() => {
          window.location.reload();
        }, 1300);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setConfirm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUser(res.data.data.user[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  

 

 const handleAddMoney = async (e) => {
  e.preventDefault();
  if (!loan || loan <= 0) {
    toast.error('Please enter a valid amount');
    return;
  }

  if (loan > user.loan) {
    toast.error('You cannot pay more than your loan');
    return;
  }

  try {
    const res = await axios.post(`${URL}/user/payloan`, {
      amount: loan
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (res.status === 200) {
      toast.success('Loan Paid Successfully');
      // Update frontend user state
      setUser(prev => ({ ...prev, loan: prev.loan - loan }));
      setLoan('');
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Something went wrong');
  }
};


  return (<><Header/>
    <div className="loan-container mt-5 ml-40 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">Take Loan</h1>
        <div className="mb-4">
          <h1 className="text-lg font-bold">Enter amount in dollars</h1>
          <form onSubmit={handleClick}>
            <input
              type="number"
              value={dollars}
              placeholder="Enter amount in dollars"
              onChange={(e) => setDollars(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Submit
            </button>
          </form>
        </div>
        {confirm && (
          <div className="mb-4">
            <h1 className="text-lg font-bold">Confirm</h1>
            <p>
              Are you sure you want to take a loan of {dollars} dollars which is equal to {dollars * 83.36} INR?
            </p>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Confirm
            </button>
            <button onClick={() => setConfirm(false)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          {/* <h1 className="text-2xl font-bold mb-4">Loan Information</h1> */}
          <h1 className="text-lg font-bold mb-2">Pay Loan</h1>
          <h1 className="text-lg font-bold">Total Debt: {user?.loan || 0} dollars</h1>
        </div>
        <div>
          <form onSubmit={handleAddMoney}>
            <input
              type="number"
              value={loan}
              placeholder="Enter amount in dollars you want to pay"
              onChange={(e) => setLoan(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mt-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Pay Loan
            </button>
          </form>
        </div>
      </div>
    </div></>
  );
};

export default Loan;
