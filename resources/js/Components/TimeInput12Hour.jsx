import { useState, useEffect } from 'react';

export default function TimeInput12Hour({ value, onChange, className = '', id, required }) {
    // Parse 24h string (HH:mm) to internal state
    const parseTime = (timeStr) => {
        if (!timeStr) return { hour: '12', minute: '00', period: 'AM' };

        const [h, m] = timeStr.split(':');
        let hourInt = parseInt(h);
        const minute = m || '00';
        const period = hourInt >= 12 ? 'PM' : 'AM';

        let hour12 = hourInt % 12;
        if (hour12 === 0) hour12 = 12;

        return {
            hour: hour12.toString(),
            minute: minute,
            period
        };
    };

    const [timeState, setTimeState] = useState(parseTime(value));

    // Update state when external value changes
    useEffect(() => {
        setTimeState(parseTime(value));
    }, [value]);

    // Notify parent of change in 24h format
    const handleChange = (part, newVal) => {
        let newState = { ...timeState, [part]: newVal };

        // Validation/Formatting
        if (part === 'hour') {
            // Allow empty for typing, but clamp checks happen usually on blur
            // For now just store what is typed if numeric
        }

        // Immediate update to parent? 
        // Better to update internal state, constructing validation on the fly
        // But to keep it simple, I'll update internal state and then calculate 24h string

        if (part === 'minute') {
            // Ensure 2 digits if length is 2 or just simple logic
        }

        setTimeState(newState); // Optimistic update

        // Convert to 24h for parent
        let h = parseInt(newState.hour || '0');
        const m = newState.minute || '00';

        if (newState.period === 'PM' && h !== 12) h += 12;
        if (newState.period === 'AM' && h === 12) h = 0;

        const hStr = h.toString().padStart(2, '0');
        const mStr = m.toString().padStart(2, '0');

        // Only emit if valid-ish
        onChange(`${hStr}:${mStr}`);
    };

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <div className="relative w-20">
                <input
                    id={id ? `${id}_hour` : undefined}
                    type="number"
                    min="1"
                    max="12"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-center"
                    placeholder="HH"
                    value={timeState.hour}
                    onChange={(e) => {
                        let val = e.target.value;
                        if (parseInt(val) > 12) val = '12';
                        if (parseInt(val) < 1) val = '1'; // Allow 0 to be typed? 12h clock usually 1-12
                        handleChange('hour', val);
                    }}
                    onBlur={(e) => {
                        let val = parseInt(e.target.value || '12');
                        if (val < 1) val = 1;
                        if (val > 12) val = 12;
                        handleChange('hour', val.toString());
                    }}
                    required={required}
                />
            </div>
            <span className="text-gray-500 font-bold">:</span>
            <div className="relative w-20">
                <input
                    id={id ? `${id}_minute` : undefined}
                    type="number"
                    min="0"
                    max="59"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-center"
                    placeholder="MM"
                    value={timeState.minute}
                    onChange={(e) => {
                        let val = e.target.value;
                        if (parseInt(val) > 59) val = '59';
                        if (parseInt(val) < 0) val = '0';
                        handleChange('minute', val);
                    }}
                    onBlur={(e) => {
                        let val = parseInt(e.target.value || '0');
                        const valStr = val.toString().padStart(2, '0');
                        handleChange('minute', valStr);
                    }}
                    required={required}
                />
            </div>
            <div className="relative w-24">
                <select
                    id={id ? `${id}_period` : undefined}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    value={timeState.period}
                    onChange={(e) => handleChange('period', e.target.value)}
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
        </div>
    );
}
