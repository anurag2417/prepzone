import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../services/firebase';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Button from '../components/ui/Button';
import { TOPICS } from '../constants/topics';
import toast from 'react-hot-toast';

export const GoalsPage = () => {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ text: '', targetCount: 10, topic: TOPICS[0], deadline: '' });

  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, `users/${currentUser.uid}/goals`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGoals(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, [currentUser]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `users/${currentUser.uid}/goals`), { ...newGoal, completed: false });
      setNewGoal({ text: '', targetCount: 10, topic: TOPICS[0], deadline: '' });
      toast.success('Goal created successfully');
    } catch { 
      toast.error('Failed to create goal'); 
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/goals`, id), { completed: !currentStatus });
  };

  const handleDelete = async (id) => {
     await deleteDoc(doc(db, `users/${currentUser.uid}/goals`, id));
     toast.success('Goal removed');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-100">Weekly Objectives</h1>

      <form onSubmit={handleAdd} className="glass-panel p-6 rounded-2xl flex flex-wrap gap-5 items-end">
        <div className="flex-1 min-w-62.5">
          <label className="block text-sm font-medium text-gray-300 mb-1">Goal Description</label>
          <input required type="text" value={newGoal.text} onChange={e => setNewGoal({...newGoal, text: e.target.value})} className="w-full" placeholder="e.g. Solve 10 Array Mediums" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Focus Topic</label>
          <select value={newGoal.topic} onChange={e => setNewGoal({...newGoal, topic: e.target.value})} className="w-full">
            {TOPICS.map(t => <option key={t} value={t} className="bg-gray-900 text-white">{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Target Date</label>
          <input required type="date" value={newGoal.deadline} onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} className="w-full" />
        </div>
        <Button type="submit" className="py-2.5">Add Goal</Button>
      </form>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No active goals. Set one above to stay focused!</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${goal.completed ? 'bg-emerald-500/10 border border-emerald-500/20 opacity-60' : 'glass-panel hover:-translate-y-1'}`}>
              <div className="flex items-center space-x-5">
                <input type="checkbox" checked={goal.completed} onChange={() => toggleComplete(goal.id, goal.completed)} className="h-6 w-6 text-blue-500 rounded border-white/20 bg-white/5 focus:ring-blue-500 focus:ring-offset-[#0a0a0a] cursor-pointer transition-colors" />
                <div>
                  <h3 className={`text-lg font-bold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>{goal.text}</h3>
                  <div className="flex gap-3 mt-1 text-sm font-medium">
                    <span className="text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">Topic: {goal.topic}</span>
                    <span className="text-gray-400">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="danger" size="sm" onClick={() => handleDelete(goal.id)}>Delete</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalsPage;