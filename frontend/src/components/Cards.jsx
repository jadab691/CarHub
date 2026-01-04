
function Cards({ item }) {
  return (
    <>
      <div className="pb-2 hover:scale-105 duration-300 ">
        <div className="card bg-gray-800 h-90 w-78 shadow-sm shadow-gray-700 hover:shadow-lime-50 ">
          <figure>
            <img
              className="h-48 w-full hover:scale-110 transition-all duration-300 ease-in-out"
              src={item.image}
              alt="Shoes"
            />
          </figure>
          <div className="card-body bg-[#092635]">
            <h2 className="card-title hover:text-[#FF7ED4] cursor-pointer hover:scale-97 transition-all duration-300 ease-out ">
              {item.title}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>{item.discription}</p>
            <div className="card-actions justify-end ">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
