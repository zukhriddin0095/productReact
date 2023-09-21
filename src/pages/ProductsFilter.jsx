import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../components/loading/Loading";

const ProductsFilter = () => {
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
 



  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true)
      let { data } = await request.get(`/categories/${id}/products`);
      setData(data);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="container">
      <div className="cards mt-5 row">
        {isLoading ? <Loading /> : data.map((category) => (
          <div key={category.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card mb-3">
              <LazyLoadImage
                src={category.avatar}
                className="card-img-top object-fit-cover"
                alt="foto"
                effect="blur"
                height={200}
              />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.createdAt.split("T")[0]}</p>

                <button className="btn btn-success me-3">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="btn btn-danger">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsFilter;
