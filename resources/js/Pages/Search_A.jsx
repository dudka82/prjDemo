import { useState } from 'react';

function Checkbox({ label }) {
  return (
    <div className="flex items-center mb-2">
      <input type="checkbox" className="mr-2" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
function Logo() {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  }
function EventCard() {
  return (
    <div className="bg-orange-50 p-4 rounded-lg shadow-sm w-64">
      <div className="flex items-center mb-2">
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Ред.</span>
        <span className="text-sm ml-2">концерт макана</span>
      </div>
      <p className="text-sm mb-4">Для вас это будет незабываемым представлением, бируши можно будет взять при входе</p>
      <p className="text-xs mb-1">Мест осталось: 1000</p>
      <p className="text-xs mb-4">Дата: 31.02.2025/ 10:00</p>
      <button className="bg-orange-200 text-orange-600 text-sm px-4 py-2 rounded-full w-full">Забронировать место</button>
    </div>
  );
}

export default function MainPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
   <div className="min-h-screen bg-white">
      <header className="bg-orange-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-black mr-2 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Главная</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Категории</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Каталог</a>
          </nav>
          <a href="#" className="text-gray-700 hover:text-gray-900">Личный кабинет</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Поиск</h2>
        <div className="flex justify-center mb-8">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full max-w-md p-2 border border-gray-300 rounded-l-full" 
            placeholder="Поиск"
          />
          <button className="bg-orange-200 text-orange-600 px-4 py-2 rounded-r-full">Поиск</button>
        </div>

        <div className="flex mb-8">
          <div >
            <h3 className="text-lg font-bold mb-4">Выбор категорий</h3>
            <Checkbox label="Концерт" />
            <Checkbox label="Выставка" />
            <Checkbox label="Праздник" />
            <Checkbox label="Выступление" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4 text-center">Мероприятия для вас</h3>
            <div className="flex justify-center space-x-4">
              <EventCard />
              <EventCard />
              <EventCard />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-orange-200  mt-64 py-6">
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
    </div>
  );
}