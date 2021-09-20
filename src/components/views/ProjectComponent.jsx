import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getTimeSinceCreation } from "../../services/timeFormatter"

const ProjectComponent = ({
  title,
  description,
  projectTags,
  skills,
  category,
  image,
  createdDate,
  user
}) => {
  const populateListWithSkills = (skills) => {
    return skills.map((skill, index) => <li key={index}>{skill}</li>);
  };

  return (
    <Card className="project-component">
      <Card.Body>
        <Card.Text>
          {" "}
          category: {category} *posted by {user}, {getTimeSinceCreation(createdDate)}
        </Card.Text>
        <Card.Title>{title}</Card.Title>
        <p>{description}</p>
        {/* console.log(skills) */}
        <ul className="horizontal-list">{skills && populateListWithSkills(skills)}</ul>
      </Card.Body>
      {/* TO VIEW A BASE64 image (PNG/JPEG) */}
      <img src={`data:image/png;base64,${image}`} alt="no_image_in_database_associated_with_project."></img>
      {/*<img
        style={{ minHeight: "250px" }}
        src="https://source.unsplash.com/1600x900"
        alt=""
      />*/}
    </Card>
  );
};

export default ProjectComponent;
