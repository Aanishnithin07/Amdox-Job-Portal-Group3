import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        type: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await jobAPI.getAllJobs();
            if (response.data.success) {
                setJobs(response.data.jobs);
            }
        } catch (err) {
            setError('Failed to load jobs. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredJobs = jobs.filter(job => {
        const matchTitle = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.search.toLowerCase());
        const matchLocation = job.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchType = filters.type ? job.jobType === filters.type : true;

        return matchTitle && matchLocation && matchType;
    });

    const formatSalary = (salary) => {
        if (!salary) return 'Negotiable';
        return `$${salary.toLocaleString()}`;
    };

    if (loading) return <div className="loading-spinner">Loading jobs...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="jobs-container">
            <div className="jobs-header">
                <h1>Find Your Dream Job</h1>
                <p>Browse through thousands of job opportunities</p>
            </div>

            <div className="filters-section">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by title or company..."
                    className="filter-input"
                    value={filters.search}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Filter by location..."
                    className="filter-input"
                    value={filters.location}
                    onChange={handleFilterChange}
                />
                <select
                    name="type"
                    className="filter-input"
                    value={filters.type}
                    onChange={handleFilterChange}
                >
                    <option value="">All Job Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            <div className="jobs-grid">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div
                            key={job._id}
                            className="job-card"
                            onClick={() => navigate(`/jobs/${job._id}`)}
                        >
                            <div className="job-card-header">
                                <h3 className="job-title">{job.title}</h3>
                                <span className="job-type-badge">{job.jobType}</span>
                            </div>
                            <div className="job-company">
                                🏢 {job.company}
                            </div>
                            <div className="job-location">
                                📍 {job.location}
                            </div>
                            <div className="job-salary">
                                💰 {formatSalary(job.salary)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-jobs">
                        <h3>No jobs found matching your criteria</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
