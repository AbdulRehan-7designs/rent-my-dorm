
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const PasswordInput = ({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  required = false 
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base font-semibold text-gray-700">{label}</Label>
      <div className="relative group">
        <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-purple-500 group-focus-within:text-purple-500" />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="pl-12 pr-12 h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-10 w-10 hover:bg-purple-100 rounded-lg"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};
