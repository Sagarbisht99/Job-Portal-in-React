import React, { useEffect, useState } from "react";
import JobPortal from "./Components/JobPortal";

const items_length = 6;
const jobApi = ` https://hacker-news.firebaseio.com/v0/`;

function App() {
  const [items, setItems] = useState([]);
  const [itemsId, setItemsId] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);

  const fetchingItems = async (currentPage) => {
    setcurrentPage(currentPage);
    setFetchingDetails(true);

    let itemsLists = itemsId

    if (itemsLists === null) {
      const response = await fetch(`${jobApi}jobstories.json`);
      itemsLists = await response.json();
      setItemsId(itemsLists);
    }

    const pageForitemid = itemsLists.slice(
      currentPage * items_length,
      currentPage * items_length + items_length
    );

    console.log(currentPage);
    

    const pageForItems = await Promise.all(
      pageForitemid.map((itemsid) =>
        fetch(`${jobApi}item/${itemsid}.json`).then((res) => res.json())
      )
    );

    setItems([...items, ...pageForItems]);
    setFetchingDetails(false);
  };

  useEffect(() => {
    
      fetchingItems(currentPage);
    
  }, [currentPage]);

  return (
    <div className="flex items-center gap-2 flex-col">
      <h1 className="text-3xl text-center font-bold text-orange-500 ">
        Hacker Job Portal Hiring
      </h1>
      {items.length < 1 ? (
        <p className="text-orange-600 text-2xl font-bold">Loading...</p>
      ) : (
        <div className="flex flex-col items-center">
          {items.map((item) => {
            return <JobPortal key={item.title} items={item} />;
          })}
          <button
            onClick={() => setcurrentPage(currentPage + 1)}
            className=" text-white font-bold text-xl hover:bg-orange-700  bg-orange-500 p-2 rounded-[10px]"
          >
            {fetchingDetails ? "Loading..." : "Load More Job"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
