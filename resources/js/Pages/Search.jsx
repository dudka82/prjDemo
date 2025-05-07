// import { useState } from 'react';

// function Checkbox({ label }) {
//   return (
//     <div className="flex items-center space-x-2">
//       <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600" />
//       <span className="text-gray-700">{label}</span>
//     </div>
//   );
// }
// const Logo = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
//     </svg>
//   );




// function EventCard() {
//   return (
//     <div className="bg-orange-100 p-4 rounded-lg shadow-md">
//       <h3 className="text-lg font-bold mb-2">концерт макана</h3>
//       <p className="text-gray-600 mb-4">Для вас это будет незабываемым представлением, бируши можно будет взять при входе</p>
//       <p className="text-gray-700 mb-2">Мест осталось: 1000</p>
//       <p className="text-gray-700 mb-4">Дата: 31.02.2025/ 10:00</p>
//       <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Забронировать место</button>
//     </div>
//   );
// }

// export default function HomePage() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = () => {
//     console.log('Searching for:', searchTerm);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//         <header className="bg-orange-100 shadow-sm">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//       <div className="flex items-center">
//         <Logo />
//       </div>
//       <nav className="hidden md:flex space-x-8">
//         <a href="/" className="text-gray-700 hover:text-gray-900">Главная</a>
//         <a href="categories" className="text-gray-700 hover:text-gray-900">Категории</a>
//         <a href="search" className="text-gray-700 hover:text-gray-900">Каталог</a>
//         <a href="dashboard" className="text-gray-700 hover:text-gray-900">Личный кабинет</a>
//       </nav>
//     </div>
//     </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h2 className="text-3xl font-bold mb-6 text-center">Поиск</h2>
//         <div className="flex justify-center mb-12">
//           <input 
//             type="text" 
//             value={searchTerm} 
//             onChange={(e) => setSearchTerm(e.target.value)} 
//             className="w-full max-w-md p-2 border border-gray-300 rounded-l-lg" 
//             placeholder="Search" 
//           />
//           <button 
//             onClick={handleSearch} 
//             className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-r-lg"
//           >
//             Поиск
//           </button>
//         </div>

//         <div className="flex mb-12">
//           <div className="w-1/4 pr-8">
//             <h3 className="text-lg font-bold mb-4">Выбор категорий</h3>
//             <div className="space-y-4">
//               <Checkbox label="Концерт" />
//               <Checkbox label="Выставка" />
//               <Checkbox label="Праздник" />
//               <Checkbox label="Выступление" />
//             </div>
//           </div>
//           <div className="w-3/4">
//             <h3 className="text-2xl font-bold mb-6">Мероприятия для вас</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <EventCard />
//               <EventCard />
//               <EventCard />
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-orange-200 shadow-sm mt-12 py-6">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
//     <div className="flex items-center mb-4 md:mb-0">
//       <Logo />
//     </div>
//     <div className="text-gray-600 text-sm mb-4 md:mb-0">
//       Спасибо что выбрали нас!
//     </div>
//     <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
//       <div className="flex flex-col">
//         <span className="font-bold text-gray-700">О НАС</span>
//         <a href="/" className="text-gray-600 hover:text-gray-900">Главная</a>
//         <a href="dashboard" className="text-gray-600 hover:text-gray-900">Личный кабинет</a>
//         <a href="search" className="text-gray-600 hover:text-gray-900">каталог</a>
//       </div>
//       <div className="flex flex-col">
//         <span className="font-bold text-gray-700">КОНТАКТЫ</span>
//         <span className="text-gray-600">+7 800 555-35-35</span>
//         <span className="text-gray-600">Neshop@gmail.com</span>
//       </div>
//     </div>
//   </div>
// </footer>
//     </div>
//   );
// }





import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchBar() {
  return (
    <div className="flex justify-center mb-12">
      <input type="text" className="w-full max-w-md p-2 border border-gray-300 rounded-l-lg" placeholder="Search" />
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-r-lg">
        Поиск
      </button>
    </div>
  );
}

function Checkbox() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/searches')
      .then(response => {
        setThemes(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='d-flex align-content-start flex-wrap w-full'>
      {themes.length > 0 ? (
        <ul className='mt-12 ml-24'>
          {themes.map((theme) => (
            <li key={theme.id} className="bg-beige-100 p-6 rounded-lg shadow-md w-full md:w-1/6">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600" />
              <span className="text-gray-700"> {theme.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных категорий</p>
      )}
    </div>
  );
}

function Cards() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({});

  useEffect(() => {
    axios.get('/welcome')
      .then(response => {
        setMeetings(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки данных');
        setLoading(false);
      });
  }, []);

  const handleBookMeeting = async (meetingId) => {
    try {
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { loading: true, error: null, booked: false }
      }));

      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const currentMeeting = meetings.find(m => m.id === meetingId);
      const currentSeats = currentMeeting?.available_seats || 0;

      const response = await axios.post('/meetings/book', {
        meetings_id: meetingId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        }
      });

      setMeetings(prev => prev.map(m => 
        m.id === meetingId 
          ? { ...m, available_seats: Math.max(0, currentSeats - 1) }
          : m
      ));

      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          loading: false, 
          booked: true,
          error: null
        }
      }));

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ошибка бронирования';
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          loading: false, 
          error: errorMessage,
          booked: false
        }
      }));
    }
  };

  const handleCancelBooking = async (meetingId) => {
    try {
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { ...prev[meetingId], loading: true }
      }));

      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      const currentMeeting = meetings.find(m => m.id === meetingId);
      const currentSeats = currentMeeting?.available_seats || 0;

      await axios.post('/meetings/cancel', {
        meetings_id: meetingId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        }
      });

      setMeetings(prev => prev.map(m => 
        m.id === meetingId 
          ? { ...m, available_seats: currentSeats + 1 }
          : m
      ));

      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          loading: false, 
          booked: false,
          error: null
        }
      }));

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ошибка отмены бронирования';
      setBookingStatus(prev => ({
        ...prev,
        [meetingId]: { 
          ...prev[meetingId],
          loading: false, 
          error: errorMessage
        }
      }));
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='d-flex align-content-start flex-wrap w-full'>
      {meetings.length > 0 ? (
        <ul className="flex justify-evenly">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="bg-beige-100 p-6 rounded-lg shadow-md w-full md:w-1/5">
              <h2 className="text-lg font-bold mb-2">{meeting.name}</h2>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Локация: </span> {meeting.place}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Дата: </span> {meeting.date}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Время: </span>{meeting.time}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Описание: </span>{meeting.description}</p>
              <p className="text-gray-600"><span className="text-lg font-bold mb-2">Свободных мест: </span>{meeting.available_seats}</p>
              
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => handleBookMeeting(meeting.id)}
                  disabled={
                    bookingStatus[meeting.id]?.loading || 
                    meeting.available_seats <= 0 ||
                    bookingStatus[meeting.id]?.booked
                  }
                  className={`${
                    meeting.available_seats <= 0 || bookingStatus[meeting.id]?.booked
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-700'
                  } text-white font-bold py-2 px-4 rounded flex-1`}
                >
                  {bookingStatus[meeting.id]?.loading 
                    ? 'Загрузка...' 
                    : meeting.available_seats <= 0 
                      ? 'Мест нет' 
                      : bookingStatus[meeting.id]?.booked
                        ? 'Забронировано'
                        : 'Забронировать'}
                </button>
                
                {bookingStatus[meeting.id]?.booked && (
                  <button
                    onClick={() => handleCancelBooking(meeting.id)}
                    disabled={bookingStatus[meeting.id]?.loading}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-1"
                  >
                    {bookingStatus[meeting.id]?.loading ? 'Отмена...' : 'Отменить'}
                  </button>
                )}
              </div>
              
              {bookingStatus[meeting.id]?.error && (
                <p className="text-red-500 mt-2">{bookingStatus[meeting.id].error}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных встреч</p>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-orange-200 shadow-sm mt-12 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Logo />
        </div>
        <div className="text-gray-600 text-sm mb-4 md:mb-0">
          Спасибо что выбрали нас!
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex flex-col">
            <span className="font-bold text-gray-700">О НАС</span>
            <a href="/" className="text-gray-600 hover:text-gray-900">Главная</a>
            <a href="dashboard" className="text-gray-600 hover:text-gray-900">Личный кабинет</a>
            <a href="search" className="text-gray-600 hover:text-gray-900">Каталог</a>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-700">КОНТАКТЫ</span>
            <span className="text-gray-600">+7 800 555-35-35</span>
            <span className="text-gray-600">Neshop@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Logo = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
  </svg>
);

function Header() {
  return (
    <header className="bg-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-gray-900">Главная</a>
          <a href="categories" className="text-gray-700 hover:text-gray-900">Категории</a>
          <a href="search" className="text-gray-700 hover:text-gray-900">Каталог</a>
          <a href="dashboard" className="text-gray-700 hover:text-gray-900">Личный кабинет</a>
        </nav>
      </div>
    </header>
  );
}

export default function Search() {
  return (
    <div>
      <Header/>
      <main>
        <div>
          <Checkbox/>
          <SearchBar/>
        </div>
        <Cards/>
      </main>
      <Footer/>
    </div>
  );
}