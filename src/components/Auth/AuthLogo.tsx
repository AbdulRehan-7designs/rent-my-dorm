
import { GraduationCap } from 'lucide-react';

interface AuthLogoProps {
  title: string;
  subtitle: string;
}

export const AuthLogo = ({ title, subtitle }: AuthLogoProps) => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </div>
  );
};
