import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import request from "../server";
import CategoryCard from "../components/card/CategoryCard";
import { Button, Modal } from "react-bootstrap";
import Loading from "../components/loading/Loading";

const CategoriesPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => setShow(false);

  const openModal = () => {
    setSelected(null);
    setShow(true);
    reset({ image: "", name: "", data: "" });
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("/categories");
      setLoading(false);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(data);

  const onSubmit = async (data) => {
    if (selected === null) {
      await request.post("categories", data);
    } else {
      await request.put(`categories/${selected}`, data);
    }
    getData();
  };

  const editData = async (id) => {
    try {
      setShow(true);
      setSelected(id);
      let {
        data: { avatar, name, date },
      } = await request.get(`categories/${id}`);
      reset({ name, avatar, date });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Searching..."
          />
          <span className="input-group-text"> Total: {data.length}</span>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={openModal}
          >
            Add
          </button>
        </div>
        <div className="home">
          <h1>All Categories</h1>
          <div className="cards row">
            {isLoading ? (
              <Loading />
            ) : (
              data.map((category) => (
                <div
                  key={category.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <CategoryCard
                    show={show}
                    openModal={openModal}
                    editData={editData}
                    getData={getData}
                    {...category}
                  />
                </div>
              ))
            )}
          </div>
          <div className="modal"></div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="form-control"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="image">Image</label>
                <input
                  {...register("image")}
                  type="url"
                  id="image"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="image">date</label>
                <input
                  {...register("date")}
                  type="date"
                  id="data"
                  className="form-control"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </Fragment>
  );
};

export default CategoriesPage;
