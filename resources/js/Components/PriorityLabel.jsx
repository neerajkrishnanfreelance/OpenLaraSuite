export default function PriorityLabel({ priority }) {
    const colors = {
        low: 'text-gray-500',
        medium: 'text-yellow-600',
        high: 'text-red-600 font-bold',
    };

    return (
        <span className={`text-xs font-medium uppercase ${colors[priority]}`}>
            {priority}
        </span>
    );
}
