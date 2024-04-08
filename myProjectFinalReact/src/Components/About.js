import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// עיצוב האלמנטים באמצעות styled-components
const AboutSection = styled.section`
  background-color: #f8f9fa;
  padding: 80px 0;
`;

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #f2a421;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

const ContactButton = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #15a399;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2a421;
  }
`;

const About = () => {
    const navigate=useNavigate();
  return (
    
    <AboutSection>
        <br/>
      <AboutContainer>
        <Title>אודות האתר</Title>
        <Description>
          אתרנו הוקם עם מטרה להציג לכל מי שמעוניין את המומחים בתחום הטיפול, המטפלים המובילים בשוק ולהציג את הנתונים הכי מעודכנים ואיכותיים בתחום. מטרתנו היא להביא לך את המידע הכי מובהק והמקיף ביותר כדי שתוכל לבחור את המטפל המתאים ביותר עבורך.
        </Description>
        <Description>
          תחומים:
          האתר מציע מגוון רחב של תחומים טיפוליים כגון טיפול רגשי, פסיכולוגי, טיפול פיזותרפיסטי ועוד. ניתן לחפש מטפלים לפי תחום וקטגוריה כגון פסיכולוגיה, אורטופדיה וכדומה.
        </Description>
        <Description>
          מאגר מטפלים:
          במאגר המטפלים תוכלו לחפש לפי שם מטפל ספציפי, אזור מגורים, תחום ועוד. זה יקל מאד על החיפוש ויאפשר לכם למצוא את המטפל המתאים ביותר עבורכם.
        </Description>
        <Description>
          תגובות:
          לכל מטפל יש תגובות שנכתבו עליו על ידי המטופלים הקודמים שלו. תוכלו להתרשם מהביקורות ולהוסיף תגובה במקרה הצורך.
        </Description>
        <ContactButton onClick={()=>navigate('/SignIn')}>צור קשר</ContactButton>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
