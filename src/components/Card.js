import { Link } from "react-router-dom";

const Card = (props) => {
  return props.shoes.map((shoe, key) => {
    return (
      <div className="col-md-4">
        <img
          src={`https://codingapple1.github.io/shop/shoes${key + 1}.jpg`}
          width="80%"
        />

        <h4>
          <Link to={`/detail/${shoe.id}`}>{shoe.title}</Link>
        </h4>

        <p>{shoe.price}원</p>
        <p>{shoe.content}</p>
      </div>
    );
  });
};

export default Card;
