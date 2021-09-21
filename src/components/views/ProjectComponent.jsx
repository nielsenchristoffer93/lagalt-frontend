import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
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

  const fetchProjectData = async () => {
    const fetchedSkills = [];
    //console.log("CATEGORY URL");
    //console.log(categoryUrl);
    const categoryData = await getCategoryBasedOnCategoryId(categoryUrl);
    const categoryTitle = categoryData.title;
    setCategory(categoryTitle);
    //console.log("categoryTitle: " + categoryTitle);
    //console.log("CATEGORY");
    //console.log(categoryData);
    const projectStatusData = await getProjectStatusBasedOnProjectStatusId(
      projectStatusUrl
    );
    //console.log(projectStatusData)
    const projectStatusTitle = projectStatusData.title;
    //console.log("projectStatusTitle: " + projectStatusTitle);
    setProjectStatus(projectStatusTitle);

    const projectRoleData = await getProjectRoleByProjectRoleUrl(
      projectRoleUrl
    );
    //console.log("PROJECT ROLE DATA")
    //console.log(projectRoleData);
    const userUrl = projectRoleData.user;
    //console.log("userUrl: " + userUrl);

    const userData = await getUserByUserUrl(userUrl);
    //console.log("USERDATA IN PROJECT COMPONENT")
    //console.log(userData);
    //const name = userData.keycloakEmail;
    const name = `${userData.firstname} ${userData.lastname.charAt(0)}`;
    setUser(name);

    console.log("SKILLS");
    //console.log(skills);
    skills.forEach(async (skillUrl) => {
      const skillData = await getSkillBySkillUrl(skillUrl).then((response) =>
        response.json()
      );
      //console.log("SkillData")
      //console.log(skillData);
      const skillTitle = skillData.title;
      console.log("SkillTitle: " + skillTitle);
      fetchedSkills.push(skillTitle);
      //setSkillTitles(skillTitles => [...skillTitles, skillTitle]);
      console.log("SkillTitles");
      setSkillTitles(fetchedSkills);
      forceUpdate();
    });
  };

  useEffect(() => {
    //if(selectedProjectHasLoaded) {
    fetchProjectData();
    //}
  }, []);

  const populateListWithSkills = () => {
    console.log(skillTitles);
    return skillTitles.map((skill, index) => <li key={index}>{skill}</li>);
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
        <ul className="horizontal-list">{populateListWithSkills()}</ul>
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
