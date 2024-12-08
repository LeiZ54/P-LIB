import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

function ProjectCard({ project, onDelete }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleClick = () => {
        navigate('/project-details', { state: project });
    };

    const handleDelete = async (e) => {
        e.stopPropagation();

        try {
            const updatedProject = { ...project, delete: true };
            await api.put(`/projects/${project.title}`, updatedProject);
            toast.success(`Project "${project.title}" has been deleted.`);

            if (onDelete) {
                onDelete(project.title);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete the project. Please try again.');
        }
    };

    if (project.delete) {
        return null;
    }

    return (
        <div
            className="relative bg-white shadow-md rounded-lg p-4 mb-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleClick}
        >
            {user?.role === 'admin' && (
                <button
                    onClick={handleDelete}
                    className="absolute top-5 right-6 text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Project"
                >
                    Delete
                </button>
            )}

            <div className="text-blue-700 font-bold text-lg mb-2">{project.title}</div>
            <div className="text-gray-500 text-sm mb-2">{project.semester} / {project.author}</div>
            <p
                className="text-gray-800 mb-4"
                style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ProjectCard;
