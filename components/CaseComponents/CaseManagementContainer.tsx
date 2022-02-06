import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal";
import AddCaseModal from "./Modals/AddCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";
import AddTagModal from "./Modals/AddTagModal";
import { Autorenew, Category } from "@material-ui/icons";

/* 
  FEATURE 1 TODO:
  Write a query that will get the name AND id of 
  every category. Build this query, and verify it 
  works in Hasura, and then paste the query here.

  Make sure to replace the string that is currently
  in this variable 
*/
export const ManagementContainerQuery = `
query MyQuery {
  category {
    id
    name
  }
}
`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] =
    React.useState<boolean>(false);
  const [addTagModalOpen, setAddTagModalOpen] = React.useState<boolean>(false);

  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  const category: ManagementCategory[] | null = data ? data?.category: null;

  return (
    <>
      <h5 className="title">Home Page</h5>

      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />

      <DeleteCategoryModal
        onClose={() => setDeleteCategoryModalOpen(false)}
        open={deleteCategoryModalOpen}
      />

      <AddTagModal
        onClose={() => setAddTagModalOpen(false)}
        open={addTagModalOpen}
      />

      <Container
        style={{
          width: "100%",
          borderStyle: "solid",
          padding: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        <Button variant="dark" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>
        <Button variant="dark" onClick={() => setDeleteCategoryModalOpen(true)}>
          Delete Category
        </Button>
        <Button variant="dark" onClick={() => setAddTagModalOpen(true)}>
          Add Tag To A Case
        </Button>
        <Button variant="dark" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>
        <Button variant="dark" onClick={() => "redirect"}>
          Delete Case
        </Button>
        <Button variant="dark" onClick={() => "redirect"}>
          Edit Case
        </Button>
      </Container>

      <Grid container spacing={3}>
         {/*
          FEATURE 1 TODO:
          Use the data from the result of the query to render 
          a CaseCategory for every category in the response.
          Remember, the response is stored in the "data" variable!
        */}
        {category
            ? category.map((value: ManagementCategory, index: number) => {
                return <Grid key={index} item xs={4}>
                  <CaseCategory category_id={value.id}/>
                  </Grid>;
              })
            : "Something went wrong"}

        {/* END TODO */}
      </Grid>
    </>
  );
};
export default CaseManagementContainer;
