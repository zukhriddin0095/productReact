import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../server";
import { Link } from "react-router-dom";

const CategoryCard = ({
  avatar,
  name,
  id,
  Data,
  getData,
  editData,
}) => {
  const delProduct = async (id, getData) => {
    await request.delete(`categories/${id}`);
    getData();
  };


  return (
    <div className="card mb-3">
      <LazyLoadImage
        src={avatar}
        className="card-img-top object-fit-cover"
        alt="foto"
        effect="blur"
        height={200}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{Data.split("T")[0]}</p>
        <Link
          key={id}
          to={`/categories/${id}`}
          className="btn btn-primary me-3"
        >
          more {id}
        </Link>
        <button onClick={() => editData(id)} className="btn btn-success me-3">
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          onClick={() => delProduct(id, getData)}
          className="btn btn-danger"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  name: PropTypes.string,
  Data: PropTypes.string,
  id: PropTypes.string,
  avatar: PropTypes.string,
  getData: PropTypes.func,
  openModal: PropTypes.func,
  show: PropTypes.bool,
  editData: PropTypes.func
};

export default CategoryCard;
