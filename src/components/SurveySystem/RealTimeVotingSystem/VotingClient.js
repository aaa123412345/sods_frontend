import useFetch from "../../../hooks/useFetch";
const VotingClient = () => {
    const data = useFetch(process.env.REACT_APP_VOTING_SYSTEM_HOST+'/ABCDEF')
}
export default VotingClient;