import React, { useContext, useRef, useEffect } from "react";
import axios from "axios";
import "./styles/browse.css";
import AppContext from "../Context/Context";

const Browse = () => {
  const {
    currentIndex,
    setCurrentIndex,
    resultsList,
    setResultsList,
    selectedButtons,
    setSelectedButtons,
    setTitle,
    setIntDict,
    setIntDates,
    setNumberOfTables,
  } = useContext(AppContext);

  const responseDataRef = useRef([]);
  const previousSelectedButtons = useRef([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const fetchDataAndSetState = () => {
        axios
            .post("http://localhost:5000/navigation", { clickedItems: selectedButtons })
            .then((response) => {
                const { int_dict, int_dates, number_of_tables } = response.data;
                console.log('currentIndex', currentIndex);
                console.log('selected', selectedButtons);
                console.log('int_dates', int_dates[currentIndex]);

                setIntDict(int_dict);
                //setIntDates(int_dates);
                setNumberOfTables(number_of_tables);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    fetchDataAndSetState();
}, [selectedButtons, setIntDict, setIntDates, setNumberOfTables]);


  useEffect(() => {
    const browseDB = () => {
      axios
        .get("http://localhost:5000/browseDB")
        .then((response) => {
          responseDataRef.current = response.data;
          setResultsList(responseDataRef.current);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    if (responseDataRef.current.length === 0) {
      browseDB();
    } else {
      setResultsList(responseDataRef.current);
    }
  }, [setResultsList]);

  useEffect(() => {
    setCurrentIndex(currentIndexRef.current);
    setTitle(selectedButtons[currentIndexRef.current - 1]);
  }, [currentIndex, setTitle, selectedButtons, setCurrentIndex]);

  const handleButtonClick = (itemName) => {
    previousSelectedButtons.current = selectedButtons.slice();
    if (previousSelectedButtons.current.includes(itemName)) {
      const updatedSelectedButtons = previousSelectedButtons.current.filter((item) => item !== itemName);
      setSelectedButtons(updatedSelectedButtons);
      currentIndexRef.current = currentIndexRef.current - 1;
    } else {
      setSelectedButtons([...previousSelectedButtons.current, itemName]);
      currentIndexRef.current = currentIndexRef.current + 1;
    }

  };

  return (
    <div className="searchContainer">
      <div className="results">
        {resultsList.map((item) => (
          <button
            key={item}
            className={`jobButton${selectedButtons.includes(item) ? " selected" : ""}`}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Browse;
