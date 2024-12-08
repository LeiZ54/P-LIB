import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import ProjectCard from '../components/ProjectCard';
import Layout from '../components/Layout';

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedClass, setSelectedClass] = useState(''); // New state variable for Class filter
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch projects:', error);
      });
  }, []);

  // Extract unique semesters and classes from the projects data
  const semesters = Array.from(new Set(projects.map(p => p.semester)));
  const classes = Array.from(new Set(projects.map(p => p.class)));

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleCreateProjectClick = () => {
    navigate('/create-project');
  };

  const handleDeleteProject = (deletedTitle) => {
    setProjects(prevProjects => prevProjects.filter(project => project.title !== deletedTitle));
  };

  const filteredProjects = projects.filter(project => {
    return (
      (selectedSemester === '' || project.semester === selectedSemester) &&
      (selectedClass === '' || project.class === selectedClass) &&
      (!project.delete)
    );
  });

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded px-2 py-1 text-gray-700"
              value={selectedSemester}
              onChange={handleSemesterChange}
            >
              <option value="">All Semesters</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 rounded px-2 py-1 text-gray-700"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="">All Classes</option>
              {classes.map((classItem) => (
                <option key={classItem} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleCreateProjectClick}
              className="text-white text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-md bg-purple-600 hover:bg-purple-700"
            >
              +
            </button>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </Layout>
  );
}

export default HomePage;
