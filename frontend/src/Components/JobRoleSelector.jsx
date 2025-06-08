import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

const techRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Machine Learning Engineer',
  'Mobile App Developer',
  'UI/UX Designer',
  'Software Architect',
  'Product Manager',
  'QA Engineer',
  'Cloud Engineer',
  'Cybersecurity Specialist',
  'Database Administrator',
  'Game Developer'
];

const JobRoleSelector = ({ selectedRole, onRoleChange }) => {
  const [roleType, setRoleType] = useState('predefined');
  const [customRole, setCustomRole] = useState('');

  const handleRoleTypeChange = (value) => {
    setRoleType(value);
    if (value === 'predefined') {
      setCustomRole('');
      onRoleChange('');
    }
  };

  const handleCustomRoleChange = (value) => {
    setCustomRole(value);
    onRoleChange(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-black mb-4 block">
          Select Your Target Job Role
        </Label>
        <RadioGroup value={roleType} onValueChange={handleRoleTypeChange} className="space-y-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="predefined" id="predefined" />
            <Label htmlFor="predefined" className="font-medium">Choose from popular tech roles</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom" className="font-medium">Enter custom role</Label>
          </div>
        </RadioGroup>
      </div>

      {roleType === 'predefined' && (
        <div className="space-y-2">
          <Label htmlFor="role-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Popular Tech Roles
          </Label>
          <Select value={selectedRole} onValueChange={onRoleChange}>
            <SelectTrigger className="w-full h-12 text-base text-gray-900 dark:text-gray-100">
              <SelectValue placeholder="Select a tech role..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
              {techRoles.map((role) => (
                <SelectItem 
                  key={role} 
                  value={role}
                  className="text-gray-900 dark:text-gray-100 data-[state=checked]:bg-purple-50 dark:data-[state=checked]:bg-purple-900/20 hover:bg-purple-50 dark:hover:bg-purple-900/20 outline-none data-[highlighted]:bg-purple-50 dark:data-[highlighted]:bg-purple-900/20"
                >
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {roleType === 'custom' && (
        <div className="space-y-2">
          <Label htmlFor="custom-role" className="text-sm font-medium text-gray-700">
            Custom Role
          </Label>
          <Input
            id="custom-role"
            type="text"
            placeholder="Enter your target job role..."
            value={customRole}
            onChange={(e) => handleCustomRoleChange(e.target.value)}
            className="h-12 text-base"
          />
        </div>
      )}
    </div>
  );
};

export default JobRoleSelector;
