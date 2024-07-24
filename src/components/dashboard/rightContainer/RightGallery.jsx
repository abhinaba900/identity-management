import React, {
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import { MyContext } from "../../../AuthProvider/AuthProvider";
import { FaImages } from "react-icons/fa";
import "../../../css/RightGallery.css";
import RightUploadImage from "./RightUploadImage";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import HamburgerMenu from "../../mobileResponcive/HamburgerMenu";

function RightGallery() {
  const {
    navigateBack,
    navigationStack,
    GalleryImages,
    triggerPoint,
    user,
    setGalleryImages,
    setTriggerPoint,
  } = useContext(MyContext);
  const [filter, setFilter] = useState("*");
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({ userId: null, imageId: null });
  const [mobile, setMobile] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback((userId, imageId) => {
    setModalData({ userId, imageId });
    setShow(true);
  }, []);

  useEffect(() => {
    setItems([
      ...GalleryImages.Animals.map((item) => ({ ...item, type: "Animals" })),
      ...GalleryImages.House.map((item) => ({ ...item, type: "House" })),
      ...GalleryImages.Vehicles.map((item) => ({ ...item, type: "Vehicles" })),
      ...GalleryImages.Others.map((item) => ({ ...item, type: "Others" })),
    ]);
  }, [GalleryImages, triggerPoint.getPhotos]);

  const filteredItems = useMemo(
    () => items.filter((item) => filter === "*" || item.type === filter),
    [filter, items]
  );

  const shuffleItems = useCallback(() => {
    setItems((prevItems) => {
      const array = [...prevItems];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    });
  }, []);

  const sortItems = useCallback((order) => {
    setItems((prevItems) => {
      const sorted = [...prevItems].sort((a, b) =>
        order === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      );
      return sorted;
    });
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <h3 className="mukta-bold fs-1 d-flex align-items-center gap-2">
          <FaImages /> Gallery
        </h3>

        <HamburgerMenu />
      </div>
      <hr />
      <div className="d-flex align-items-center gap-3 justify-content-between">
        <Button
          variant="outline-dark"
          className="mukta-bold d-flex align-items-center gap-2 back-button"
          onClick={navigateBack}
          disabled={navigationStack.length === 0}
        >
          <IoMdArrowRoundBack /> Back
        </Button>
        <RightUploadImage />
      </div>

      <div className="gallery-parent-container">
        {!isMobile ? (
          <div className="menu-filter-container">
            <Button
              className="mukta-semibold menu-shuffle"
              onClick={shuffleItems}
            >
              Shuffle Items
            </Button>
            <div className="menu-filter">
              <button onClick={() => setFilter("*")}>All Items</button>
              <button onClick={() => setFilter("House")}>House</button>
              <button onClick={() => setFilter("Animals")}>Animals</button>
              <button onClick={() => setFilter("Vehicles")}>Vehicles</button>
              <button onClick={() => setFilter("Others")}>Others</button>
            </div>
            <div>
              <Button
                className="mukta-semibold menu-sort"
                onClick={() => sortItems("asc")}
              >
                Ascending
              </Button>
              <Button
                className="mukta-semibold menu-sort"
                onClick={() => sortItems("desc")}
              >
                Descending
              </Button>
            </div>
          </div>
        ) : (
          <div className="menu-filter-container">
            <select
              name="filter"
              id="mobile-filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="*">All Items</option>
              <option value="House">House</option>
              <option value="Animals">Animals</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Others">Others</option>
            </select>
            <select
              name="sort"
              id="mobile-sort"
              onChange={(e) => sortItems(e.target.value)}
            >
              <option value="*">Sort</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <Button
              className="mukta-semibold menu-shuffle"
              onClick={shuffleItems}
            >
              Shuffle Items
            </Button>
          </div>
        )}
        <div className="menu-column">
          {filteredItems?.length > 0 ? (
            filteredItems?.map((item) => (
              <div key={item.title} className="menu-item">
                <div className="card">
                  <img
                    src={`https://bitpastel.io/mi/adil/identity_mgmt/uploads/${item.file_name}`}
                    alt={item.title}
                    onClick={() => handleShow(user.id, item.id)}
                    className="card-img-top"
                  />
                </div>
              </div>
            ))
          ) : (
            <strong className="mukta-semibold fs-3 mb-0 text-center w-100">
              Gallery is empty
            </strong>
          )}
        </div>

        <OpenDeleteModal
          show={show}
          handleClose={handleClose}
          userId={modalData.userId}
          imageId={modalData.imageId}
          setGalleryImages={setGalleryImages}
          setTriggerPoint={setTriggerPoint}
          triggerPoint={triggerPoint}
        />
      </div>
    </div>
  );
}

function OpenDeleteModal({
  show,
  handleClose,
  userId,
  imageId,
  setGalleryImages,
  setTriggerPoint,
  triggerPoint,
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/delete-image?user_id=${userId}&image_id=${imageId}`
      );
      toast.success("Image deleted successfully");

      const Imageresponse = await axios.get(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/get-all-images?user_id=${userId}`
      );
      setGalleryImages(Imageresponse?.data?.data?.categories);
      setTriggerPoint({
        ...triggerPoint,
        getPhotos: Math.random() + Math.random(),
      });
      handleClose();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RightGallery;
