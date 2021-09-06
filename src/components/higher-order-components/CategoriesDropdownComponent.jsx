import { fetchAllCategories, setSelectedCategory } from "../../redux/Category/CategorySlice";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { fetchSkillsBasedOnCategory } from "../../redux/Skill/SkillSlice";

const CategoriesDropdownComponent = (props) => {
  const { categories, hasLoaded, fetchAllCategories, setSelectedCategory, fetchSkillsBasedOnCategory } = props;

  useEffect(() => {
    if (!hasLoaded) {
      console.log("hasLoaded:" + hasLoaded);
      fetchAllCategories();
    }
  }, []);

  const handleChange = (e) => {
      console.log(e.target)
    setSelectedCategory(e.target.value);
    fetchSkillsBasedOnCategory(e.target.value);
  }

  return (
    <Form.Select aria-label="Default select example" onChange={handleChange}>
      {categories && populateOptions(categories)}
    </Form.Select>
  );
};

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
    error: state.categories.error
  };
};
//selectedCategory: state.displayAddProjectModal.selectedCategory

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    setSelectedCategory: (category) => dispatch(setSelectedCategory(category)),
    fetchSkillsBasedOnCategory: (categoryId) => dispatch(fetchSkillsBasedOnCategory(categoryId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesDropdownComponent);
