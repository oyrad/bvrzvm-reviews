import React from "react";

export default function AddReviewForm({ movieId, movieName, movieYear }) {
  const [userName, setUserName] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [description, setDescription] = React.useState("");

  function resetForm() {
    setUserName("");
    setRating("");
    setDescription("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        movieId: movieId,
        userName: userName,
        movieName: movieName,
        movieYear: movieYear,
        rating: rating,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await res.json();
    console.log(responseJson);
    resetForm();
  }
  return (
    <div className="mb-8">
      <p className="text-2xl font-semibold mb-2">Write a review</p>
      <div className="rounded-lg shadow bg-white p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="flex flex-col mr-2">
              <label className="text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Rating</label>
              <div className="flex">
                <input
                  type="number"
                  min="0"
                  max="10"
                  name="rating"
                  className="w-12"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                / 10
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-semibold mb-1">Review</label>
            <textarea
              name="review"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-full px-8 py-1">
            Submit review
          </button>
        </form>
      </div>
    </div>
  );
}
