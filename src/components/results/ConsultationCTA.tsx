import React from 'react';
import { PopupButton } from 'react-calendly';

interface ConsultationCTAProps {
  calendarLink: string;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ calendarLink }) => {
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-4">
        Want a detailed breakdown of your creator business opportunities?
      </p>
      <PopupButton
        url={calendarLink}
        rootElement={document.getElementById('root')!}
        text="Get Your Free Strategy Session"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      />
      <p className="text-sm text-gray-500 mt-3">
        15-minute consultation with a creator business specialist
      </p>
    </div>
  );
};