import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <>
      <h1>{id}</h1>
      <p>This project will be loaded from an AWS API.</p>
    </>
  );
}
