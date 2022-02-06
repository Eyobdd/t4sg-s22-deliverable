import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";
import { Category } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);
// TODO:DeleteCaseModalProps --DONE
type DeleteCaseModalProps = {
  open: boolean;
  onClose: () => void;
};
// TODO: DeleteCategoryMutation --DONE
const DeleteCategoryMutation = `
mutation DeleteCaseMutation($id: bigint = "") {
  delete_category_by_pk(id: $id) {
    description
    id
    name
  }
} 
`;
// TODO: Delete Category Modal
const DeleteCategoryModal: React.FC<DeleteCaseModalProps> = (props) => {
  const classes = useStyles();
  const [category, setCategory] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });
  
  const [result, executeMutation] = useMutation(DeleteCategoryMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Delete Category
      </Typography>
      <Box>
        {data ? (
            <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                labelId="category-select-label"
                fullWidth
                value={category}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setCategory(event.target.value as number);
                }}
                >
                {
                    data.category.map((category: any, index: number) => {
                    return <MenuItem key={index} value={category.id}>
                        {category.name}
                    </MenuItem>;
                    })
                }
                {/* END TODO */}
                </Select>
            </FormControl>
        ) : fetching ? (
        "Loading Categories"
        ) : null}
      </Box>  
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
                id: category,
            });
            props.onClose();
          }}
        >
          Delete
        </Button>
      </Box>
    </StyledModal>
  );
};
// export DeleteCategoryModal --Done
export default DeleteCategoryModal;
