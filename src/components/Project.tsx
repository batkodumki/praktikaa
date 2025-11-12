import React, { useEffect, useState } from "react";
import "../assets/styles/Project.scss";

// Оголошення типу для даних проекту
interface ProjectType {
  image: string;
  name: string;
  description: string;
}

function Project() {
  // Використовуємо тип ProjectType для стейту
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/batkodumki/praktika/refs/heads/main/Project.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setProjects(data.projects))
      .catch((error) => console.error("Error:", error));
  }, []);
  

  return (
    <div className="projects-container" id="projects">
      <h1>Наші Лікарі</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project" key={index}>
            <a target="_blank" rel="noreferrer">
              <img src={project.image} className="zoom" alt={project.name} width="100%" />
            </a>
            <a target="_blank" rel="noreferrer">
              <h2>{project.name}</h2>
            </a>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
