import React from "react";
import money from "./assets/img/homepage-photo-gigapixel-low_res-scale-2_00x.jpg";
import { Link, useNavigate } from "react-router-dom";
import HomepageView from "./HomepageView";
import useAuth from "./hooks/useAuth";

/*
This is an edit I am making that doesn't do anything.
Realistically this wouldn't be a comment and would serve a purpose.
*/

function Homepage() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/contact`;
    navigate(path);
  };
  const {auth, setAuth}: any = useAuth();

  return (
    <div>
      <HomepageView />
    </div>
  );
}

export default Homepage;
