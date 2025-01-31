

const standings = [
  { position: 1, team: 'Liverpool', played: 21, points: 48, shield: 'https://resources.premierleague.com/premierleague/badges/t14.svg' },
  { position: 2, team: 'Man City', played: 20, points: 46, shield: 'https://resources.premierleague.com/premierleague/badges/t43.svg' },
  { position: 3, team: 'Arsenal', played: 21, points: 43, shield: 'https://resources.premierleague.com/premierleague/badges/t3.svg' },
  { position: 4, team: 'Tottenham', played: 21, points: 42, shield: 'https://resources.premierleague.com/premierleague/badges/t6.svg' },
  { position: 5, team: 'Chelsea', played: 21, points: 41, shield: 'https://resources.premierleague.com/premierleague/badges/t8.svg' },
];

const LeagueStandings = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-slideIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">League Standings</h2>
      <div className="space-y-4">
        {standings.map((team) => (
          <div 
            key={team.position}
            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
          >
            <span className="text-lg font-bold text-blue-600 w-8">{team.position}</span>
            <img src={team.shield} alt={team.team} className="w-8 h-8" />
            <span className="text-gray-800 font-medium flex-1">{team.team}</span>
            <div className="text-right">
              <span className="text-sm text-gray-500">Played: {team.played}</span>
              <div className="text-lg font-bold text-blue-600">{team.points} pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueStandings;