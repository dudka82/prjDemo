 
import React from 'react';

const Logo = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L4 6l8 4 8-4-8-4zM4 10l8 4 8-4M4 14l8 4 8-4" />
    </svg>
  );



  
  export default function a(){
  

return(
 

    <div className=" bg-white">
      <header className="bg-orange-100 py-4">
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

      <main className="max-w-6xl mx-auto p-4 mt-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Личный кабинет</h1>
        <div className="flex justify-between">
          <form  className="w-1/2 pr-8">
            <h2 className="text-lg font-bold mb-4">Новое мероприятие</h2>
            <input label="дата" type="date" />
            <input label="Время" type="time" />
            <input label="место" />
            <input label="тематика" />
            <input label="кол-во мест" type="number" />
            <input label="Описание" />
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg">Создать</button>
          </form>
       
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