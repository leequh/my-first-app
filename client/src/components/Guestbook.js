import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Guestbook.css';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 5
  });

  // 방명록 목록 가져오기
  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/guestbook`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  // 새 방명록 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/guestbook`, formData);
      setFormData({ name: '', message: '', rating: 5 });
      fetchEntries();
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  // 방명록 삭제
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/guestbook/${id}`);
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="guestbook-container">
      <h1 className="guestbook-title">방명록</h1>
      
      {/* 방명록 작성 폼 */}
      <form onSubmit={handleSubmit} className="guestbook-form">
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            placeholder="메시지를 입력하세요"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">평점</label>
          <select
            id="rating"
            value={formData.rating}
            onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
            className="form-select"
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}점</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">작성하기</button>
      </form>

      {/* 방명록 목록 */}
      <div className="entries-container">
        {entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <div className="entry-header">
              <h3 className="entry-name">{entry.name}</h3>
              <span className="entry-rating">평점: {entry.rating}</span>
            </div>
            <p className="entry-message">{entry.message}</p>
            <button 
              onClick={() => handleDelete(entry._id)}
              className="delete-button"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guestbook;