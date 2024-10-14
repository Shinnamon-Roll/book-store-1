import React, { useState, useCallback } from 'react';
import './App.css'; // นำเข้าไฟล์ CSS

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // สถานะสำหรับโมดัลล็อกอิน
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // สถานะสำหรับโมดัลลงทะเบียน
  const [selectedCategory, setSelectedCategory] = useState(''); // สถานะสำหรับหมวดหมู่ที่เลือก

  const handleLogin = () => {
    alert('Login button clicked!');
    setIsLoginOpen(false); // ปิดโมดัลหลังจากล็อกอิน
  };

  const handleRegister = () => {
    alert('Register button clicked!');
    setIsRegisterOpen(false); // ปิดโมดัลหลังจากลงทะเบียน
  };

  const toggleLoginModal = useCallback(() => {
    setIsLoginOpen((prev) => !prev);
    if (isRegisterOpen) setIsRegisterOpen(false); // ปิดโมดัลลงทะเบียนหากเปิดอยู่
  }, [isRegisterOpen]);

  const toggleRegisterModal = useCallback(() => {
    setIsRegisterOpen((prev) => !prev);
    if (isLoginOpen) setIsLoginOpen(false); // ปิดโมดัลล็อกอินหากเปิดอยู่
  }, [isLoginOpen]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // อัปเดตหมวดหมู่ที่เลือกเมื่อผู้ใช้คลิก
  };

  // ข้อมูลตัวอย่างหนังสือพร้อมหมวดหมู่
  const books = [
    { id: 1, title: 'Book 1', category: 'นวนิยาย' },
    { id: 2, title: 'Book 2', category: 'วรรณกรรม เรื่องสั้น' },
    { id: 3, title: 'Book 3', category: 'จิตวิทยา การพัฒนาตนเอง' },
    { id: 4, title: 'Book 4', category: 'การ์ตูน มังงะ' },
    { id: 5, title: 'Book 5', category: 'นวนิยาย' },
    { id: 6, title: 'Book 6', category: 'วรรณกรรม เรื่องสั้น' },
    { id: 7, title: 'Book 7', category: 'จิตวิทยา การพัฒนาตนเอง' },
    { id: 8, title: 'Book 8', category: 'การ์ตูน มังงะ' },
  ];

  // กรองหนังสือตามหมวดหมู่ที่เลือก
  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books; // ถ้าไม่มีการเลือกหมวดหมู่จะแสดงหนังสือทั้งหมด

  return (
    <div className="container">
      <header className="header">
        <div className="logo">Logo</div>
        <div className="login" onClick={toggleLoginModal}>Login</div>
      </header>

      <main className="content-wrapper">
        <section className="promotion">Promotion</section>

        <section className="content">
          <aside className="sidebar">
            <div className="category">หมวด</div>
            <ul>
              {['นวนิยาย', 'วรรณกรรม เรื่องสั้น', 'จิตวิทยา การพัฒนาตนเอง', 'การ์ตูน มังงะ'].map((category) => (
                <li key={category} onClick={() => handleCategoryChange(category)}>{category}</li>
              ))}
            </ul>
          </aside>

          <div className="book-grid">
            {filteredBooks.map((book) => (
              <div key={book.id} className="book">{book.title}</div>
            ))}
          </div>
        </section>
      </main>

      {/* โมดัลสำหรับล็อกอิน */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={toggleLoginModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-icon" onClick={toggleLoginModal}>&times;</div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="login-button" onClick={handleLogin}>Login</button>
            <p>No account? <span className="register-link" onClick={toggleRegisterModal}>* Register</span></p>
          </div>
        </div>
      )}

      {/* โมดัลสำหรับลงทะเบียน */}
      {isRegisterOpen && (
        <div className="modal-overlay" onClick={toggleRegisterModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-icon" onClick={toggleRegisterModal}>&times;</div>
            <h2>Register</h2>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="text" placeholder="Name Surname" required />
            
            {/* Dropdown สำหรับเพศ */}
            <select required>
              <option value="" disabled>Select Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input type="date" placeholder="dd/mm/yy" required />
            <input type="text" placeholder="Address" required />
            <button className="register-button" onClick={handleRegister}>Register</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>About Us</p>
      </footer>
    </div>
  );
};

export default App;
