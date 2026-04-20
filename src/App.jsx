import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { QuestionProvider } from './context/QuestionContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import Spinner from './components/ui/Spinner';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const QuestionBankPage = lazy(() => import('./pages/QuestionBankPage'));
const QuestionDetailPage = lazy(() => import('./pages/QuestionDetailPage'));
const CompanyTrackerPage = lazy(() => import('./pages/CompanyTrackerPage'));
const GoalsPage = lazy(() => import('./pages/GoalsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ... (imports remain the same)

const AppLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col selection:bg-blue-500/30">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  </div>
);

// ... (App component remains exactly the same)

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuestionProvider>
          <Toaster position="top-right" />
          <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner size="lg" /></div>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
                <Route path="/questions" element={<AppLayout><QuestionBankPage /></AppLayout>} />
                <Route path="/questions/:id" element={<AppLayout><QuestionDetailPage /></AppLayout>} />
                <Route path="/companies" element={<AppLayout><CompanyTrackerPage /></AppLayout>} />
                <Route path="/goals" element={<AppLayout><GoalsPage /></AppLayout>} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </QuestionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;