import React from 'react';
import { Plus, Minus, Trash2, UserPlus } from 'lucide-react';
import { Team } from '../types';

interface ScoreBoardProps {
  teams: Team[];
  onUpdateScore: (teamId: number, delta: number) => void;
  onUpdateName: (teamId: number, name: string) => void;
  onAddTeam: () => void;
  onRemoveTeam: (teamId: number) => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  teams, 
  onUpdateScore,
  onUpdateName,
  onAddTeam,
  onRemoveTeam
}) => {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 card-shadow p-2">
      <div className="flex flex-row items-stretch gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {teams.map((team) => (
          <div key={team.id} className="flex flex-col items-center flex-1 min-w-[100px] max-w-[180px]">
             {/* Controls */}
             <div className="flex gap-1 mb-1 items-center justify-center w-full">
                <button 
                  onClick={() => onRemoveTeam(team.id)}
                  className="p-0.5 rounded bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors mr-auto"
                  title="Remove Team"
                  disabled={teams.length <= 1}
                >
                  <Trash2 size={12} />
                </button>
                
                <button 
                  onClick={() => onUpdateScore(team.id, -100)}
                  className="p-0.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  title="-100"
                >
                  <Minus size={14} />
                </button>
                 <button 
                  onClick={() => onUpdateScore(team.id, 100)}
                  className="p-0.5 rounded bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors border border-teal-200"
                  title="+100"
                >
                  <Plus size={14} />
                </button>
            </div>
            
            {/* Team Label (Editable) */}
            <input
              type="text"
              value={team.name}
              onChange={(e) => onUpdateName(team.id, e.target.value)}
              className="bg-slate-100 border border-slate-300 px-1 py-0.5 rounded-t-lg w-full text-center font-bold text-slate-600 text-xs truncate focus:outline-none focus:bg-white focus:border-teal-400 focus:ring-1 focus:ring-teal-100 transition-all placeholder:text-slate-300"
              placeholder="Team Name"
            />
            
            {/* Score Display */}
            <div className="border border-t-0 border-slate-800 rounded-b-lg w-full text-center py-1 text-xl md:text-2xl font-mono font-bold bg-white text-slate-800 leading-none">
              {team.score}
            </div>
          </div>
        ))}

        {/* Add Team Button */}
        <div className="flex flex-col justify-end min-w-[50px]">
          <button 
            onClick={onAddTeam}
            className="h-full min-h-[60px] w-full border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 transition-all group"
            title="Add New Team"
          >
             <div className="p-1 rounded-full bg-slate-100 group-hover:bg-white transition-colors">
               <UserPlus size={16} />
             </div>
             <span className="text-[9px] uppercase font-bold tracking-wide">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};