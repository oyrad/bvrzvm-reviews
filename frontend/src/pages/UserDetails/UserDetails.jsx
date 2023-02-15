import React from "react";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [reviews, setReviews] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  React.useEffect(() => {
    fetch(`/api/reviews/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setUserName(data[0].user);
        setAvatar(data[0].avatar);
      });
  }, [id]);

  return (
    <>
      <div className="p-4 bg-white rounded-lg flex flex-col items-center">
        <img src={avatar} alt="avatar" className="rounded-full" />
        <p>{userName}</p>
      </div>
      <div>
        {reviews.map((review) => (
          <p>{review.movieName}</p>
        ))}
      </div>
    </>
  );
}
