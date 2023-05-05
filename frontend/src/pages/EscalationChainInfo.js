import { useLoaderData } from "react-router-dom";
import EscalationChain from "../components/EscalationChain/EscalationChain";

const EscalationChainInfoPage = () => {
  const categoryDetails = useLoaderData();
  return <EscalationChain category={categoryDetails} />;
};

export default EscalationChainInfoPage;

export async function loader({ request, params }) {
  const response = await fetch("/categories" + `/${params.categoryName}`);
  const data = await response.json();
  return data;
}
