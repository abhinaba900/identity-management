import axios from "axios";
import { useContext, useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MyContext } from "../../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";

function useFormData(initialState) {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  }, []);

  return { formData, handleInputChange, handleFileUpload, setFormData };
}

function RightUploadImage() {
  const [show, setShow] = useState(false);
  const { user, setTriggerPoint, triggerPoint, setGalleryImages } =
    useContext(MyContext);
  const { formData, handleInputChange, handleFileUpload, setFormData } =
    useFormData({
      title: "",
      category: "",
      images: [],
      error: "",
    });

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, category, images } = formData;

    if (!images.length || !title || !category) {
      const errorMessage = !images.length
        ? "Please select at least one image"
        : !title
        ? "Please enter a title"
        : "Please select a category";
      toast.error(errorMessage);
      setFormData((prev) => ({ ...prev, error: errorMessage }));
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("user_id", user?.id);
    uploadFormData.append("title", title);
    uploadFormData.append("category", category);
    console.log(images, "images");

    try {
      images.forEach(async (image) => {
        uploadFormData.append(`file`, image);
        const response = await axios.post(
          "https://bitpastel.io/mi/adil/identity_mgmt/api/add-image",
          uploadFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      });

      setTriggerPoint({ ...triggerPoint, getUser: Math.random() });

      setFormData({ title: "", category: "", images: [], error: "" });

      toast.success("Image uploaded successfully");
      const Imageresponse = await axios.get(
        `https://bitpastel.io/mi/adil/identity_mgmt/api/get-all-images?user_id=${user?.id}`
      );
      setGalleryImages(Imageresponse?.data?.data?.categories);
      handleClose();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Upload failed";
      console.error(error);
      toast.error(errorMsg);
      setFormData((prev) => ({ ...prev, error: errorMsg }));
    }
  };

  return (
    <>
      <Button
        variant="outline-dark"
        onClick={handleShow}
        className="mukta-bold d-flex align-items-center gap-2 back-button"
      >
        Upload Image <FaUpload />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Multiple Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {formData.error && (
              <strong className="error mukta-semibold">{formData.error}</strong>
            )}
            <div className="input-container-2">
              <label className="mukta-semibold password-label">Title:</label>
              <input
                type="text"
                className="password-input mukta-semibold"
                name="title"
                placeholder="----"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container-2">
              <label className="mukta-semibold password-label">Category:</label>
              <select
                name="category"
                id="category"
                onChange={handleInputChange}
                value={formData.category}
              >
                <option value="">----</option>
                <option value="Animals">Animals</option>
                <option value="House">House</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="input-container-file">
              <h2 className="heading">
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </h2>
            </div>
            <Button
              type="submit"
              className="button mukta-semibold"
              disabled={
                !formData.images.length || !formData.title || !formData.category
              }
            >
              Upload
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RightUploadImage;
