import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchSkillBasedOnSkillUrl,
  setSkillsToEmptyArray,
  setSelectedSkills,
} from "../../redux/Skill/SkillSlice";
import "./SkillsCheckboxComponent.css";

const SkillsCheckboxComponent = (props) => {
  const {
    skillUrls,
    skills,
    fetchSkillBasedOnSkillUrl,
    setSkillsToEmptyArray,
    setSelectedSkills
  } = props;

  /**
   * changes skills when SkillsUrl is changed
   */
  useEffect(() => {
    setSkillsToEmptyArray();
    // DO THIS IN BACKEND INSTEAD AND JUST FETCH ALL SKILLS CONNECTED TO THE SPECIFIC CATEGORY
    for (let index = 0; index < skillUrls.length; index++) {
      fetchSkillBasedOnSkillUrl(skillUrls[index]);
    }
  }, [skillUrls]);

  /**
   * Adds the skill if isn't present in skills, if it is present the skill is removed from skills
   * @param {number} skillId 
   */
  const handleCheckboxClicked = (skillId) => {
    setSelectedSkills(skillId);
  };

  /**
   * makes a list of <Form.Check> of all skill based on the skills array
   * @param {Array} skills 
   * @returns list of <Form.Check>
   */
  const populateCheckBoxes = (skills) => {
    return skills.map((skill, id) => (
      <Form.Check
        inline
        type="checkbox"
        id={`inline-checkbox`}
        value={skill.id}
        label={skill.title}
        key={id}
        onClick={(e) => handleCheckboxClicked(e.target.value)}
      ></Form.Check>
    ));
  };

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Project Skills</Form.Label>
      <br></br>
      <div className="skills-container">
        {skills && populateCheckBoxes(skills)}
      </div>
    </Form.Group>
  );
};

const mapStateToProps = (state) => {
  return {
    skillUrls: state.skills.skillUrls,
    skills: state.skills.skills,
    loading: state.skills.loading,
    error: state.skills.error,
    selectedCategory: state.categories.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSkillBasedOnSkillUrl: (skillUrl) => dispatch(fetchSkillBasedOnSkillUrl(skillUrl)),
    setSkillsToEmptyArray: () => dispatch(setSkillsToEmptyArray()),
    setSelectedSkills: (skillId) => dispatch(setSelectedSkills(skillId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsCheckboxComponent);
