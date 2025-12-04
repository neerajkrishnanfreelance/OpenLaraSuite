import React, { useState } from 'react';

// --- Icons (Using the same Heroicons style for consistency) ---
const SendIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0110.5 12a59.768 59.768 0 01-7.231 8.874L6 12zM12 12h8" />
  </svg>
);

const PaperClipIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 7.5L10.5 15.375m0 0l-5.625 5.625m5.625-5.625 5.625-5.625m-1.259 0L10.5 15.375m1.259-1.259L15.375 10.5m-5.625 5.625h8.625m-8.625 0H6.75" />
  </svg>
);
// -------------------------------------------------------------

// Dummy data structure for the feed
const initialFeed = [
  {
    id: 3,
    user: 'Jane Doe',
    avatar: 'https://picsum.photos/40?random=3',
    timestamp: '5 minutes ago',
    content: 'The initial draft of the project plan has been uploaded to the shared drive. Please review the timelines.',
    type: 'Comment',
  },
  {
    id: 2,
    user: 'System Bot',
    timestamp: '2 hours ago',
    content: 'Status changed from **Pending** to **In Progress**',
    type: 'Update',
  },
  {
    id: 1,
    user: 'John Doe',
    avatar: 'https://picsum.photos/40?random=1',
    timestamp: 'Yesterday',
    content: 'Initial task created and assigned to Jane Doe.',
    type: 'Activity',
  },
];

const FeedItem = ({ item }) => {
  const isComment = item.type === 'Comment';
  const isActivity = item.type !== 'Comment';

  return (
    <div className={`flex space-x-3 pb-4 ${isActivity ? 'opacity-80' : ''}`}>
      <div className="flex-shrink-0">
        {item.avatar ? (
          <img className="h-8 w-8 rounded-full object-cover" src={item.avatar} alt={item.user} />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
            {item.user.slice(0, 2)}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {item.user}
          <span className={`ml-2 text-xs font-normal ${isComment ? 'text-gray-500' : 'text-blue-600'}`}>
            • {item.timestamp}
          </span>
        </p>
        <div className={`mt-1 text-sm ${isComment ? 'text-gray-700' : 'text-gray-600 italic'}`}>
          {/* dangerouslySetInnerHTML used here only for demonstration of rich text/bolded updates */}
          <span dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    </div>
  );
};


const ChatterBox = ({ recordId = 'TASK-101' }) => {
  const [feed, setFeed] = useState(initialFeed);
  const [newComment, setNewComment] = useState('');
  const [tab, setTab] = useState('Feed'); // 'Feed' or 'Related'

  const handlePost = () => {
    if (newComment.trim() === '') return;

    const newEntry = {
      id: Date.now(),
      user: 'Current User', // Placeholder for logged-in user
      avatar: 'https://picsum.photos/40?random=9',
      timestamp: 'Just now',
      content: newComment.trim(),
      type: 'Comment',
    };

    setFeed([newEntry, ...feed]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100/80 w-full max-w-xl mx-auto my-6 flex flex-col h-full">
      
      {/* --- 1. Comment/Post Box (Always Visible) --- */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex space-x-3">
          {/* User Avatar */}
          <img 
            className="h-10 w-10 rounded-full object-cover flex-shrink-0" 
            src="https://picsum.photos/40?random=9" 
            alt="User" 
          />
          
          <div className="flex-1">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-none"
              rows="3"
              placeholder={`Add a comment to ${recordId}...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-3">
                <button 
                  className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                  title="Attach file"
                >
                  <PaperClipIcon />
                </button>
                {/* Add more action buttons here (e.g., mention, emoji) */}
              </div>
              
              <button
                onClick={handlePost}
                disabled={newComment.trim() === ''}
                className={`flex items-center space-x-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors 
                  ${newComment.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                `}
              >
                <SendIcon className="w-4 h-4" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. Tabs (Feed/Activity History) --- */}
      <div className="flex border-b border-gray-200 px-4 pt-2">
        <button
          onClick={() => setTab('Feed')}
          className={`pb-3 px-3 text-sm font-medium transition-colors ${
            tab === 'Feed' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
          }`}
        >
          Activity Feed ({feed.length})
        </button>
        <button
          onClick={() => setTab('Related')}
          className={`pb-3 px-3 text-sm font-medium transition-colors ${
            tab === 'Related' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
          }`}
        >
          Related Items
        </button>
      </div>

      {/* --- 3. Content Area (Scrollable Feed) --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tab === 'Feed' && (
          <div className="space-y-6">
            {feed.map((item) => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {tab === 'Related' && (
          <div className="p-4 bg-gray-50 rounded-lg text-gray-600">
            <h4 className="font-semibold mb-2">Attached Records</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Document-A.pdf (Attached 3 days ago)</li>
              <li>Linked Task: Review Marketing Copy</li>
              <li>Owner changed to Jane Doe (Yesterday)</li>
            </ul>
          </div>
        )}
        
        {feed.length === 0 && tab === 'Feed' && (
             <p className="text-center text-gray-500 italic mt-8">No activity yet. Be the first to post!</p>
        )}
      </div>

    </div>
  );
};

export default ChatterBox;