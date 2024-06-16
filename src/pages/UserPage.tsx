import React from 'react';
import BaseSection from '../components/BaseSection';

function UserPage() {
  return (
    <BaseSection>
      <div className='w-full p-5 '>
        <p className='text-4xl font-lora'>Hello User,</p>
        <button className='shadow-md text-sm border-2 border-[#ff512e] bg-[#ff512e] text-white p-2 rounded-md'>
          Login / Edit Profile
        </button>
      </div>
      <div className='flex'>
        <div>Like</div>
        <div>Saved</div>
      </div>
    </BaseSection>
  );
}

export default UserPage;
