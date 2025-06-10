import React from 'react';
import { MapPin, Briefcase, Heart } from 'lucide-react';

function ProfileCard({ name, age, location, jobTitle, relationshipGoal, imageUrl }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm">
      <div className="h-80 bg-gradient-to-b from-orange-100 to-white">
        <img
          src={imageUrl}
          alt={`${name}'s profile`}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">{name}, {age}</h2>
        <div className="mt-2 text-gray-600 flex items-center  gap-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className="mt-1 text-gray-600 flex items-center  gap-2">
          <Briefcase size={16} />
          <span>{jobTitle}</span>
        </div>
        <div className="mt-1 text-gray-600 flex items-center  gap-2">
          <Heart size={16} />
          <span>{relationshipGoal}</span>
        </div>

        <div className="mt-6 flex gap-10 justify-between px-8">
          <button className="text-red-500 border border-red-300 rounded-full px-6 py-2 hover:bg-red-50 transition">
            ❌ Skip
          </button>
          <button className="text-green-600 border border-green-300 rounded-full px-6 py-2 hover:bg-green-50 transition">
            💚 Like
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
