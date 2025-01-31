import { Link } from 'react-router-dom';
import UpcomingMatches from './UpcomingMatches';
import LeagueStandings from './LeagueStandings';

const mockMatches = [
  { 
    id: 1, 
    homeTeam: 'Arsenal', 
    awayTeam: 'Chelsea', 
    date: '2024-01-20',
    homeShield: 'https://resources.premierleague.com/premierleague/badges/t3.svg',
    awayShield: 'https://resources.premierleague.com/premierleague/badges/t8.svg',
    score: '2-1'
  },
  { 
    id: 2, 
    homeTeam: 'Liverpool', 
    awayTeam: 'Man City', 
    date: '2024-01-21',
    homeShield: 'https://resources.premierleague.com/premierleague/badges/t14.svg',
    awayShield: 'https://resources.premierleague.com/premierleague/badges/t43.svg',
    score: '3-2'
  },
  { 
    id: 3, 
    homeTeam: 'Man United', 
    awayTeam: 'Tottenham', 
    date: '2024-01-22',
    homeShield: 'https://resources.premierleague.com/premierleague/badges/t1.svg',
    awayShield: 'https://resources.premierleague.com/premierleague/badges/t6.svg',
    score: '1-1'
  },
];

const MatchList = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Recent Matches</h1>
          <div className="space-y-6">
            {mockMatches.map((match) => (
              <Link
                key={match.id}
                to={`/match/${match.id}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8 flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="relative group">
                          <img 
                            src={match.homeShield} 
                            alt={match.homeTeam} 
                            className="w-16 h-16 transform transition-transform duration-300 group-hover:scale-110" 
                          />
                        </div>
                        <span className="text-xl font-semibold text-gray-800">{match.homeTeam}</span>
                      </div>
                      
                      <div className="px-6 py-2 bg-blue-50 rounded-lg">
                        <span className="text-2xl font-bold text-blue-600">{match.score}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-semibold text-gray-800">{match.awayTeam}</span>
                        <div className="relative group">
                          <img 
                            src={match.awayShield} 
                            alt={match.awayTeam} 
                            className="w-16 h-16 transform transition-transform duration-300 group-hover:scale-110" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-gray-500 ml-8 font-medium">{match.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <LeagueStandings />
        </div>
      </div>
      
      <div className="mt-12">
        <UpcomingMatches />
      </div>
    </div>
  );
};

export default MatchList;