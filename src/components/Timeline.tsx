import React, { useEffect, useState } from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

interface Review {
  name: string;
  doctor: string;
  description: string;
  image: string;
}

function Timeline() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Завантажуємо дані з JSON
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/batkodumki/praktika/refs/heads/main/Timeline.json') // Замість цього вкажіть правильний URL до вашого JSON
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setReviews(data.reviews)) // Припускаємо, що в JSON є поле "reviews"
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div id="history">
      <div className="items-container">
        <h1>Відгуки клієнтів</h1>
        <VerticalTimeline>
          {reviews.map((review, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
              contentArrowStyle={{ borderRight: '7px solid  white' }}
              iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
              icon={<img src={review.image} alt={review.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
            >
              <h3 className="vertical-timeline-element-title">{review.name}</h3>
              <h4 className="vertical-timeline-element-subtitle">{review.doctor}</h4>
              <p>{review.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
