import React from 'react';
import '../../css/ship-loader.css';

export default function ShipLoader() {
    return (
        <div className="ship-loader-wrapper" role="status" aria-live="polite">
            <div className="loader-container">
                <div className="water">
                    <div className="water-wave"></div>
                    <div className="water-wave"></div>
                    <div className="water-wave"></div>
                </div>
                {/* Individual bubbles */}
                <div className="bubble small"></div>
                <div className="bubble medium"></div>
                <div className="bubble large"></div>
                <div className="bubble small"></div>
                <div className="bubble medium"></div>
                <div className="bubble small"></div>
                {/* Grouped bubble clusters */}
                <div className="bubble-group small"></div>
                <div className="bubble-group small"></div>
                <div className="bubble-group tiny"></div>
                <div className="bubble-group medium"></div>
                <div className="bubble-group tiny"></div>
                <div className="bubble-group small"></div>
                <div className="bubble-group small"></div>
                <div className="bubble-group small"></div>
                <div className="bubble-group tiny"></div>
                <div className="bubble-group medium"></div>
                <div className="bubble-group tiny"></div>
                <div className="bubble-group small"></div>
                {/* Single cruise ship (top view) */}
                <div className="ship">
                    {/* Hull */}
                    <div className="ship-hull"></div>
                    {/* Lower deck & pools */}
                    <div className="ship-deck-lower"></div>
                    <div className="ship-pool-1"></div>
                    <div className="ship-pool-2"></div>
                    {/* Mid deck */}
                    <div className="ship-deck-mid"></div>
                    {/* Superstructure */}
                    <div className="ship-super"></div>
                    {/* Windows/Balconies */}
                    <div className="ship-window"></div>
                    <div className="ship-window"></div>
                    <div className="ship-window"></div>
                    <div className="ship-window"></div>
                    <div className="ship-window"></div>
                    <div className="ship-window"></div>
                    {/* Upper deck */}
                    <div className="ship-deck-upper"></div>
                    {/* Funnels */}
                    <div className="ship-funnel"></div>
                    <div className="ship-funnel"></div>
                    {/* Wake */}
                    <div className="ship-wake left"></div>
                    <div className="ship-wake right"></div>
                </div>
                <p className="loading-text">Loading...</p>
            </div>
        </div>
    );
}
