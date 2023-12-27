import { Box, Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../GoalsAndStrategies/subComponents/CustomLabelTextField";
import { globalValidations } from "../../../utils/GlobalValidation";
import CustomMultilineTextField from "../../GoalsAndStrategies/subComponents/CustomMultilineTextField";
import CustomAutocomplete from "../../GoalsAndStrategies/subComponents/CustomAutocomplete";
import FilterSelectedOptions from "../../GoalsAndStrategies/subComponents/FilterSelectedOptions";
import InviteMembers from "../../GoalsAndStrategies/subComponents/InviteMembers";
import AddLinks from "../portfolio-projects-list/AddLinks";
import AttachedFile from "../portfolio-projects-list/AttachedFile";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../redux/action/userSlice";
import {
  EditProject,
  InsertProjectData,
  getProjectCreateDD,
  getProjectDetail,
} from "../../../api/modules/ProjectModule";
import { toast } from "react-toastify";
import { closeModal } from "../../../redux/action/modalSlice";
import SelectDepartment from "../../common/SelectDepartment";
import MultiSelectOptionGrid from "../../common/MultiSelectOptionGrid";
import SelectPortfolio from "../../common/SelectPortfolio";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SelectGoalManager from "../../common/SelectGoalManager";
const CreateProject = ({ flag, gid, sid, passPID, refreshData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  const [departments, setdepartments] = useState([]);
  const [portfolios, setportfolios] = useState([]);
  const [assignee, setassignee] = useState([]);
  const [memberData, setmemberData] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);

  const [fields, setFields] = useState([
    {
      link: "",
      linkComment: "",
    },
  ]);

  const [formValues, setFormValues] = useState({
    pname: "",
    dept_id: "",
    pdes: "",
    pcreated_by: userID,
    portfolio_id: storedPorfolioId,
    pmanager: 0,
    pfile: [],
    plink: [],
    plink_comment: [],
    ptype: "",
    gid: gid,
    sid: sid,
    team_member: [],
    imemail: [],
  });

  useEffect(() => {
    const fetchAllHistoryData = async () => {
      try {
        const response = await getProjectCreateDD(
          storedPorfolioId,
          gid,
          userID
        );
        if (response) {
          setdepartments(response.PortfolioDepartmentRes);
          setportfolios(response.PortfolioRes);
          setassignee(response.AssignManagerListRes);
          setmemberData(response.AssignMemberListRes);
        }
      } catch (error) {}
    };

    fetchAllHistoryData();
  }, [storedPorfolioId, userID]);

  useEffect(() => {
    setAvailableMembers(memberData);
  }, [memberData]);

  const handleChange = (fieldName) => (event) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const [files, setFiles] = useState(null);
  const handleFilesChange = async (newValue, info) => {
    const file = newValue;
    setFiles(file);
    let fileArray = [];
    const time = Math.floor(Date.now() / 1000);
    for (const f of file) {
      const fileName = `${time}_${f.name.toLowerCase()}`;
      fileArray.push(fileName);
    }
    setFormValues({
      ...formValues,
      pfile: fileArray,
    });
  };

  const [getPDetail, setPDetail] = useState([]);
  const [getPMembers, setPMembers] = useState([]);
  if (passPID != 0) {
    useEffect(() => {
      const fetchAllEditProjectData = async () => {
        try {
          const response = await getProjectDetail(passPID);
          setPDetail(response.project);
          const getPMembersData = response.ProjectTeamMemberRes;
          const pmembers = getPMembersData
            .filter((member) => member.reg_id != response.project?.pcreated_by)
            .map((member) => member.reg_id);
          setPMembers(pmembers);
        } catch (error) {}
      };
      fetchAllEditProjectData();
    }, [passPID]);
  }

  useEffect(() => {
    setFormValues({
      pname: getPDetail?.pname,
      dept_id: getPDetail?.dept_id,
      pdes: getPDetail?.pdes,
      pcreated_by: userID,
      portfolio_id: storedPorfolioId,
      pmanager: getPDetail?.pmanager,
      pfile: getPDetail?.pfile,
      plink: getPDetail?.plink,
      plink_comment: getPDetail?.plink_comment,
      ptype: getPDetail?.ptype,
      gid: getPDetail?.gid,
      sid: getPDetail?.sid,
      team_member: getPMembers,
      imemail: [],
    });
  }, [getPDetail, getPMembers]);

  const fetchLinksData = () => {
    if (getPDetail && getPDetail.plink) {
      // Split the comma-separated strings into arrays
      const linksArray = getPDetail?.plink?.split(",");
      const commentsArray = getPDetail?.plink_comment?.split(",");

      // Combine the arrays into an array of objects
      const resultArray =
        linksArray?.map((link, index) => ({
          link,
          linkComment: commentsArray[index],
        })) || [];

      setFields(resultArray);
    } else {
      setFields([
        {
          link: "",
          linkComment: "",
        },
      ]);
    }
  };
  useEffect(() => {
    fetchLinksData();
  }, [getPDetail]);

  const handleProjectEdit = async () => {
    let { pmanager, ...newFormValues } = formValues;
    newFormValues.pid = passPID;

    const pLinksArr = fields.map((item) => {
      return item.link;
    });
    const pLinkCommentsArr = fields.map((item) => {
      return item.linkComment;
    });

    const projectLinks = pLinksArr.join(",");
    const projectLinkComments = pLinkCommentsArr.join(",");

    const requiredEditFields = ["pname", "dept_id"];
    const areAllEditFieldsFilled = requiredEditFields.every(
      (efield) => newFormValues[efield]
    );
    if (!areAllEditFieldsFilled) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const projectType = gid != 0 ? "goal_strategy" : "regular";
      const kpiId = sid != 0 ? sid : 0;
      const goalId = gid != 0 ? gid : 0;
      const { imemail } = newFormValues;
      const edata = {
        ...newFormValues,
        imemail: imemail.map((item) => item.email),
        ptype: projectType,
        gid: goalId,
        sid: kpiId,
        plink: projectLinks,
        plink_comment: projectLinkComments,
      };

      const response = await EditProject(edata);
      toast.success(`${response.message}`);
      refreshData();
      dispatch(closeModal("edit-project"));
    } catch (error) {
      // Handling error

      toast.error(`${error.response?.error}`);
    }
  };

  const handleSave = async () => {
    let { ...newFormValues } = formValues;

    const pLinksArr = fields.map((item) => {
      return item.link;
    });
    const pLinkCommentsArr = fields.map((item) => {
      return item.linkComment;
    });

    const projectLinks = pLinksArr.join(",");
    const projectLinkComments = pLinkCommentsArr.join(",");

    const requiredEditFields = ["pname", "dept_id"];
    const areAllEditFieldsFilled = requiredEditFields.every(
      (efield) => newFormValues[efield]
    );
    if (!areAllEditFieldsFilled) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const projectType = gid != 0 ? "goal_strategy" : "regular";
      const kpiId = sid != 0 ? sid : 0;
      const goalId = gid != 0 ? gid : 0;
      const { imemail } = newFormValues;
      const data = {
        ...newFormValues,
        imemail: imemail.map((item) => item.email),
        ptype: projectType,
        gid: goalId,
        sid: kpiId,
        pcreated_by: userID,
        plink: projectLinks,
        plink_comment: projectLinkComments,
      };
      const response = await InsertProjectData(data);
      toast.success(`${response.message}`);
      navigate(`/projects-overview/${response.pid}`);
    } catch (error) {
      toast.error(`${error.response?.error}`);
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Box sx={{ width: "100%", background: "white", p: 2, borderRadius: 1 }}>
          <Grid container spacing={1}>
            <CustomLabelTextField
              label="Project Name"
              name="pname"
              required={true}
              placeholder="Enter Project Name..."
              value={formValues.pname}
              onChange={handleChange("pname")}
            />
            <CustomMultilineTextField
              label="Project Description"
              name="pdes"
              required={false}
              placeholder="Enter Project Description..."
              value={formValues.pdes}
              onChange={handleChange("pdes")}
            />
            <SelectDepartment
              required={true}
              departments={departments}
              formValues={formValues}
              setFormValues={setFormValues}
              moduleType={"project"}
            />

            <SelectPortfolio
              required={true}
              portfolios={portfolios}
              formValues={formValues}
              setFormValues={setFormValues}
              moduleType={"project"}
            />

            {flag === "add" ? (
              <SelectGoalManager
                required={false}
                managers={assignee}
                formValues={formValues}
                setFormValues={setFormValues}
                moduleType={"project"}
              />
            ) : (
              <></>
            )}

            <MultiSelectOptionGrid
              label="Members"
              required={false}
              field="team_member"
              idKey="id"
              getOptionLabel={(option) => option.name}
              staticOptions={memberData}
              formValues={formValues}
              setFormValues={setFormValues}
            />

            <InviteMembers
              formValues={formValues}
              setFormValues={setFormValues}
            />

            <AddLinks fields={fields} setFields={setFields} />
            <AttachedFile
              label="Attached File(s)"
              placeholder="Choose files..."
              multiple
              required={false}
              name="file"
              value={files}
              handleFilesChange={handleFilesChange}
            />
            {gid != 0 ? (
              <input hidden name="ptype" type="text" value="goal_strategy" />
            ) : (
              <input hidden name="ptype" type="text" value="regular" />
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            pt: 1,
            mr: 2,
            width: "100%",
          }}
        >
          {flag === "add" ? (
            <Button variant="contained" size="small" onClick={handleSave}>
              Create Project
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={handleProjectEdit}
            >
              Save Changes
            </Button>
          )}
        </Box>
      </DialogActions>
    </>
  );
};

export default CreateProject;
