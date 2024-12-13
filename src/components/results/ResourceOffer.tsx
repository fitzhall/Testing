import React from 'react';

interface ResourceOfferProps {
  resourceLink: string;
  resourceTitle: string;
}

export const ResourceOffer: React.FC<ResourceOfferProps> = ({ resourceLink, resourceTitle }) => {
  return (
    <div className="text-center text-sm text-gray-600">
      <p>
        Or download our free guide:
        <a href={resourceLink} className="text-blue-600 ml-1 hover:underline">
          {resourceTitle}
        </a>
      </p>
    </div>
  );
};