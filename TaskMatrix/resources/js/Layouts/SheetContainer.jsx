import React from 'react';

// --- Icons (Using the same Heroicons style for consistency) ---
const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const PencilIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 18.07a4.995 4.995 0 01-1.63 1.488l-4.508 1.499a.75.75 0 01-.968-.968l1.499-4.508a4.995 4.995 0 011.488-1.63L16.862 4.487zm0 0L19.5 7.125" />
  </svg>
);

const TrashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.46-1.066c-.6-.184-1.207-.275-1.815-.275h-3.886c-.608 0-1.215.09-1.815.275a48.11 48.11 0 00-3.46 1.066m14.456 0L14.74 9m-4.788 0L9.26 9" />
  </svg>
);
// -----------------------------------------------------------------

const ActionButton = ({ icon: Icon, label, onClick, className }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-lg 
      transition-colors duration-200 focus:outline-none focus:ring-2 
      ${className}
    `}
  >
    <Icon />
    <span>{label}</span>
  </button>
);

const SheetContainer = ({
  title = 'Data Sheet',
  children,
  onCreate,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl shadow-gray-200/50 border border-gray-100/80 m-4 lg:m-8">
      
      {/* Header and Actions */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        
        {showActions && (
          <div className="flex items-center space-x-3">
            {/* Create Button (Primary/Success) */}
            <ActionButton
              icon={PlusIcon}
              label="Create"
              onClick={onCreate}
              className="bg-blue-600 text-white hover:bg-blue-700 ring-blue-500/50"
            />
            
            {/* Edit Button (Secondary) */}
            <ActionButton
              icon={PencilIcon}
              label="Edit"
              onClick={onEdit}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 ring-gray-400/50"
            />
            
            {/* Delete Button (Danger) */}
            <ActionButton
              icon={TrashIcon}
              label="Delete"
              onClick={onDelete}
              className="bg-white text-red-600 border border-red-300 hover:bg-red-50 ring-red-500/50"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5">
        {children}
      </div>
      
    </div>
  );
};

export default SheetContainer;