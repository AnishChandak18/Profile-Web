import React from 'react';
import { Blocks, Shield, Wallet } from 'lucide-react';
import SkillCard from './SkillCard';

const web3Skills = [
  {
    icon: <Blocks className="w-6 h-6" />,
    title: 'Smart Contracts',
    technologies: ['Solidity', 'Hardhat', 'OpenZeppelin', 'ERC Standards'],
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: 'Web3 Integration',
    technologies: ['ethers.js', 'web3.js', 'Push Protocol', 'The Graph'],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'DeFi Development',
    technologies: ['AMMs', 'Yield Farming', 'NFTs', 'Token Standards'],
  },
];

const Web3Skills: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {web3Skills.map((skill) => (
        <SkillCard key={skill.title} skill={skill} />
      ))}
    </div>
  );
};

export default Web3Skills;