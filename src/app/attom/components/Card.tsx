"use client";
import Loading from '@/app/loading';
import Image from 'next/image';
import React from 'react';

interface PropertyData {
    property_address_bldgName: string | null;
    property_address_country: string | null;
    property_area_munname: string | null;
    property_summary_legal1: string | null;
}

interface CardProps {
    data: PropertyData[];
    loading: boolean;
}

const Card: React.FC<CardProps> = ({ data, loading }) => {

  if(loading) return <Loading />

    if (data.length===0) {
        return (
            <div className="w-128 h-60 rounded shadow-md flex justify-center text-xl card text-grey-darkest p-4">
                No data available
            </div>
        );
    }

    const property = data[0]; // Access the first item safely

    return (
        <>
            <p className="text-2xl font-semibold text-center mt-12">
                Search Result:
            </p>

            <div className="flex justify-center mt-10 h-screen bg-blue-lightest">
                <div className="bg-white w-[70%] h-60 rounded shadow-md flex card text-grey-darkest">
                    <Image
                        width={1000}
                        height={1000}
                        className="w-1/2 h-full rounded-l-sm"
                        src="https://i.ibb.co/HX1BVTV/8074.jpg"
                        alt="Room Image"
                    />
                    <div className="w-full flex flex-col">
                        <div className="p-4 pb-0 flex-1">
                            <h3 className="font-light mb-1 text-grey-darkest">
                                {property.property_summary_legal1 || 'No Name'}
                            </h3>
                            <div className="text-xs flex items-center mb-4">
                                <i className="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                                {property.property_area_munname || 'Location not available'},{' '}
                                {property.property_address_country || 'Country not available'}
                            </div>
                        </div>
                        <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                            Book Now
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
