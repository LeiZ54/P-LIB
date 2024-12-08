import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

function CreateProjectPage() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [contact, setContact] = useState('');
    const [semester, setSemester] = useState('');
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [customTag, setCustomTag] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const predefinedTags = ['JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Vue', 'Database', 'Java'];
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !author || !semester || !description) {
            toast.error('Please fill in all required fields.');
            return;
        }

        const newProject = {
            title,
            author,
            contact,
            semester,
            class: className,
            description,
            tags,
            githubLink,
            websiteLink,
        };

        setIsSubmitting(true);

        try {
            await api.post('/projects/create', newProject);
            toast.success('Project created successfully!');
            navigate('/');
            setTitle('');
            setAuthor('');
            setContact('');
            setSemester('');
            setClassName('');
            setDescription('');
            setTags([]);
            setCustomTag('');
            setGithubLink('');
            setWebsiteLink('');
        } catch (error) {
            console.error('Error creating project:', error);
            const errorMessage = error.response?.data?.error || 'Failed to create project.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePredefinedTagChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setTags((prev) => [...prev, value]);
        } else {
            setTags((prev) => prev.filter((tag) => tag !== value));
        }
    };

    const addCustomTag = () => {
        const trimmed = customTag.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags((prev) => [...prev, trimmed]);
            setCustomTag('');
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <Layout>
            <div className="min-h-screen p-2 relative">
                <button
                    onClick={handleBackClick}
                    className="absolute top-1 left-4 text-blue-700 hover:underline"
                >
                    &larr; Back to Home
                </button>
                <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-6 text-blue-700">Create a New Project</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter project title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter author name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Contact (email or phone)</label>
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Enter contact info"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Semester</label>
                            <input
                                type="text"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="e.g. Fall 2024"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Class</label>
                            <input
                                type="text"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="e.g. CS 601"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                                placeholder="Enter project description"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Tags</label>
                            <div className="mb-2">
                                {predefinedTags.map((tagOption) => (
                                    <label key={tagOption} className="inline-flex items-center mr-4 mb-1">
                                        <input
                                            type="checkbox"
                                            value={tagOption}
                                            onChange={handlePredefinedTagChange}
                                            checked={tags.includes(tagOption)}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700">{tagOption}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={customTag}
                                    onChange={(e) => setCustomTag(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 flex-1"
                                    placeholder="Add a custom tag"
                                />
                                <button
                                    type="button"
                                    onClick={addCustomTag}
                                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                                >
                                    Add
                                </button>
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="bg-purple-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Github Link</label>
                            <input
                                type="text"
                                value={githubLink}
                                onChange={(e) => setGithubLink(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Website Link</label>
                            <input
                                type="text"
                                value={websiteLink}
                                onChange={(e) => setWebsiteLink(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className={`bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CreateProjectPage;
