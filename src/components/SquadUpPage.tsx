
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Calendar, DollarSign, MapPin, Clock, User, Sparkles, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface GroupRental {
  id: string;
  title: string;
  description: string;
  cost_per_person: number;
  max_participants: number;
  start_date: string;
  end_date: string;
  status: 'open' | 'full' | 'confirmed' | 'cancelled';
  created_at: string;
  organizer: {
    full_name: string;
  };
  participants: {
    id: string;
    participant_id: string;
    payment_status: string;
  }[];
}

const SquadUpPage = () => {
  const [groupRentals, setGroupRentals] = useState<GroupRental[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const [newRental, setNewRental] = useState({
    title: "",
    description: "",
    cost_per_person: "",
    max_participants: "",
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    fetchGroupRentals();
  }, []);

  const fetchGroupRentals = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching group rentals...');
      
      // Use mock data for now to avoid database issues
      const mockData: GroupRental[] = [
        {
          id: "1",
          title: "Shared PlayStation 5 for Gaming Tournament",
          description: "Looking for 3 more people to split the cost of renting a PS5 for the upcoming gaming tournament week.",
          cost_per_person: 250,
          max_participants: 4,
          start_date: "2024-01-15",
          end_date: "2024-01-22",
          status: 'open' as const,
          created_at: "2024-01-10",
          organizer: { full_name: "Rahul Kumar" },
          participants: [
            { id: "1", participant_id: "user1", payment_status: "paid" }
          ]
        },
        {
          id: "2", 
          title: "DSLR Camera for College Fest",
          description: "Need 2 more people to rent a professional DSLR camera for our college cultural fest photography.",
          cost_per_person: 150,
          max_participants: 3,
          start_date: "2024-02-01",
          end_date: "2024-02-05",
          status: 'open' as const,
          created_at: "2024-01-12",
          organizer: { full_name: "Priya Singh" },
          participants: []
        },
        {
          id: "3",
          title: "MacBook Pro for Coding Bootcamp",
          description: "Split the cost of a high-end MacBook Pro rental for our intensive 2-week coding bootcamp.",
          cost_per_person: 400,
          max_participants: 5,
          start_date: "2024-02-10",
          end_date: "2024-02-24",
          status: 'open' as const,
          created_at: "2024-01-14",
          organizer: { full_name: "Alex Chen" },
          participants: [
            { id: "2", participant_id: "user2", payment_status: "paid" },
            { id: "3", participant_id: "user3", payment_status: "pending" }
          ]
        }
      ];

      setGroupRentals(mockData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroupRental = async () => {
    if (!user) return;

    try {
      // For now, just add to the mock data
      const newId = Date.now().toString();
      const newGroupRental: GroupRental = {
        id: newId,
        title: newRental.title,
        description: newRental.description,
        cost_per_person: parseFloat(newRental.cost_per_person),
        max_participants: parseInt(newRental.max_participants),
        start_date: newRental.start_date,
        end_date: newRental.end_date,
        status: 'open',
        created_at: new Date().toISOString(),
        organizer: { full_name: user.email || "You" },
        participants: []
      };

      setGroupRentals(prev => [newGroupRental, ...prev]);

      // Reset form
      setNewRental({
        title: "",
        description: "",
        cost_per_person: "",
        max_participants: "",
        start_date: "",
        end_date: ""
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const joinGroupRental = async (groupRentalId: string) => {
    if (!user) return;

    try {
      setGroupRentals(prev => prev.map(rental => {
        if (rental.id === groupRentalId) {
          return {
            ...rental,
            participants: [...rental.participants, {
              id: Date.now().toString(),
              participant_id: user.id,
              payment_status: 'pending'
            }]
          };
        }
        return rental;
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading amazing group rentals...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Users className="w-64 h-64 text-purple-600" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full text-sm font-medium mb-6 border border-purple-200">
              <Sparkles className="w-4 h-4" />
              Squad Up & Save Together
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Group Rentals Made Easy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join forces with fellow students to rent expensive items together and split the costs. 
              From gaming consoles to professional cameras, make everything affordable! 🚀
            </p>
          </div>
        </div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Active Group Rentals</h2>
              <p className="text-gray-600">Find or create group rental opportunities</p>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Group Rental
          </Button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <Card className="mb-12 border-0 shadow-xl bg-gradient-to-r from-white to-purple-50 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Create New Group Rental
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <Input
                placeholder="Title (e.g., PlayStation 5 for Gaming Week)"
                value={newRental.title}
                onChange={(e) => setNewRental({...newRental, title: e.target.value})}
                className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
              />
              <Input
                placeholder="Description"
                value={newRental.description}
                onChange={(e) => setNewRental({...newRental, description: e.target.value})}
                className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  type="number"
                  placeholder="Cost per person (₹)"
                  value={newRental.cost_per_person}
                  onChange={(e) => setNewRental({...newRental, cost_per_person: e.target.value})}
                  className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                />
                <Input
                  type="number"
                  placeholder="Max participants"
                  value={newRental.max_participants}
                  onChange={(e) => setNewRental({...newRental, max_participants: e.target.value})}
                  className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  type="date"
                  placeholder="Start date"
                  value={newRental.start_date}
                  onChange={(e) => setNewRental({...newRental, start_date: e.target.value})}
                  className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                />
                <Input
                  type="date"
                  placeholder="End date"
                  value={newRental.end_date}
                  onChange={(e) => setNewRental({...newRental, end_date: e.target.value})}
                  className="text-lg py-3 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={createGroupRental} 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-xl flex-1 sm:flex-none"
                >
                  Create Group Rental
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rental Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {groupRentals.map((rental) => (
            <Card key={rental.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start relative z-10">
                  <CardTitle className="text-lg leading-tight pr-4">{rental.title}</CardTitle>
                  <Badge className="bg-green-400 text-green-900 border-0 font-semibold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 mr-1" />
                    {rental.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{rental.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-xl">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold">₹{rental.cost_per_person}/person</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-xl">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">{rental.participants.length}/{rental.max_participants}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 p-3 rounded-xl">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{new Date(rental.start_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-xl">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold">{Math.ceil((new Date(rental.end_date).getTime() - new Date(rental.start_date).getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-xl">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Organized by <span className="font-semibold text-purple-600">{rental.organizer.full_name}</span></span>
                </div>

                <Button 
                  onClick={() => joinGroupRental(rental.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={rental.participants.length >= rental.max_participants}
                >
                  {rental.participants.length >= rental.max_participants ? (
                    <>
                      <Users className="w-4 h-4 mr-2" />
                      Group Full
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Join Group
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {groupRentals.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-purple-100">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Users className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Active Group Rentals</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Be the first to create a group rental and start saving money with your campus community!</p>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create First Group Rental
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadUpPage;
