
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  Moon, 
  Globe, 
  ArrowLeft,
  Smartphone,
  Mail,
  MessageSquare,
  Camera
} from 'lucide-react';

const SettingsPage = ({ onBack }) => {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
    newListings: true,
    messages: true,
    rentals: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showActivity: false,
    allowMessages: true
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'English',
    autoBackup: true
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-8">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-500" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive notifications on your device</p>
                </div>
              </div>
              <Switch 
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
              </div>
              <Switch 
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="new-messages">New Messages</Label>
                  <p className="text-sm text-gray-600">Get notified of new chat messages</p>
                </div>
              </div>
              <Switch 
                id="new-messages"
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-orange-500" />
              <span>Privacy & Security</span>
            </CardTitle>
            <CardDescription>Control your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="profile-visible">Public Profile</Label>
                  <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                </div>
              </div>
              <Switch 
                id="profile-visible"
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="show-activity">Show Activity Status</Label>
                  <p className="text-sm text-gray-600">Let others see when you're online</p>
                </div>
              </div>
              <Switch 
                id="show-activity"
                checked={privacy.showActivity}
                onCheckedChange={(checked) => setPrivacy({...privacy, showActivity: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-orange-500" />
              <span>App Preferences</span>
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
              </div>
              <Switch 
                id="dark-mode"
                checked={preferences.darkMode}
                onCheckedChange={(checked) => setPreferences({...preferences, darkMode: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="auto-backup">Auto Backup</Label>
                  <p className="text-sm text-gray-600">Automatically backup your data</p>
                </div>
              </div>
              <Switch 
                id="auto-backup"
                checked={preferences.autoBackup}
                onCheckedChange={(checked) => setPreferences({...preferences, autoBackup: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
