import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const LandingPage = () => {
  const [inputVal, setInputVal] = useState("");
  const [repos, setRepos] = useState([]);
  console.log(inputVal);
  useEffect(() => {
    if (!inputVal) {
      console.log("No input found");
      return;
    }
    console.log(inputVal);
    fetch("https://api.github.com/search/repositories?q=" + inputVal)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRepos(data.items);
      });
  }, [inputVal]);
  console.log(repos);
  return (
    <div className=" ">
      <div className=" text-white text-center text-2xl">
        Search for Github Repos
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInputVal(e.target.elements.query.value);
          }}
        >
          <div className="flex gap-3 ">
            <input
              className="bg-white rounded text-center"
              type="text"
              name="query"
              placeholder="Enter the repo"
            />
            <HiOutlineSearch />
          </div>
        </form>
        <div>
          <ul className="text-white">
            {repos.map((repo) => {
              return (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank_">
                    {repo.name}
                  </a>
                  <p className="text-black">{repo.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
