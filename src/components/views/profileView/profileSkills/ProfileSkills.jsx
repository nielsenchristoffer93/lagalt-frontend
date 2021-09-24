import {
  fetchAllCategories,
  setSelectedCategory,
} from "../../../../redux/category/CategorySlice";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Col, Form, FormCheck } from "react-bootstrap";
import {
  fetchSkillsBasedOnCategory,
  fetchSkillBasedOnSkillUrl,
  setSelectedSkillsToEmptyArray,
  setSelectedSkills,
  setSkillsToEmptyArray,
} from "../../../../redux/skill/SkillSlice";
import { addUserSkill, deleteUserSkill } from "../../../../services/skills";
import { fetchUserSkills } from "../../../../redux/user/UserSlice";
import "./ProfileSkills.css";

const ProfileSkills = (props) => {
  const {
    fetchUserSkills,
    skills,
    userSkills,
    skillUrls,
    disableDefault,
    categories,
    hasLoaded,
    fetchAllCategories,
    setSelectedCategory,
    fetchSkillsBasedOnCategory,
    setSelectedSkillsToEmptyArray,
    fetchSkillBasedOnSkillUrl,
    setSkillsToEmptyArray,
    selectedCategory,
  } = props;

  useEffect(() => {
    if (!hasLoaded) {
      fetchAllCategories();
    }
  });

  /**
   * Updates the Skills to match the selected category.
   */
  useEffect(() => {
    setSkillsToEmptyArray();
    for (let index = 0; index < skillUrls.length; index++) {
      fetchSkillBasedOnSkillUrl(skillUrls[index]);
    }
  }, [fetchSkillBasedOnSkillUrl, setSkillsToEmptyArray, skillUrls]);

  /**
   * Maps the users skills and returns them as cards to be displayed
   * @param skills User skills from redux
   * @returns {*} Cards corresponding to the users skills.
   */
  const displayUserSkills = (skills) => {
    return skills.map((skill) => (
      <Card className="skill-card">{skill.title}</Card>
    ));
  };

  /**
   * If the checkbox is checked, the skill is saved to the users skills in the Db, if it's unchecked the skill is deleted.
   * Then it fetches the users skills.
   * @param e ClickEvent from the Checkbox.
   */
  const handleCheckboxClicked = (e) => {
    const id = e.target.value;
    if (e.target.checked === true) {
      addUserSkill(id).finally(fetchUserSkills);
    } else {
      deleteUserSkill(id).finally(fetchUserSkills);
    }
  };

  const populateCheckBoxes = (skills, userSkills) => {
    const checkUserSkills = (skillId, userSkills) => {
      for (let i = 0; i < userSkills.length; i++) {
        if (skillId === userSkills[i].id) {
          return true;
        }
      }
      return false;
    };
    return skills.map((skill, id) => (
      <FormCheck
        inline
        type="checkbox"
        id={`inline-checkbox`}
        value={skill.id}
        label={skill.title}
        defaultChecked={checkUserSkills(skill.id, userSkills)}
        key={id}
        onClick={(e) => handleCheckboxClicked(e)}
      />
    ));
  };

  /**
   * Populates the category options.
   * @param categories
   * @returns {*}
   */
  const populateOptions = (categories) => {
    return categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.title}
      </option>
    ));
  };

  /**
   * Used to Switch between categories.
   * @param e
   */
  const handleCategoryChange = (e) => {
    setSelectedSkillsToEmptyArray();
    if (e.target.value > 0) {
      setSelectedCategory(e.target.value);
      fetchSkillsBasedOnCategory(e.target.value);
    }
    if (e.target.value === -1) {
      setSelectedCategory(e.target.value);
    }
  };

  return (
    <div>
      <Form.Label>Interested In</Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={handleCategoryChange}
        required
        defaultValue={"-1"}
      >
        <option value="-1" disabled={disableDefault ? true : null}>
          Select Category
        </option>
        {categories && populateOptions(categories)}
      </Form.Select>
      {selectedCategory > 0 ? (
        <p className="skills-description">Select your skills below.</p>
      ) : null}
      {categories && populateCheckBoxes(skills, userSkills)}

      <div className="skills">
        <h4>My Skills</h4>
        <Col className="d-flex mr-3">{displayUserSkills(userSkills)}</Col>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userSkills: state.user.skills,
    categories: state.categories.categories,
    loading: state.categories.loading,
    hasLoaded: state.categories.hasLoaded,
    error: state.categories.error,
    skills: state.skills.skills,
    skillUrls: state.skills.skillUrls,
    selectedCategory: state.categories.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserSkills: () => dispatch(fetchUserSkills()),
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    setSelectedCategory: (category) => dispatch(setSelectedCategory(category)),
    fetchSkillsBasedOnCategory: (categoryId) =>
      dispatch(fetchSkillsBasedOnCategory(categoryId)),
    setSelectedSkillsToEmptyArray: () =>
      dispatch(setSelectedSkillsToEmptyArray()),
    fetchSkillBasedOnSkillUrl: (skillUrl) =>
      dispatch(fetchSkillBasedOnSkillUrl(skillUrl)),
    setSelectedSkills: (skillId) => dispatch(setSelectedSkills(skillId)),
    setSkillsToEmptyArray: () => dispatch(setSkillsToEmptyArray()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSkills);
