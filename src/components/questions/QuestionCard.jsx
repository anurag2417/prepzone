import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { DIFFICULTIES } from '../../constants/difficulty';
import { useQuestions } from '../../context/QuestionContext';

export const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const { updateQuestion } = useQuestions();
  const difficultyObj = DIFFICULTIES.find(d => d.value === question.difficulty) || DIFFICULTIES[0];

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    updateQuestion(question.id, { status: newStatus });
  };

  return (
    <div
      onClick={() => navigate(`/questions/${question.id}`)}
      className="glass-panel rounded-2xl p-5 cursor-pointer hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 flex flex-col group"
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-base font-semibold text-gray-100 line-clamp-2 pr-2 group-hover:text-blue-400 transition-colors">{question.title}</h4>
        <StatusBadge status={question.status} />
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs mb-5 flex-1">
        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md font-medium">{question.topic}</span>
        <span className={`text-${difficultyObj.color}-400 bg-${difficultyObj.color}-500/10 border border-${difficultyObj.color}-500/20 px-2.5 py-1 rounded-md font-medium`}>{difficultyObj.label}</span>
        {question.company && <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-medium">{question.company}</span>}
      </div>
      <div className="flex justify-end mt-auto pt-3 border-t border-white/5">
         <select
           value={question.status}
           onChange={(e) => handleStatusChange(e, e.target.value)}
           onClick={e => e.stopPropagation()}
           className="text-xs bg-white/5 border-white/10 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-1.5 pl-3 pr-8"
         >
           <option value="not-started" className="bg-gray-900">Not Started</option>
           <option value="attempted" className="bg-gray-900">Attempted</option>
           <option value="confident" className="bg-gray-900">Confident</option>
         </select>
      </div>
    </div>
  );
};

export default QuestionCard;