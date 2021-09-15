import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const ProjectComponent = ({
  title,
  description,
  projectTags,
  skills,
  category,
  image,
}) => {
  const user = "user";
  const time = "5 h ";

  const populateListWithSkills = (skills) => {
    return skills.map((skill, index) => <li key={index}>{skill}</li>);
  };

  return (
    <Card className="projectComponent">
      <Card.Body>
        <Card.Text>
          {" "}
          category: {category} *posted by {user}, {time} ago
        </Card.Text>
        <Card.Title>{title}</Card.Title>
        <p>{description}</p>
        {/* console.log(skills) */}
        <ul className="horizontal-list">{skills && populateListWithSkills(skills)}</ul>
      </Card.Body>
      {/* Can only view PNG now (see data:image/png) */}
      <img src={`data:image/png;base64,${image}`} alt=""></img>
      <img
        style={{ minHeight: "250px" }}
        src="https://source.unsplash.com/1600x900"
        alt=""
      />
    </Card>
  );
};

export default ProjectComponent;
