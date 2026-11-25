import MemberForm from "../../components/MemberForm";
import { useParams } from "react-router-dom";

export default function MembersForm() {
  const { id } = useParams();

  return <MemberForm memberId={id} />;
}