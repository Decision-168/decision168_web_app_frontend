import { useEffect, useState } from "react";
import { getUser } from "../../../api/modules/ticketManagementModule";

const Assignee = ({ assignee }) => {
  const [userDetail, setUserDetail] = useState({});

  // get user detail
  const fetchUserDetail = async (id) => {
    try {
      const response = await getUser(id);
      setUserDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetail(assignee);
  }, [assignee]);

  return userDetail?.first_name + " " + userDetail?.last_name;
};

export default Assignee;
