import Dropdown from '@/Components/Dropdown';
import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';

const Dashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Get user ID from all possible sources
      const userIdRaw = localStorage.getItem('userId') ?? 
                       sessionStorage.getItem('userId') ?? 
                       '';
      
      console.debug('Raw user ID from storage:', userIdRaw); // Debug log

      // 2. Validate and parse the ID
      if (!userIdRaw) {
        throw new Error('User ID not found in storage');
      }

      const userId = parseInt(userIdRaw, 10);
      
      if (isNaN(userId) || userId <= 0) {
        console.error('Invalid user ID value:', userIdRaw);
        throw new Error('Invalid user ID - must be a positive integer');
      }

      // 3. Make API request with proper headers
      const response = await axios.get('/meetings', {
        params: { userId },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      setMeetings(response.data);
    } catch (error) {
      console.error('Failed to load meetings:', {
        error: error.message,
        stack: error.stack
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 4. Verify authentication before fetching
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required - please login');
      setLoading(false);
      return;
    }
    
    fetchMeetings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">Мои мероприятия</h2>
      <div className="border rounded-lg overflow-hidden">
        {meetings.length > 0 ? (
          <ul className="divide-y">
            {meetings.map(meeting => (
              <li key={meeting.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{meeting.name}</h3>
                    <p className="text-sm text-gray-600">{meeting.place}</p>
                    <p className="text-sm mt-1">{meeting.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm whitespace-nowrap">
                      {new Date(meeting.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">{meeting.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-gray-500 text-center">
            Вы еще не записаны ни на одно мероприятие
          </div>
        )}
      </div>
    </div>
  );
};

const PersonalInfo = ({ user }) => (
  <div className="mt-32 mb-12">
    <h2 className="text-lg font-bold mb-4">Личная информация</h2>
    <div className="flex flex-col">
      <div className="flex justify-between border-b py-2">
        <span className="font-medium">Имя:</span>
        <span className="ml-64">{user.name}</span>
      </div>
      <div className="flex justify-between border-b py-2">
        <span className="font-medium">Email:</span>
        <span className="ml-64">{user.email}</span>
      </div>
    
      <div className="flex justify-between border-b py-2">
        <span className="font-medium">Дата регистрации:</span>
        <span className="ml-64">{new Date(user.created_at).toLocaleDateString()}</span>
      </div>
    </div>

    <div className="mt-8">                
      <Link
        href={route('meetings.index')}
        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 transition mr-12">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Перейти к мероприятиям                 
      </Link>
      <Link
        href={route('themes.index')}
        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 transition">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Перейти к темам                 
      </Link>
    </div>
  </div>
);
const Logo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
  </svg>
);

const Header = ({ auth }) => (
  <header className="bg-orange-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Logo />
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="/" className="text-gray-700 hover:text-gray-900">Главная</a>
        <a href="categories" className="text-gray-700 hover:text-gray-900">Категории</a>
        <a href="search" className="text-gray-700 hover:text-gray-900">Каталог</a>
      </nav>  
      <Dropdown>
        <Dropdown.Trigger>
          <span className="inline-flex rounded-md">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
            >
              {auth.user.name}
              <svg
                className="ml-2 -mr-0.5 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Link 
            className="w-24 hover:bg-orange-100"     
            href={route('logout')}
            method="post"
            as='button'
          >
            Выйти
          </Dropdown.Link> 
        
        </Dropdown.Content>
       
      </Dropdown>
        
    </div>
  </header>
);
const Footer = () => (
  <footer className="bg-orange-200 shadow-sm mt-64 py-6">
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
          <a href="search" className="text-gray-600 hover:text-gray-900">каталог</a>
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

export default function PersonalAccount({ auth }) {
  return (
    <div className="min-h-screen bg-white">
      <Header auth={auth} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 gap-12">
        <div> 
          
         

          <h1 className="text-3xl font-bold mb-6">Личный кабинет</h1>
         
          <Dashboard />
        </div>
        <PersonalInfo user={auth.user} />
      
      </main>
      <Footer />
    </div>
  );
}