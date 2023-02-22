export default function ReviewForm({
  title,
  buttonText,
  handleSubmit,
  rating,
  setRating,
  description,
  setDescription,
}) {
  return (
    <div className="mb-8">
      <p className="text-2xl font-semibold mb-2">{title}</p>
      <div className="rounded-lg shadow bg-white py-4 px-5">
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Rating</label>
              <div className="flex items-center">
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="10"
                  name="rating"
                  className="w-12 form-input mr-2"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
                <p>/ 10</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex justify-between">
              <label className="text-sm font-semibold mb-1">Review</label>
              <p className="text-gray-700 text-sm">
                {description.length} / 200
              </p>
            </div>
            <textarea
              name="review"
              maxLength={200}
              className="form-input h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="btn btn-inverse">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}
