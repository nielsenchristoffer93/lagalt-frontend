import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchSkillBasedOnSkillUrl, setSkillsToEmptyArray } from "../../redux/Skill/SkillSlice";

const SkillsCheckboxComponent = (props) => {
  const { skillUrls, skills, selectedCategory, fetchSkillBasedOnSkillUrl, setSkillsToEmptyArray} =
    props;

  /*const [skills, setSkills] = useState([
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5",
    "Skill 6",
  ]);*/

  useEffect(() => {
    setSkillsToEmptyArray();
    for (let index = 0; index < skillUrls.length; index++) {
      fetchSkillBasedOnSkillUrl(skillUrls[index]);
    }
  }, [skillUrls]);

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Project Skills</Form.Label>
      <br></br>
      {skills && populateCheckBoxes(skills)}
    </Form.Group>
  );
};

const populateCheckBoxes = (skills) => {
  return skills.map((skill) => (
    <Form.Check
      inline
      type="checkbox"
      id={`inline-checkbox`}
      label={skill.title}
    ></Form.Check>
  ));
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
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillsCheckboxComponent);
