import { useState, useEffect } from 'react'; // Eliminada la importación innecesaria de React

const upcomingMatches = [
  {
    id: 1,
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    date: '2024-02-01',
    time: '20:45',
    homeShield: 'https://resources.premierleague.com/premierleague/badges/t3.svg',
    awayShield: 'https://resources.premierleague.com/premierleague/badges/t14.svg',
  },
  {
    id: 2,
    homeTeam: 'Chelsea',
    awayTeam: 'Man City',
    date: '2024-02-03',
    time: '18:30',
    homeShield: 'https://resources.premierleague.com/premierleague/badges/t8.svg',
    awayShield: 'https://resources.premierleague.com/premierleague/badges/t43.svg',
  },
  {
    id: 3,
    homeTeam: 'Tottenham',
    awayTeam: 'Man United',
    date: '2024-02-04',
    time: '17:00',
    homeShield: 'https://resources.premierleague.com/premierleague/badges/t6.svg',
    awayShield: 'https://resources.premierleague.com/premierleague/badges/t1.svg',
  },
  {
    id: 4,
    homeTeam: 'Newcastle',
    awayTeam: 'West Ham',
    date: '2024-02-05',
    time: '21:00',
    homeShield: 'https://resources.premierleague.com/premierleague/badges/t4.svg',
    awayShield: 'https://resources.premierleague.com/premierleague/badges/t21.svg',
  },
];

const UpcomingMatches = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === upcomingMatches.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Matches</h2>
      <div className="relative overflow-hidden" style={{ height: '160px' }}>
        <div 
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="absolute top-0 left-0 flex">
            {upcomingMatches.map((match) => ( // Eliminado el "index" no utilizado
              <div 
                key={match.id}
                className="w-full flex-shrink-0"
                style={{ width: '100%' }}
              >
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={match.homeShield} 
                      alt={match.homeTeam} 
                      className="w-16 h-16"
                    />
                    <span className="text-lg font-semibold">{match.homeTeam}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-500">{match.date}</div>
                    <div className="text-lg font-bold text-blue-600">{match.time}</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold">{match.awayTeam}</span>
                    <img 
                      src={match.awayShield} 
                      alt={match.awayTeam} 
                      className="w-16 h-16"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        {upcomingMatches.map((_, index) => ( // "index" se usa aquí
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;