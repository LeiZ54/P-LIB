import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function ProjectDetailPage() {
    const location = useLocation();
    const project = location.state;
    const navigate = useNavigate();

    if (!project) {
        return <div>Project data not found.</div>;
    }

    const handleBackClick = () => {
        navigate('/');
    };

    // Helper function: If a field is empty or missing, return "Not provided by the author."
    const displayField = (value) => {
        return value && value.trim() !== '' ? value : 'Not provided by the author.';
    };

    return (
        <Layout>
            <div className="min-h-screen p-2 relative">
                <button
                    onClick={handleBackClick}
                    className="absolute top-4 left-4 text-blue-700 hover:underline"
                >
                    &larr; Back to Home
                </button>

                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-12">
                    <h1 className="text-blue-700 font-bold text-2xl mb-4">{displayField(project.title)}</h1>

                    <div className="text-gray-500 text-sm mb-4">
                        {displayField(project.semester)} / {displayField(project.author)}
                    </div>

                    <div className="text-gray-500 text-sm mb-4">
                        <span className="text-gray-700 font-semibold">Contact:</span> {displayField(project.contact)}
                    </div>

                    <div className="text-gray-500 text-sm mb-4">
                        <div className="flex flex-wrap gap-2 mt-1">
                            {project.tags && project.tags.length > 0 ? (
                                project.tags.map(tag => (
                                    <span key={tag} className="bg-purple-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">Not provided by the author.</span>
                            )}
                        </div>
                    </div>

                    <div className="text-gray-500 text-sm mb-4">
                        <span className="text-gray-700 font-semibold">Description:</span> {displayField(project.description)}
                    </div>

                    <div className="text-gray-500 text-sm mb-2">
                        <span className="text-gray-700 font-semibold">Github Link:</span>{' '}
                        {project.githubLink && project.githubLink.trim() !== '' ? (
                            <a className="underline text-blue-700" href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                {project.githubLink}
                            </a>
                        ) : (
                            'Not provided by the author.'
                        )}
                    </div>

                    <div className="text-gray-500 text-sm mb-2">
                        <span className="text-gray-700 font-semibold">Website Link:</span>{' '}
                        {project.websiteLink && project.websiteLink.trim() !== '' ? (
                            <a className="underline text-blue-700" href={project.websiteLink} target="_blank" rel="noopener noreferrer">
                                {project.websiteLink}
                            </a>
                        ) : (
                            'Not provided by the author.'
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectDetailPage;
