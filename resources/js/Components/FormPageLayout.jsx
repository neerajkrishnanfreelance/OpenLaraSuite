import React from 'react';
import Chatter from './Chatter';
import MeetingList from './MeetingList';

export default function FormPageLayout({
    children,
    chatterData = [],
    meetingsData = [],
    chatterableId,
    chatterableType,
    isCreate = false
}) {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white shadow sm:rounded-lg p-6">
                            {children}
                        </div>
                    </div>

                    {/* Right Column - Chatter */}
                    <div className="lg:col-span-1">
                        {isCreate ? (
                            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-full flex flex-col justify-center">
                                <p className="text-gray-500 text-sm">Save the record first to access Chatter.</p>
                            </div>
                        ) : (
                            <Chatter
                                messages={chatterData}
                                chatterableId={chatterableId}
                                chatterableType={chatterableType}
                            />
                        )}
                    </div>
                </div>

                {/* Bottom Section - Meetings */}
                <div className="mt-6">
                    {isCreate ? (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <p className="text-gray-500 text-sm">Save the record first to schedule Meetings.</p>
                        </div>
                    ) : (
                        <MeetingList
                            meetings={meetingsData}
                            meetingableId={chatterableId}
                            meetingableType={chatterableType}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
