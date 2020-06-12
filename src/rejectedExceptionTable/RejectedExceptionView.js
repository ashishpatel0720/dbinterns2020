import React from "react";
import {
  List,
  TextField,
  DateField,
  Datagrid,
  RichTextField,
  FunctionField,
  ChipField,
  EditButton,
  ShowButton,
  Show,
  SimpleShowLayout,
} from "react-admin";
import { Avatar, makeStyles, useTheme, Chip, Typography } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";
import ExceptionFilter from "../exceptionTable/ExceptionFilter";

//import rowStyle from "./rowStyle";

const useListStyles = makeStyles({
  headerRow: {
    borderLeftColor: "white",
    borderLeftWidth: 5,
    borderLeftStyle: "solid",
  },
  headerCell: {
    padding: "6px 8px 6px 8px",
  },
  rowCell: {
    padding: "6px 8px 6px 8px",
  },
  comment: {
    maxWidth: "18em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  redCircle: {
    color: red[500],
    backgroundColor: red[500],
    // width: theme.spacing(3),
    // height: theme.spacing(3),
  },
  greenCircle: {
    color: green[500],
    backgroundColor: green[500],
    // width: theme.spacing(3),
    // height: theme.spacing(3),
  },
  yellowCircle: {
    color: yellow[500],
    backgroundColor: yellow[500],
    // width: theme.spacing(3),
    // height: theme.spacing(3),
  },
});

const RejectedExceptionView = ({ selectedRow, ...props }) => {
  const classes = useListStyles();
  const theme = useTheme();
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField label="Time Generated" source="timeGenerated" showTime />
        <TextField source="source" />
        <TextField source="category" />
        <TextField source="description" />
        <FunctionField label="Severity" source="severity" sortBy="severity" render={record => {
          var avatarClass;
          var chipColor;
          const severity = record.severity.toLowerCase();
          switch (severity) {
            case "severity_high":
              avatarClass = classes.redCircle;
              chipColor = red[500];
              break;
            case "severity_medium":
              avatarClass = classes.yellowCircle;
              chipColor = yellow[500];
              break;
            case "severity_low":
              avatarClass = classes.greenCircle;
              chipColor = green[500];
              break;
          }

          return <>
            <Chip
              variant="outlined"
              avatar={<Avatar className={avatarClass} variant="circle"> </Avatar>}
              label={severity.split("_")[1].toUpperCase()}
              style={{
                color: chipColor,
              }}
            />
          </>
        }} />
        <FunctionField label="Business Component" source="businessComponent" sortBy="businessComponent" render={record => {
          return <Typography style={{
            background: record.businessComponent.includes(',-') ? 'red' : null,
            color: record.businessComponent.includes(',-') ? 'white' : 'black',
          }}>{record.businessComponent.replace(',-', '')}</Typography>
        }} />
        {/* <TextField style={{ color: 'red' }} label="Business Component" source="businessComponent" /> */}
        <FunctionField label="Org. Unit" source="orgUnit" sortBy="orgUnit" render={record => {
          return <Typography style={{
            background: record.orgUnit.includes(',-') ? 'red' : null,
            color: record.orgUnit.includes(',-') ? 'white' : 'black',
          }}>{record.orgUnit.replace(',-', '')}</Typography>
        }} />
        <RichTextField label="Technical Description" source="technicalDescription" />
      </SimpleShowLayout>
    </Show>
  );
};
export default RejectedExceptionView;
