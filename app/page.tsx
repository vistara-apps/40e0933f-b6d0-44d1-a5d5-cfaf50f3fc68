import { FrameWrapper } from '../components/FrameWrapper';
import { MemoGenerator } from '../components/MemoGenerator';
import { LawyerNetwork } from '../components/LawyerNetwork';
import { StatusDashboard } from '../components/StatusDashboard';

export default function HomePage() {
  return (
    <FrameWrapper>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary to-accent text-white">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-display mb-4">
                VeriLex
              </h1>
              <p className="text-xl mb-6 opacity-90">
                AI-powered legal verification by top city lawyers
              </p>
              <p className="text-body opacity-80 max-w-2xl mx-auto">
                Get instant AI-generated legal memos, then have them verified by qualified lawyers 
                from leading firms in your jurisdiction.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Memo Generation */}
            <div className="space-y-6">
              <MemoGenerator />
            </div>

            {/* Lawyer Network & Status */}
            <div className="space-y-6">
              <LawyerNetwork />
              <StatusDashboard />
            </div>
          </div>
        </div>
      </div>
    </FrameWrapper>
  );
}
