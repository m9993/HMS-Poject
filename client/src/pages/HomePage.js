import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export default function HomePage() {
  let location = useLocation();
  let urlParams = useParams();
  const [a, seta] = React.useState(location.state);

  return (
    <>
      <h1>{a.a}</h1>

      {a.b.map((i) => (
        <p>{i}</p>
      ))}
    </>
  );
}
