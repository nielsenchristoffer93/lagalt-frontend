import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { getTimeSinceCreation } from "../../services/timeFormatter";
import { getCategoryBasedOnCategoryId } from "../../services/categories";
import { getProjectStatusBasedOnProjectStatusId } from "../../services/projectStatus";
import { getProjectRoleByProjectRoleUrl } from "../../services/projectRole";
import { getUserByUserUrl } from "../../services/user";
import { connect } from "react-redux";
import "./ProjectComponent.css";
import { getSkillBySkillUrl } from "../../services/skills";

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const ProjectComponent = (props) => {
  const {
    title,
    description,
    projectTags,
    skills,
    categoryUrl,
    image,
    createdDate,
    //userUrl,
    projectStatusUrl,
    projectRoleUrl,
    selectedProjectHasLoaded,
  } = props;

  const forceUpdate = useForceUpdate();

  const [category, setCategory] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [user, setUser] = useState("");
  const [skillTitles, setSkillTitles] = useState([]);

  /**
     * Fetches all the data associated to the project..
     * @returns {Promise<void>}
     */
  const fetchProjectData = async () => {
    const fetchedSkills = [];
    const categoryData = await getCategoryBasedOnCategoryId(categoryUrl);
    const categoryTitle = categoryData.title;
    setCategory(categoryTitle);

    const projectStatusData = await getProjectStatusBasedOnProjectStatusId(
      projectStatusUrl
    );

    const projectStatusTitle = projectStatusData.title;
    setProjectStatus(projectStatusTitle);

    const projectRoleData = await getProjectRoleByProjectRoleUrl(
      projectRoleUrl
    );

    const userUrl = projectRoleData.user;
    const userData = await getUserByUserUrl(userUrl);
    const name = `${userData.firstname} ${userData.lastname.charAt(0)}`;
    setUser(name);

    skills.forEach(async (skillUrl) => {
      const skillData = await getSkillBySkillUrl(skillUrl).then((response) =>
        response.json()
      );

      const skillTitle = skillData.title;
      fetchedSkills.push(skillTitle);
      setSkillTitles(fetchedSkills);
      forceUpdate();
    });
  };

  useEffect(() => {
    fetchProjectData();
  }, [categoryUrl]);

  const populateListWithSkills = () => {
    return skillTitles.map((skill, index) => <Card className="skill-card">{skill}</Card>);
  };

  return (
    <Card className="project-component">
      <Card.Body>
        <Card.Text>
          <p>
            category: {category} &#8226; posted by {user},{" "}
            {getTimeSinceCreation(createdDate)}
            <span className="project-status">{projectStatus}</span>
          </p>
        </Card.Text>
        <Card.Title>{title}</Card.Title>
        <p>{description}</p>
        <Col style={{ height: "30px" }} className="d-flex mr-3">{populateListWithSkills()}</Col>
      </Card.Body>
      {/* TO VIEW A BASE64 image (PNG/JPEG) */}
      <Card.Img
        className="project-image"
        variant="bottom"
        src={`data:image/png;base64,${image}`}
        alt="no_image_in_database_associated_with_project."
      ></Card.Img>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedProjectHasLoaded: state.projects.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);
