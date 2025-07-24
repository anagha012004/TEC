import React, { useState } from 'react'
import './styles/Deposit.scss'
import axios from 'axios'
import { URL } from '../utils/url'
import { toast } from 'react-toastify'
import Header from './Header'

const Deposit = () => {
  const [dollars, setDollars] = useState('');

  const handleAddMoney = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    if (!dollars || parseFloat(dollars) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      const res = await axios.post(`${URL}/user/sendupimoney`, {
        amount: parseFloat(dollars)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        toast.success('Deposit successful');
        setDollars('');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <>
      <Header />
      <div className='bg-white rounded-lg shadow-md p-4' style={{ width: "50%", marginTop: "150px", marginLeft: '400px' }}>
        <h1 className='text-2xl font-bold mb-4'>Deposit</h1>
        <div className='mb-4'>
          <h1 className='text-lg font-bold'>Enter amount in dollars</h1>
          <form onSubmit={handleAddMoney} className='flex flex-col'>
            <input
              type='number'
              value={dollars}
              onChange={(e) => setDollars(e.target.value)}
              placeholder='Enter amount in dollars'
              className='border p-2 rounded-md'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'
            >
              Deposit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Deposit
