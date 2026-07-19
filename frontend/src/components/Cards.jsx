function Cards({ item }) {
  return (
    <div className="px-2 pb-3">
      <div className="card h-96 w-full overflow-hidden">
        <figure className="overflow-hidden">
          <img
            className="h-48 w-full object-cover transition-all duration-300 ease-in-out hover:scale-105"
            src={item.image}
            alt={item.title}
          />
        </figure>
        <div className="card-body bg-white p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="card-title text-lg font-semibold text-slate-900">
              {item.title}
            </h2>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              New
            </span>
          </div>
          <p className="text-sm text-slate-600 line-clamp-3">
            {item.discription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
