import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";

interface Skill {
  name: string;
  image: string;  // URL зображення в JSON файлі
  description: string;
  sideEffects: string[];
}

function Expertise() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/batkodumki/praktika/refs/heads/main/Expertise.json") // замініть на правильний шлях до вашого JSON файлу
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setSkills(data.skills))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Методи лікування</h1>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill" key={index}>
              {/* Використання прямого URL зображення */}
              <img
                src={skill.image} // Прямий URL з JSON
                alt={skill.name}
                style={{ width: "64px", height: "64px", objectFit: "contain" }}
              />
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
              <div className="flex-chips">
                <span className="chip-title">Побічні ефекти:</span>
                {skill.sideEffects.map((effect, index) => (
                  <Chip key={index} className="chip" label={effect} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Expertise;
