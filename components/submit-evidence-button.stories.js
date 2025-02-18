import ArchonProvider from "./archon-provider";
import SubmitEvidenceButton from "./submit-evidence-button";
import Web3Provider from "./web3-provider";

import ProofOfHumanity from "subgraph/abis/proof-of-humanity";
import { address } from "subgraph/config";

const metadata = {
  title: "Arbitration/SubmitEvidenceButton",
  component: SubmitEvidenceButton,
  argTypes: {
    contract: {
      type: { name: "string", required: true },
      description:
        "The name of the contract to call `submitEvidence` on in the Web3 provider.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    args: {
      type: { name: "array", required: true },
      description: "Arguments to pass to the submission method.",
      table: {
        type: {
          summary: "array",
        },
      },
    },
  },
};
export default metadata;

const network = process.env.NEXT_PUBLIC_NETWORK || "mainnet";

const contracts = [
  {
    name: "proofOfHumanity",
    abi: ProofOfHumanity,
    address: { [network]: address },
  },
];
function Template(args) {
  return (
    <Web3Provider
      infuraURL={`wss://${network}.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`}
      contracts={contracts}
    >
      <ArchonProvider>
        <SubmitEvidenceButton {...args} />
      </ArchonProvider>
    </Web3Provider>
  );
}

export const Default = Template.bind();
Default.args = {
  contract: "proofOfHumanity",
  args: ["0xDb3ea8CbFd37D558eAcF8d0352bE3701352C1D9B"],
};
