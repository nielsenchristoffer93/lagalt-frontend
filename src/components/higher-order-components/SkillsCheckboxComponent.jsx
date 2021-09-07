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

  useEffect(() => {
    setSkillsToEmptyArray();
    for (let index = 0; index < skillUrls.length; index++) {
      fetchSkillBasedOnSkillUrl(skillUrls[index]);
    }
  }, [skillUrls]);

  const handleCheckboxClicked = (skillId) => {
    console.log("checkbox clicked!");
    console.log("skillId: " + skillId);
    setSelectedSkills(skillId);
  };

  const populateCheckBoxes = (skills) => {
    return skills.map((skill) => (
      <Form.Check
        inline
        type="checkbox"
        id={`inline-checkbox`}
        value={skill.id}
        label={skill.title}
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
    fetchSkillBasedOnSkillUrl: (skillUrl) =>
        dispatch(fetchSkillBasedOnSkillUrl(skillUrl)),
        setSkillsToEmptyArray: () => dispatch(setSkillsToEmptyArray()),
        setSelectedSkills: (skillId) => dispatch(setSelectedSkills(skillId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsCheckboxComponent);
