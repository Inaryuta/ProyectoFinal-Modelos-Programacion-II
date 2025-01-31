import { useParams } from 'react-router-dom';
import { playerImages, PlayerInfo } from '../services/playerImages';

const mockMatchesData = {
  "1": {
    id: 1,
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    score: "2-1",
    date: "2024-01-20",
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 15, away: 8 },
      shotsOnTarget: { home: 7, away: 3 },
      corners: { home: 8, away: 4 },
      fouls: { home: 10, away: 12 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 0 },
      passes: { home: 523, away: 432 },
      passAccuracy: { home: 87, away: 82 }
    },
    mvp: {
      name: "Bukayo Saka",
      stats: "1 Goal, 1 Assist, 8 Key Passes"
    },
    highlights: [
      {
        player: "Bukayo Saka",
        moment: "Brilliant goal from outside the box",
        minute: "23"
      },
      {
        player: "Gabriel Jesus",
        moment: "Clinical finish after a great team play",
        minute: "45"
      },
      {
        player: "Martin Ødegaard",
        moment: "Incredible through ball assist",
        minute: "67"
      },
      {
        player: "Declan Rice",
        moment: "Crucial tackle to prevent a counter-attack",
        minute: "78"
      },
      {
        player: "Gabriel Martinelli",
        moment: "Amazing dribble past three defenders",
        minute: "82"
      }
    ]
  },
  "2": {
    id: 2,
    homeTeam: "Liverpool",
    awayTeam: "Man City",
    score: "3-2",
    date: "2024-01-21",
    stats: {
      possession: { home: 51, away: 49 },
      shots: { home: 12, away: 14 },
      shotsOnTarget: { home: 6, away: 5 },
      corners: { home: 6, away: 7 },
      fouls: { home: 8, away: 9 },
      yellowCards: { home: 1, away: 2 },
      redCards: { home: 0, away: 0 },
      passes: { home: 489, away: 502 },
      passAccuracy: { home: 85, away: 88 }
    },
    mvp: {
      name: "Mohamed Salah",
      stats: "2 Goals, 1 Assist"
    },
    highlights: []
  },
  "3": {
    id: 3,
    homeTeam: "Man United",
    awayTeam: "Tottenham",
    score: "1-1",
    date: "2024-01-22",
    stats: {
      possession: { home: 45, away: 55 },
      shots: { home: 10, away: 13 },
      shotsOnTarget: { home: 4, away: 6 },
      corners: { home: 5, away: 7 },
      fouls: { home: 11, away: 9 },
      yellowCards: { home: 2, away: 1 },
      redCards: { home: 0, away: 0 },
      passes: { home: 412, away: 478 },
      passAccuracy: { home: 81, away: 84 }
    },
    mvp: {
      name: "Son Heung-min",
      stats: "1 Goal, 6 Shots on Target"
    },
    highlights: []
  }
};

const MatchAnalysis = () => {
  const { id } = useParams();
  const matchData = mockMatchesData[id as keyof typeof mockMatchesData];

  if (!matchData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-red-600">Match not found</div>
      </div>
    );
  }

  const getPlayerInfo = (name: string): PlayerInfo | undefined => {
    return playerImages[name] || {
      image: 'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png',
      position: 'Unknown'
    };
  };

  const StatBar = ({ value, isHome }: { value: number, isHome: boolean }) => (
    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${isHome ? 'bg-blue-500' : 'bg-red-500'}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 my-8">
      {/* Match Header */}
      <div className="text-center mb-8">
        <div className="text-2xl font-bold text-gray-800">
          {matchData.homeTeam} {matchData.score} {matchData.awayTeam}
        </div>
        <div className="text-gray-600">{matchData.date}</div>
      </div>

      {/* Match Statistics */}
      <div className="mb-12 bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Match Statistics</h2>
        <div className="space-y-6">
          {Object.entries(matchData.stats).map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-4 items-center">
              <div className="text-right font-medium text-blue-600">{value.home}%</div>
              <div className="text-center text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="text-left font-medium text-red-600">{value.away}%</div>
              <div className="col-span-3">
                <div className="flex gap-1">
                  <div className="flex-1">
                    <StatBar value={value.home} isHome={true} />
                  </div>
                  <div className="flex-1">
                    <StatBar value={value.away} isHome={false} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MVP Section */}
      {matchData.mvp && (
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Man of the Match</h2>
          <div className="flex items-center space-x-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img 
                src={getPlayerInfo(matchData.mvp.name)?.image || 'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png'}
                alt={matchData.mvp.name}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{matchData.mvp.name}</h3>
              <p className="text-sm text-blue-200">{getPlayerInfo(matchData.mvp.name)?.position || 'Unknown'}</p>
              <p className="text-blue-100 mt-2">{matchData.mvp.stats}</p>
            </div>
          </div>
        </div>
      )}

      {/* Match Highlights Section */}
      {matchData.highlights && matchData.highlights.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Match Highlights</h2>
          <div className="highlights-section flex w-full h-[430px] rounded-xl overflow-hidden">
            {matchData.highlights.map((highlight, index) => (
              <div 
                key={index}
                className="relative group flex-grow transition-all duration-500 hover:flex-[5]"
                style={{ flexBasis: '0' }}
              >
                <img
                  src={getPlayerInfo(highlight.player)?.image || 'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png'}
                  alt={highlight.player}
                  className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:contrast-[1.2] transition-all duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-lg font-bold">{highlight.player}</div>
                  <div className="text-sm text-blue-200">{getPlayerInfo(highlight.player)?.position || 'Unknown'}</div>
                  <div className="text-sm mt-1">{highlight.moment}</div>
                  <div className="text-sm font-semibold text-blue-300">{highlight.minute}'</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchAnalysis;