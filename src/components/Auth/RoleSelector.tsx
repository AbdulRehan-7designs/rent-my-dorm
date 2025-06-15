
import { LucideIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  emojis: string[];
  features?: string[];
  benefits?: string[];
  stats?: Record<string, string>;
}

interface RoleSelectorProps {
  roles: Role[];
  selectedRole: string;
  onRoleSelect: (roleId: string) => void;
  compact?: boolean;
}

export const RoleSelector = ({ roles, selectedRole, onRoleSelect, compact = false }: RoleSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className={`${compact ? 'text-base' : 'text-lg'} font-bold text-gray-700 block`}>
        Choose Your Superhero Role 🦸‍♀️
      </Label>
      <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-3'} gap-${compact ? '3' : '6'}`}>
        {roles.map((role) => (
          <div
            key={role.id}
            className={`relative p-${compact ? '4' : '6'} rounded-2xl border-3 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
              selectedRole === role.id
                ? `border-transparent bg-gradient-to-br ${role.bgGradient} scale-105 ${compact ? '' : 'rotate-6'} shadow-xl ring-4 ring-opacity-50`
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
            }`}
            onClick={() => onRoleSelect(role.id)}
          >
            <div className={`${compact ? 'flex items-center space-x-4' : 'text-center'}`}>
              <div className={`${compact ? 'w-12 h-12' : 'w-16 h-16 mx-auto'} rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                selectedRole === role.id 
                  ? `bg-gradient-to-r ${role.color} scale-110 rotate-6 shadow-lg` 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                <role.icon className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} transition-all duration-500 ${
                  selectedRole === role.id ? 'text-white scale-110' : 'text-gray-600'
                }`} />
              </div>
              <div className={compact ? 'flex-1' : ''}>
                <h3 className={`${compact ? '' : 'text-xl'} font-bold text-gray-900 mb-2`}>{role.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                
                <div className={`flex ${compact ? 'space-x-1' : 'justify-center space-x-2'} mb-4`}>
                  {role.emojis.map((emoji, index) => (
                    <span key={index} className={`${compact ? 'text-lg' : 'text-2xl'} transition-all duration-300 ${
                      selectedRole === role.id ? 'animate-bounce' : ''
                    }`} style={{animationDelay: `${index * 0.1}s`}}>
                      {emoji}
                    </span>
                  ))}
                </div>

                {role.features && !compact && (
                  <div className="space-y-2 text-left mb-4">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <div className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${
                          selectedRole === role.id ? 'bg-green-400 animate-pulse' : 'bg-gray-300'
                        }`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                {role.benefits && (
                  <div className="flex flex-wrap gap-2">
                    {role.benefits.map((benefit, index) => (
                      <span key={index} className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                        selectedRole === role.id 
                          ? 'bg-purple-100 text-purple-700 animate-pulse' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {selectedRole === role.id && (
              <div className={`absolute -top-${compact ? '2' : '3'} -right-${compact ? '2' : '3'} w-${compact ? '6' : '8'} h-${compact ? '6' : '8'} bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg`}>
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
