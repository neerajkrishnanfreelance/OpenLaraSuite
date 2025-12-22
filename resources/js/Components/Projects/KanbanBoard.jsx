import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { router } from '@inertiajs/react';
import ClickableLink from '@/Components/ClickableLink';

const SortableItem = ({ project }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-4 rounded shadow-sm border border-gray-200 mb-3 cursor-move hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-1">{project.name}</h4>
            <div className="text-xs text-gray-500 mb-2 truncate">{project.description}</div>
            <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'No Date'}</span>
                <ClickableLink routeName="projects.show" params={project.id} className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">View</ClickableLink>
            </div>
            {project.users && project.users.length > 0 && (
                <div className="flex -space-x-1 overflow-hidden mt-3">
                    {project.users.slice(0, 3).map(user => (
                        <div key={user.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-700" title={user.name}>
                            {user.name.charAt(0)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const DroppableColumn = ({ id, status, projects }) => {
    const { setNodeRef } = useSortable({ id: id, disabled: true });

    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-lg w-72 flex-shrink-0 flex flex-col h-[calc(100vh-250px)]">
            <h3 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider flex justify-between items-center">
                {status.replace('_', ' ')}
                <span className="bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs">{projects.length}</span>
            </h3>
            <div className="flex-1 overflow-y-auto">
                <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                    {projects.map((project) => (
                        <SortableItem key={project.id} project={project} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};

export default function KanbanBoard({ projects = [] }) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Requires 8px movement before drag starts, allowing for small taps/scrolls
            },
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const statuses = ['active', 'on_hold', 'completed', 'archived'];

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const projectId = active.id;
        // If dropped over a column (status) or an item in that column
        let newStatus = over.id;

        // If we dropped over an item, find that item's status (or just find which column it belongs to)
        // Ideally we map columns to IDs like 'col-active'.
        // For simplicity, let's assume column IDs are the status names.
        // If we drop on an item, we need to know that item's status?
        // Actually, dnd-kit sortable containers: if we drop on a container, over.id is container id.
        // If we drop on an item, over.id is item id.

        // Let's refine: The DroppableColumn should have id={status}.
        // But SortableContext needs a parent. 
        // We will just update status if it changed.

        // Finding the status of the over target
        const overProject = projects.find(p => p.id === over.id);
        if (overProject) {
            newStatus = overProject.status;
        }

        // If 'over.id' is one of our statuses
        if (statuses.includes(over.id)) {
            newStatus = over.id;
        }

        const activeProject = projects.find(p => p.id === projectId);

        if (activeProject && activeProject.status !== newStatus && statuses.includes(newStatus)) {
            router.put(route('projects.update-status', projectId), {
                status: newStatus
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    // Optimistic update handled by inertia reload usually, 
                    // but for smoothness we might want local state. 
                    // For now, simple router visit is fine.
                }
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="flex space-x-6 overflow-x-auto pb-4">
                {statuses.map(status => (
                    <DroppableColumn
                        key={status}
                        id={status}
                        status={status}
                        projects={projects.filter(p => p.status === status)}
                    />
                ))}
            </div>
        </DndContext>
    );
}
