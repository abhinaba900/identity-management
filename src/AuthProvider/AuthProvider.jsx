import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

export const MyContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );
  const [userDetails, setUserDetails] = useState({});
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [openModal, setOpenModal] = useState(false);
  const [navigationStack, setNavigationStack] = useState([]);
  const [triggerPoint, setTriggerPoint] = useState({
    getLogin: 0,
    getUser: 0,
    getPhotos: 0,
    getTasks: 0,
    getArchive: 0,
  });
  const [GalleryImages, setGalleryImages] = useState([]);
  const [togglePage, setTogglePage] = useState(true);

  const [TaskManager, setTaskManager] = useState([]);
  const [ArchivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    const getuserInfo = JSON.parse(localStorage.getItem("user"));
    console.log("getuserInfo", getuserInfo);
    setUser(getuserInfo);
  }, [user?.id, triggerPoint]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://bitpastel.io/mi/adil/identity_mgmt/api/get-user-details?user_id=${user?.id}`
        );
        setUserDetails(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    if (user.id) {
      fetchUser();
    }
  }, [user?.id, triggerPoint?.getUser, triggerPoint]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://bitpastel.io/mi/adil/identity_mgmt/api/get-all-images?user_id=${user?.id}`
        );
        setGalleryImages(response.data.data?.categories);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUser();
  }, [user?.id, triggerPoint]);

  useEffect(() => {
    const FetchAllTasks = async () => {
      try {
        const response = await axios.get(
          `https://bitpastel.io/mi/adil/identity_mgmt/api/get-all-tasks?user_id=${user?.id}`
        );

        setTaskManager(response?.data?.data?.tasks);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    FetchAllTasks();
  }, [user?.id, triggerPoint]);

  useEffect(() => {
    async function fetchArchive() {
      try {
        const response = await axios.get(
          `https://bitpastel.io/mi/adil/identity_mgmt/api/get-archive-tasks?user_id=${user?.id}`
        );
        setArchivedTasks(response?.data?.data?.archive_tasks);
        console.log(response, "archive");
      } catch (error) {
        console.log("Failed to fetch user details", error);
      }
    }

    fetchArchive();
  }, [user?.id, triggerPoint]);

  const navigateToSection = useCallback(
    (section) => {
      setNavigationStack((prev) => [...prev, selectedSection]);
      setSelectedSection(section);
    },
    [selectedSection]
  );

  const navigateBack = useCallback(() => {
    setNavigationStack((prev) => {
      const newStack = [...prev];
      if (newStack.length > 0) {
        setSelectedSection(newStack.pop());
      }
      return newStack;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      userDetails,
      setUserDetails,
      selectedSection,
      setSelectedSection,
      openModal,
      setOpenModal,
      navigateToSection,
      navigateBack,
      navigationStack,
      triggerPoint,
      setTriggerPoint,
      togglePage,
      setTogglePage,
      GalleryImages,
      setGalleryImages,
      TaskManager,
      setTaskManager,
      ArchivedTasks,
      setArchivedTasks,
    }),
    [
      user,
      userDetails,
      selectedSection,
      openModal,
      navigationStack,
      triggerPoint,
      togglePage,
      GalleryImages,
      TaskManager,
      ArchivedTasks,
    ]
  );

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}

export default AuthProvider;
