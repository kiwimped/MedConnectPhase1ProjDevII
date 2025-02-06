import React from 'react';
import "./InfoPage.css";

const resources = [
    {
        title: "Canadian Health Services",
        description: "Access reliable Canadian healthcare information and services.",
        img: "https://www.internationalinsurance.com/wp-content/uploads/2018/11/candian-health-care.jpg", 
        link: "https://www.canada.ca/en/health-canada.html"
    },
    {
        title: "Healthy Food Guide",
        description: "Learn about nutritious foods and healthy eating tips.",
        img: "https://food-guide.canada.ca/themes/custom/wxtsub_bootstrap/images/food_guide_visual_en.png", 
        link: "https://www.healthyfood.com/"
    },
    {
        title: "Mental Health Resources",
        description: "Find support and resources for mental health.",
        img: "https://meded.ucsf.edu/sites/meded.ucsf.edu/files/inline-images/mental%20health%20page.jpg", 
        link: "https://www.ontario.ca/page/find-mental-health-support"
    },
    {
        title: "Exercise and Fitness Guide",
        description: "Explore tips and routines for maintaining physical fitness.",
        img: "https://yourexercisebike.com/wp-content/uploads/2020/12/best-upright-exercise-bikes-Canada-1536x810.jpg", // Replace with your actual image URL
        link: "https://www.canada.ca/en/public-health/services/being-active/physical-activity-your-health.html"
    }
];

const InfoPage = () => {
    return (
        <div className="info-page">
            <h1 className="info-page-title">About Our Medical App</h1>
            <p className="info-page-description">
                Our app provides easy and reliable online consultations with doctors, making healthcare accessible without the need for travel. 
                Ask questions directly or use our AI bot for instant responses to common health concerns.
            </p>

            <div className="resource-grid">
                {resources.map((resource, index) => (
                    <div key={index} className="info-card">
                        <img src={resource.img} alt={resource.title} className="resource-img" />
                        <h2 className="info-card-title">{resource.title}</h2>
                        <p className="info-card-description">{resource.description}</p>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="info-card-link">
                            Learn More
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoPage;
