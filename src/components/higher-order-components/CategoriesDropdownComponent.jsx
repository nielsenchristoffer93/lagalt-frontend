import {
  fetchAllCategories,
  setSelectedCategory,
} from "../../redux/category/CategorySlice";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import {
  fetchSkillsBasedOnCategory,
  setSelectedSkillsToEmptyArray,
} from "../../redux/Skill/SkillSlice";

const CategoriesDropdownComponent = (props) => {
  const {
    disableDefault,
    categories,
    hasLoaded,
    fetchAllCategories,
    setSelectedCategory,
    fetchSkillsBasedOnCategory,
    setSelectedSkillsToEmptyArray,
  } = props;

  useEffect(() => {
    if (!hasLoaded) {
      fetchAllCategories();
    }
  }, []);

  /**
   * Handles the event when the category dropdown changes and changes the catagory
   * @param {event} e
   */
  const handleChange = (e) => {
    setSelectedSkillsToEmptyArray();
    if (e.target.value > 0) {
      setSelectedCategory(e.target.value);
      fetchSkillsBasedOnCategory(e.target.value);
    }
    if (e.target.value == -1) {
      setSelectedCategory(e.target.value);
    }
  };

  return (
    <Form.Select onChange={handleChange} required defaultValue={"-1"}>
      <option value="-1" disabled={disableDefault ? true : null}>
        Select Category
      </option>
      {categories && populateOptions(categories)}
    </Form.Select>
  );
};

/**
 * populates the category select with options of different categories
 * @param {Array} categories
 * @returns JSX option
 */
const populateOptions = (categories) => {
  return categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.title}
    </option>
  ));
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    loading: state.categories.loading,
    hasLoaded: state.categories.hasLoaded,
    error: state.categories.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    setSelectedCategory: (category) => dispatch(setSelectedCategory(category)),
    fetchSkillsBasedOnCategory: (categoryId) =>
      dispatch(fetchSkillsBasedOnCategory(categoryId)),
    setSelectedSkillsToEmptyArray: () =>
      dispatch(setSelectedSkillsToEmptyArray()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesDropdownComponent);
